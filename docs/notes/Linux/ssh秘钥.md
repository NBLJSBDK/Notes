-----

### 第一步：生成新的 SSH 密钥对

在你的本地电脑上，打开终端或 PowerShell，运行以下命令来生成一个用于 GitHub 的新密钥对。为了方便管理，我们为它自定义命名。

```bash
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_github -C "your_email@example.com"
```

  * `id_ed25519_github` 是私钥文件名。
  * 公钥文件会自动生成为 `id_ed25519_github.pub`。
  * 根据提示设置一个**强密码（passphrase）**。

### 第二步：配置 Git 以使用新密钥

为了让 Git 自动使用这个新密钥，你可以选择两种方法中的一种：

**方法 A (推荐)：使用 SSH 代理**
这是最简单方便的方式，可以避免频繁输入密码。

1.  启动 SSH 代理：
      * **PowerShell**: `Start-Service ssh-agent`
      * **macOS/Linux**: `eval "$(ssh-agent -s)"`
2.  将你的新私钥添加到代理中。系统会提示你输入一次密码。
    ```bash
    ssh-add ~/.ssh/id_ed25519_github
    ```

**方法 B：使用 SSH Config 文件**
如果你想为不同服务使用不同密钥，这个方法更系统化。

1.  编辑或创建配置文件：
    ```bash
    nano ~/.ssh/config
    ```
2.  添加以下配置并保存：
    ```
    Host github.com
        HostName github.com
        User git
        IdentityFile ~/.ssh/id_ed25519_github
    ```

### 第三步：将新公钥添加到 GitHub

1.  复制新公钥内容：
    ```bash
    cat ~/.ssh/id_ed25519_github.pub
    ```
2.  登录 GitHub，进入 **Settings** \> **SSH and GPG keys**。
3.  **删除**任何可能泄露的旧公钥。
4.  点击 **New SSH key**，粘贴你复制的新公钥内容，并添加一个标题。
5.  在终端中测试连接：
    ```bash
    ssh -T git@github.com
    ```

-----

### 第四步：在 VPS 上设置新密钥

这个过程需要你使用旧密钥登录 VPS。

1.  登录到你的 VPS：
    ```bash
    ssh username@your_vps_ip
    ```
2.  在 VPS 上生成一个新的密钥对，用于 VPS 登录：
    ```bash
    ssh-keygen -t ed25519 -C "vps_key_for_username"
    ```
    接受默认保存路径 (`~/.ssh/id_ed25519`) 和文件名，并设置一个密码。
3.  将新公钥内容**追加**到授权文件：
    ```bash
    cat ~/.ssh/id_ed25519.pub >> ~/.ssh/authorized_keys
    ```
    注意，这里是 `>>` **追加**符号，而不是 `>` **覆盖**符号。
4.  **在不关闭当前会话的情况下**，在本地电脑上下载新的私钥文件：
    ```bash
    scp username@your_vps_ip:~/.ssh/id_ed25519 /path/to/local/save/directory/
    ```
5.  在本地电脑上**测试**使用新私钥能否登录。
    ```bash
    ssh -i /path/to/local/save/directory/id_ed25519 username@your_vps_ip
    ```

### 第五步：完成清理

1.  如果新密钥测试成功，回到 VPS 的会话中，编辑 `~/.ssh/authorized_keys` 文件。
2.  **删除**旧密钥那一行，只保留新密钥。
3.  在本地电脑上，**删除**旧的私钥文件，以防再次使用。

至此，你已经成功地更换了 GitHub 和 VPS 的 SSH 密钥，你的账户现在更安全了。