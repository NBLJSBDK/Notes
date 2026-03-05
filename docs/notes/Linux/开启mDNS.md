在 Arch Linux 上使用 mDNS（Multicast DNS，主要用于 `.local` 域名解析，如访问 `hostname.local`）主要依赖于 Avahi 服务。

以下是配置和使用 mDNS 的步骤：

---

## 一、安装必要的软件

```bash
sudo pacman -S avahi nss-mdns
```

---

## 二、启动并启用 Avahi 服务

```bash
sudo systemctl enable --now avahi-daemon.service
```

---

## 三、配置 nsswitch.conf

编辑 `/etc/nsswitch.conf`，确保 `hosts` 行包含 `mdns` 或 `mdns_minimal`，例如：

```bash
hosts: files mdns_minimal [NOTFOUND=return] dns myhostname
```

解释：

* `files`：本地 `/etc/hosts`
* `mdns_minimal`：快速 mDNS 解析
* `[NOTFOUND=return]`：失败则不再向下查询
* `dns`：传统 DNS
* `myhostname`：systemd 提供的本地主机名解析

如果你使用 systemd-resolved，可以根据情况改成：

```bash
hosts: resolve [!UNAVAIL=return] files mymachines mdns dns myhostname
```

---

## 四、防火墙配置（如果启用）

确保 UDP 5353 端口已开放，用于 mDNS：

```bash
sudo firewall-cmd --add-port=5353/udp --permanent
sudo firewall-cmd --reload
```

或使用 `ufw`：

```bash
sudo ufw allow 5353/udp
```

---

## 五、测试

确保你在同一个子网内的其他机器也启用了 mDNS。然后尝试：

```bash
ping hostname.local
```

如果 `hostname` 是远程机器的主机名，应能解析并响应。

也可用 `avahi-browse` 工具查看网络设备：

```bash
avahi-browse -a
```

---

## 六、常见问题排查

1. **主机名不正确**：默认 Avahi 会发布 `$(hostname).local`，确保主机名没有大写字母或特殊字符。
2. **服务没启动**：检查 `avahi-daemon` 是否正常运行。
3. **不在同一子网**：mDNS 只在局域网有效。
4. **nsswitch 配置错误**：`mdns_minimal` 位置不对或未启用。

---

如你是开发用途，也可以在设备上发布自定义服务，参照 `/etc/avahi/services` 写 `.service` 文件。

是否需要我给出 Avahi 发布服务的例子？
