# NVIDIA GPU 功率限制问题（Win11 与 Arch Linux 差异）

在 Arch Linux 上使用 `nvidia-smi` 发现 GPU 功率与 Windows 11 不一致。可以通过以下方式查看和调整功率限制。

---

## 查看功率限制

```bash
nvidia-smi -q -d POWER | grep "Power Limit"
```

如果 `Max Power Limit` 允许 120W，可采取以下方案：

---

## 方案一：临时提升功率上限

使用 `nvidia-smi` 命令临时调整功率上限：

```bash
sudo nvidia-smi -i 0 -pl 120
```

> 注意：此方法重启后会失效。

---

## 方案二：开机自动设置功率限制（Systemd）

可以创建一个 Systemd Unit 文件，在系统启动时自动设置功率限制。

### 1. 创建 Unit 文件

```bash
sudo code /etc/systemd/system/nvidia-power-limit.service
```

### 2. 添加以下内容

```ini
[Unit]
Description=Set NVIDIA GPU Power Limit to 120W
After=multi-user.target nvidia-persistenced.service

[Service]
Type=oneshot
# 将功耗限制设置为 120W
ExecStart=/usr/bin/nvidia-smi -i 0 -pl 120
RemainAfterExit=true

[Install]
WantedBy=multi-user.target
```

### 3. 启用并启动服务

```bash
sudo systemctl enable nvidia-power-limit.service
sudo systemctl start nvidia-power-limit.service
```

> 这样，每次系统启动，Systemd 会在 GPU 驱动准备就绪后自动执行命令，将功耗上限设置为 120W，从而解决功率限制问题。
