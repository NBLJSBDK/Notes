你好！你可以按照以下步骤**彻底卸载之前的 KDE 环境**，然后**重新干净安装你列出的 KDE 组件**。我会一步一步带你操作，确保尽量恢复一个干净的 KDE 系统。

---

### 🔥 **第一步：卸载旧 KDE 所有组件**

1. **先退出 KDE 桌面环境（用 tty 模式执行）**

   * 按 `Ctrl + Alt + F2` 进入 tty
   * 登录
   * 然后停止显示管理器（避免界面干扰）：

     ```bash
     sudo systemctl stop sddm
     ```

2. **卸载 KDE 桌面及相关组件**

   执行以下命令卸载 KDE（包括 plasma、konsole、dolphin、kwin 等）：

   ```bash
   sudo pacman -Rns $(pacman -Qdtq)
   sudo pacman -Rns plasma-desktop plasma kde-applications kde-graphics kde-utilities kde-system dolphin konsole sddm
   ```

   有时 `kde-applications` 并未安装，可以忽略提示。

   ✅ 如果你不确定还遗留了什么 KDE 包，可以列出所有 KDE/Plasma 相关包：

   ```bash
   pacman -Qe | grep -E 'kde|plasma|konsole|dolphin|kwin|sddm'
   ```

   然后手动 `sudo pacman -Rns 包名` 删除残留项。

3. **可选：清理用户配置文件（慎用）**

   如果你想彻底清除 KDE 配置，可以移除用户目录下的 KDE 配置文件：

   ```bash
   rm -rf ~/.config/plasma* ~/.config/kde* ~/.kde4 ~/.local/share/kxmlgui5 ~/.cache/*
   ```

   ⚠️ 这个操作会清除所有 KDE 桌面个性化设置。

---

### ✅ **第二步：重新干净安装你需要的 KDE 组件**

确保系统更新：

```bash
sudo pacman -Syu
```

然后按你列出的内容，分批安装：

#### 1. 安装基本 KDE 桌面和常用程序

```bash
sudo pacman -S plasma plasma-desktop plasma-workspace-wallpapers dolphin konsole sddm vlc gimp sddm
```

#### 2. 启用并启动 sddm 登录管理器

```bash
sudo systemctl enable sddm.service --force
sudo systemctl start sddm
```

#### 3. 安装额外 KDE 工具和功能模块

```bash
sudo pacman -S ark spectacle okular gwenview kde-gtk-config plasma-nm powerdevil \
xdg-user-dirs kdeconnect
```

---

### 🎉 最后一步：重启并进入 KDE 桌面

```bash
reboot
```

---

