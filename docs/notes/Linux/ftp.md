在树莓派上使用官方的 **Debian 12** 系统部署 FTP 服务器，基本操作与 **Arch Linux** 相似，但有一些细微的差别。以下是完整步骤：

---

## 树莓派 Debian 12 上搭建 FTP 服务器

### 1. 安装 vsftpd
树莓派的系统基于 Debian，因此使用 `apt` 包管理器来安装：

```bash
sudo apt update
sudo apt install vsftpd
```

### 2. 配置 vsftpd

#### 编辑配置文件
打开 `/etc/vsftpd.conf` 文件：

```bash
sudo nano /etc/vsftpd.conf
```

#### 修改/添加以下内容：
```ini
# 禁止匿名用户访问
anonymous_enable=NO

# 允许本地用户登录
local_enable=YES

# 允许写权限（上传文件）
write_enable=YES

# 限制本地用户访问其家目录
chroot_local_user=YES
allow_writeable_chroot=YES

# 指定用户权限控制列表文件
userlist_enable=YES
userlist_deny=NO
userlist_file=/etc/vsftpd.userlist
```

保存并退出。

#### 创建用户列表文件
创建文件 `/etc/vsftpd.userlist` 并添加需要允许访问 FTP 的用户：

```bash
sudo nano /etc/vsftpd.userlist
```

在文件中写入用户列表（每行一个用户名）：
```
user1
user2
```
保存后退出。

---

### 3. 创建用户及设置权限

#### 创建 FTP 用户：
创建两个用户并为其设置密码：
```bash
sudo useradd -m user1
sudo passwd user1
sudo useradd -m user2
sudo passwd user2
```

#### 设置目录和权限：
1. **为 user1 设置上传权限**：
   ```bash
   sudo mkdir -p /home/user1/ftp
   sudo chown user1:user1 /home/user1/ftp
   ```
   `user1` 用户可以完全访问 `/home/user1/ftp`。

2. **为 user2 设置只读权限**：
   ```bash
   sudo mkdir -p /home/user2/ftp
   sudo chmod 755 /home/user2/ftp
   ```
   这样 `user2` 用户可以访问 `/home/user2/ftp`，但无法上传文件。

---

### 4. 启动和测试 vsftpd

#### 启动服务
```bash
sudo systemctl start vsftpd
```

#### 设置开机自启
```bash
sudo systemctl enable vsftpd
```

#### 测试 FTP 连接
在局域网内使用 FTP 客户端（如 FileZilla）连接树莓派的 IP 地址，使用 `user1` 和 `user2` 分别登录，验证不同权限。

---

### 5. 可选的防火墙设置

如果你的树莓派启用了 **ufw**（防火墙），需要允许 FTP 端口（默认 21）：

```bash
sudo ufw allow 21
sudo ufw reload
```

---

### 6. 可选的动态 IP 配置

如果你想通过公网访问树莓派上的 FTP 服务器，可以设置动态域名（如通过 `no-ip` 或 `DuckDNS` 服务）并配置路由器的端口转发功能，将外网的 21 端口映射到树莓派的内网地址。

---

完成后，你的树莓派将成功部署 FTP 服务器，并可以使用 `user1` 和 `user2` 分别测试不同权限的访问！如果有更多问题，可以继续提问。