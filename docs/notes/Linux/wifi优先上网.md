# 🧭 Arch Linux 双网卡优先级配置笔记  
## 目标
- **Wi-Fi（wlan0）**：用于上网（外网）  
- **有线网（enp12s0）**：仅用于局域网或备用  

---

## 一、查看当前网络状态

```bash
nmcli device status
ip route
nmcli connection show
```

确认：

* Wi-Fi 接口名：`wlan0`
* 网线接口名：`enp12s0`
* 路由表中 metric 数值（越小优先级越高）

---

## 二、修改优先级（route-metric）

> 让 Wi-Fi 优先，有线作为备份或内网。

### Wi-Fi 优先级低（优先使用）

```bash
sudo nmcli connection modify "英文热点名" ipv4.route-metric 100
sudo nmcli connection modify "英文热点名" ipv6.route-metric 100

```

### 有线优先级高（延后使用）

```bash
sudo nmcli connection modify "有线连接 1" ipv4.route-metric 300
sudo nmcli connection modify "有线连接 1" ipv6.route-metric 300
```

---

## 三、重启网络连接

```bash
sudo nmcli connection down "有线连接 1"
sudo nmcli connection up "有线连接 1"
sudo nmcli connection down "英文热点名"
sudo nmcli connection up "英文热点名"
```

---

## 四、验证结果

```bash
ip route
```

理想结果示例：

```
default via 192.168.xxx.xx dev wlan0 proto dhcp src 192.168.xxx.xx metric 20100
default via 192.168.xxx.xx dev enp12s0 proto dhcp src 192.168.xxx.xx metric 20300
```

说明：

* **Wi-Fi (wlan0)** metric 20100 → 优先上网
* **有线 (enp12s0)** metric 20300 → 次要，保留局域网功能

> 注：NetworkManager 会自动加上约 20000 的偏移量。
> 你设置的 route-metric=100，最终显示为 metric=20100。

---

## 五、只让网线用于内网（可选）

如果不希望网线访问互联网：

```bash
sudo nmcli connection modify "有线连接 1" ipv4.never-default yes
```

这样 `enp12s0` 不会出现在默认路由中，只能访问局域网。

---

## 六、验证上网路径（可选）

```bash
ping -I wlan0 8.8.8.8   # Wi-Fi 通常能通
ping -I enp12s0 8.8.8.8 # 局域网用，不一定能通
```

---

## ✅ 结果总结

| 目的       | 配置方式                            | 效果          |
| -------- | ------------------------------- | ----------- |
| Wi-Fi 上网 | route-metric 较小                 | 默认流量走 Wi-Fi |
| 网线局域网    | route-metric 较大 或 never-default | 保留内网访问      |
| 自动切换     | Wi-Fi 掉线后，系统会自动切换到网线            | 无需手动切换      |

---

📘 **结论：**
当前配置正确，Wi-Fi 是主上网通道；
网线仅用于局域网或作为备用；
NetworkManager 的 metric 偏移属正常现象。
