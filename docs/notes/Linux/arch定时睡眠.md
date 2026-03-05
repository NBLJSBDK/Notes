### **Arch Linux 电源管理与 SSH 隧道自动化排障笔记**

#### **一、 问题背景 (Problem)**

* **设备：** MSI B650M Mortar + Ryzen 7700X + GTX 1050Ti。
* **痛点：** 1.  系统无法进入深层睡眠（秒醒），伴随内核报错 `nvidia returns -5`。
2.  主板 3 针风扇在 Linux 下无法停转（噪音大）。
3.  睡眠唤醒后，反向 SSH 隧道（reverse-tunnel）和校园网登录失效。

---

#### **二、 核心排障过程与解决方案 (Solutions)**

##### **1. 硬件与驱动层：解决“秒醒”与“噪音”**

* **BIOS 调整：** 
    * **禁用核显：** 将 `Integrated Graphics` 设为 `Disabled`。原因：防止 AMD 核显驱动（amdgpu）与 NVIDIA 驱动在睡眠时冲突。
    * **唤醒事件设置：** 设置路径：Settings -> Advanced -> Wake Up Event Setup -> Resume By RTC Alarm 设为 [Enabled]。
    * **设置休眠模式：** 设置路径：Settings -> Advanced -> Power Management Setup -> ErP Ready 建议设为 [Disabled]。

* **风扇调速：** 将风扇控制由 PWM 改为 **DC 模式**。原因：3 针风扇在 PWM 模式下无法通过占空比停转。


* **彻底根治 `error -5`（暴力拆解法）：**
* **操作：** 放弃 NVIDIA 复杂的“显存保留”功能。
* **修改：** 在 `/etc/modprobe.d/nvidia.conf` 中设置 `options nvidia NVreg_PreserveVideoMemoryAllocations=0`。
* **清理：** `systemctl disable` 掉所有 nvidia-suspend 相关服务。
* **刷新：** 执行 `sudo mkinitcpio -P` 并重启。
* **结论：** 用最基础的睡眠模式换取最高的稳定性。



##### **2. 系统干扰层：屏蔽误触发**

* **关闭唤醒源：** 通过脚本循环写入 `/proc/acpi/wakeup`，屏蔽掉 USB 鼠标、键盘在睡眠瞬间产生的微小电流干扰。
* **禁用异步：** 设置 `pm_async=0`，强制系统按顺序一个一个设备“闭眼”，避免时序竞争。

##### **3. 应用与网络层：实现自动化恢复**

* **校园网登录：** 编写 `netcheck.sh` 脚本，配合 `systemd.timer` 在特定时间段（22:10-01:00）自动检测并登录。
* **反向隧道恢复：**
* **痛点：** 唤醒后网卡重连需要时间，`autossh` 反应太慢。
* **大招：** 使用 **systemd 睡眠钩子 (Sleep Hook)**。
* **路径：** `/usr/lib/systemd/system-sleep/99_net_resume`。
* **逻辑：** 监听 `post/*` 事件，在系统睁眼瞬间强制 `systemctl restart reverse-tunnel.service`。



---

#### **三、 最终实战脚本 (`sleep_6h.sh`)**

```bash
#!/bin/bash

# 确保脚本以 root 权限运行
if [ "$EUID" -ne 0 ]; then
  echo "请输入密码以应用电源管理设置..."
  sudo "$0" "$@"
  exit $?
fi

echo "正在准备系统休眠（6小时）..."

# 1. 禁用异步挂起，确保设备按顺序同步进入睡眠，提高稳定性
echo 0 > /sys/power/pm_async

# 2. 强制开启 Deep Sleep 模式（S3 挂起），确保风扇彻底停转
# 即使 Grub 没设，脚本也会在休眠前瞬间纠正
if grep -q "deep" /sys/power/mem_sleep; then
    echo deep > /sys/power/mem_sleep
    echo "[Checked] 睡眠模式已设为 Deep Sleep"
fi

# 3. 屏蔽所有已启用的唤醒源，防止鼠标抖动或 USB 电流误触发“秒醒”
echo "正在屏蔽 USB/PCI 唤醒信号..."
for i in $(grep enabled /proc/acpi/wakeup | awk '{print $1}'); do
    echo $i > /proc/acpi/wakeup
done

# 4. 设置 6 小时后唤醒 (6 * 3600 = 21600 秒)
echo "系统即将在 5 秒后进入睡眠 (mem/deep)..."
sleep 5
rtcwake -m mem -s 21600

echo "系统已唤醒！正在恢复环境..."
```

---
#### **补充：稳定性与验证 (Reliability & Verification)**
* **强制 Deep Sleep：** 脚本中可加入 `echo deep > /sys/power/mem_sleep` 确保进入 S3 状态。
* **配置生效：** 每次修改 systemd 单元文件后，务必 `sudo systemctl daemon-reload`。
* **绝对路径：** 系统级钩子脚本（system-sleep）建议使用绝对路径执行命令，提高鲁棒性。

**笔记结语：**
这次调试是一次从 **BIOS (底层硬件)** -> **Kernel (内核驱动)** -> **Systemd (系统服务)** -> **Shell Script (用户脚本)** 的全栈排障。