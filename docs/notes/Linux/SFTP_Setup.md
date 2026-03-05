# SFTP 服务器配置指南

## 1. 解决 `groupadd` 命令未找到的问题

如果遇到 `groupadd: command not found` 错误，请按以下步骤解决：

1. 安装 `passwd` 包：
   ```bash
   apt install passwd
   ```

2. 确保 `/usr/sbin` 在 `PATH` 环境变量中：
   ```bash
   echo $PATH
   ```

3. 如果 `/usr/sbin` 不在输出中，可以临时添加：
   ```bash
   export PATH=$PATH:/usr/sbin
   ```

4. 或者永久添加到用户的 `.bashrc` 文件中：
   ```bash
   echo 'export PATH=$PATH:/usr/sbin' >> ~/.bashrc
   source ~/.bashrc
   ```

5. 切换到 root 用户：
   ```bash
   sudo -i
   ```

6. 再次执行命令：
   ```bash
   groupadd GSFTP
   ```

## 2. 创建 SFTP 用户和组

1. 创建用户组：
   ```bash
   groupadd GSFTP
   ```

2. 创建用户并设置密码：
   ```bash
   useradd -m -G GSFTP -s /bin/false note_user
   passwd note_user
   ```

## 3. 配置 SFTP 目录和权限

1. 创建 SFTP 根目录：
   ```bash
   mkdir /sftp
   mkdir /sftp/note_user
   ```

2. 设置目录权限：
   ```bash
   chown root:GSFTP /sftp
   chown root:GSFTP /sftp/note_user
   chmod 755 /sftp
   chmod 755 /sftp/note_user
   ```

3. 创建用户文件目录：
   ```bash
   mkdir /sftp/note_user/files
   chown note_user /sftp/note_user/files
   chmod 755 /sftp/note_user/files
   ```

## 4. 配置 SSH 服务

1. 编辑 `/etc/ssh/sshd_config` 文件：
   - 注释掉原有配置：
     ```bash
     #Subsystem sftp /usr/libexec/openssh/sftp-server
     ```
   - 添加以下配置：
     ```bash
     Subsystem sftp internal-sftp
     Match Group GSFTP
     ChrootDirectory /sftp/%u
     ForceCommand internal-sftp
     AllowTcpForwarding no
     X11Forwarding no
     ```

2. 重启 SSH 服务：
   ```bash
   systemctl restart sshd
   ```

## 5. 其他注意事项

- 如果无法连接，请检查以下内容：
  1. 将 `.ssh` 公钥复制到用户目录：
     ```bash
     cp ~/.ssh/id_rsa.pub /sftp/note_user/.ssh/authorized_keys
     ```
  2. 设置正确的权限：
     ```bash
     chmod 600 /sftp/note_user/.ssh/authorized_keys
     ```

- 如果问题仍然存在，可能是系统关键组件丢失或者环境配置被破坏，可以尝试修复：
  ```bash
  apt install --reinstall passwd
