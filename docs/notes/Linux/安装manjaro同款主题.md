在 Arch Linux 上，你主要有两种方式来“无痛”获得这个壁纸：一种是使用 **Git** 直接拉取（最推荐，最干净，不污染系统包），另一种是通过 **AUR** 安装。

鉴于你只需要壁纸而不需要 Manjaro 的其他系统配置，**方法一（Git）是最好的**。

### 方法 1：使用 Git 拉取源码（已验证）

这种方法不需要安装额外的软件包，只需把图片文件下载下来放到指定位置即可。

1. **打开终端**，进入你的下载目录（或者任何临时目录）：
```bash
cd ~/Downloads

```


2. **克隆仓库**：
```bash
git clone https://gitlab.manjaro.org/artwork/themes/breath.git

```


3. **找到壁纸并复制**：
KDE Plasma 用户建议将壁纸放到 `~/.local/share/wallpapers/` 目录下（当前用户专用），而不是 `/usr/share/wallpapers/`（需要 root 权限且会被系统更新覆盖）。
```bash
# 创建用户壁纸目录（如果不存在）
mkdir -p ~/.local/share/wallpapers/

# 复制壁纸文件夹过去
## 1. 复制该目录下所有内容到目标位置
cp -r breath/wallpapers/* ~/.local/share/wallpapers/

# 2. 删除不需要的文件
rm ~/.local/share/wallpapers/CMakeLists.txt

```


4. **应用壁纸**：
* 回到桌面，右键 -> **配置桌面和壁纸** (Configure Desktop and Wallpaper)。
* 你应该能直接在列表中看到 **"North"** 了。
* *提示：如果没有看到，尝试注销并重新登录，或者手动添加图片 (Add Image)*。



---

### 方法 2：通过 AUR 安装 (Arch User Repository)（未验证）

如果你想用包管理器来管理它，AUR 上有一些维护者打包了 Manjaro 的资源。

1. **使用 `yay` (或 `paru`) 搜索并安装**：
```bash
yay -Ss manjaro-wallpapers

```


或者尝试搜索 breath 主题相关：
```bash
yay -Ss breath-wallpaper

```


2. **安装**（通常是这个包，但也可能随维护者变化）：
```bash
yay -S manjaro-wallpapers
# 或者
yay -S plasma5-themes-breath

```


*注意：通过 AUR 安装可能会附带一些你不需要的 Manjaro 主题文件，不如方法 1 干净。*

---

### 方法 3：手动下载（最简单）（不推荐）

如果你不想敲命令，直接用浏览器下载图片文件：

1. 打开这个直接链接：[GitLab - Breath Wallpapers/North](https://www.google.com/search?q=https://gitlab.manjaro.org/artwork/themes/breath/-/tree/master/wallpapers/North)
2. 点击 `contents` -> `images` 找到你想要的分辨率（例如 `1920x1080.png` 或 `3840x2160.png`）。
3. 下载图片。
4. 在桌面右键 -> 设置壁纸 -> 点击 **"Add Image" (添加图片)** -> 选择下载的文件。

---
