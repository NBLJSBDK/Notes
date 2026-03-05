以下是如何在 **Arch Linux** 和 **Windows 11** 上搭建 FTP 服务器并配置至少两个账户实现不同权限的详细步骤：

---

## Arch Linux

### 1. 安装 FTP 服务器软件
推荐使用 **vsftpd**（Very Secure FTP Daemon），它轻量且支持多种配置。

```bash
sudo pacman -S vsftpd
```

### 2. 配置 vsftpd

#### 编辑配置文件
打开 `/etc/vsftpd.conf` 进行编辑：

```bash
sudo nano /etc/vsftpd.conf
```

#### 修改/添加以下关键配置项：
```ini
# 允许匿名访问（如无需要，设为NO）
anonymous_enable=NO

# 启用本地用户登录
local_enable=YES

# 允许上传文件
write_enable=YES

# 限制本地用户只能访问其家目录
chroot_local_user=YES

# 指定用户权限控制列表文件
userlist_enable=YES
userlist_deny=NO
userlist_file=/etc/vsftpd.userlist
```

#### 保存配置后，创建用户权限列表文件：
```bash
sudo touch /etc/vsftpd.userlist
```

在文件中写入允许访问 FTP 的用户名，每行一个用户名，例如：
```
user1
user2
```

#### 创建用户及设置权限

1. 创建用户：
```bash
sudo useradd -m user1
sudo passwd user1
sudo useradd -m user2
sudo passwd user2
```

2. 设置不同用户的家目录及权限：
   - 为用户 `user1` 设置目录并允许上传：
     ```bash
     sudo mkdir -p /home/user1/ftp
     sudo chown user1:user1 /home/user1/ftp
     ```
   - 为用户 `user2` 设置只读目录：
     ```bash
     sudo mkdir -p /home/user2/ftp
     sudo chmod 755 /home/user2/ftp
     ```

#### 启动并启用服务
```bash
sudo systemctl start vsftpd
sudo systemctl enable vsftpd
```

#### 测试 FTP 服务
使用 FTP 客户端（如 FileZilla）连接服务器，测试两个账户的访问权限是否正确。

---

## Windows 11

### 1. 启用 FTP 服务
Windows 11 自带 FTP 服务器功能，需要通过 **IIS（Internet 信息服务）** 启用。

#### 启用 IIS 功能
1. 打开 **控制面板** → **程序和功能** → **启用或关闭 Windows 功能**。
2. 勾选以下选项：
   - **Internet 信息服务** → **FTP 服务器** → 勾选 **FTP 服务** 和 **FTP 扩展性**。
   - **Internet 信息服务** → **Web 管理工具** → 勾选 **IIS 管理控制台**。
3. 点击 **确定**，等待安装完成。

### 2. 配置 FTP 站点
1. 打开 **IIS 管理器**（按 `Win+S` 搜索 “IIS 管理器”）。
2. 在左侧“连接”中，右键 **网站**，选择 **添加 FTP 站点**。
3. 配置站点：
   - **站点名称**：如 `FTPServer`。
   - **物理路径**：选择 FTP 的根目录路径（例如 `C:\FTPRoot`）。
   - **绑定和 SSL 设置**：端口默认为 `21`，不启用 SSL 可选择 **无**。

4. 点击 **下一步**，配置身份验证和授权规则：
   - **身份验证**：勾选 **基本**。
   - **授权**：
     - **允许访问**：选择 **指定用户**，输入用户名（如 `user1`）。
     - **权限**：根据需要勾选 **读取** 或 **读取和写入**。

5. 重复步骤，为不同用户设置不同权限。

### 3. 创建用户账户及文件夹权限
1. 创建 Windows 用户：
   - 打开 **计算机管理** → **本地用户和组** → **用户**。
   - 创建两个用户（如 `user1` 和 `user2`），设置密码。

2. 设置用户目录：
   - 创建目录 `C:\FTPRoot\user1` 和 `C:\FTPRoot\user2`。
   - 右键目录 → **属性** → **安全**，为相应用户设置权限：
     - `user1` 设置为 **完全控制**。
     - `user2` 设置为 **仅读取**。

### 4. 启动 FTP 服务
确保 FTP 服务已启动：
1. 打开 **服务**（按 `Win+R`，输入 `services.msc`）。
2. 找到 **Microsoft FTP Service**，右键启动。

---

### 测试 FTP
使用 FTP 客户端（如 FileZilla 或 Windows 文件资源管理器），以 `ftp://服务器IP` 的形式访问，测试不同账户是否具有正确权限。

---

如果有其他问题，欢迎随时提问！