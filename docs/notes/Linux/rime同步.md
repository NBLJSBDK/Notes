sudo pacman -S fcitx5-im fcitx5-rime

~/.xprofile 写入export QT_IM_MODULE=fcitx

sudo nano /etc/environment
写入
GTK_IM_MODULE=fcitx
QT_IM_MODULE=fcitx
XMODIFIERS=@im=fcitx
SDL_IM_MODULE=fcitx
GLFW_IM_MODULE=FCITX



```bash
#!/bin/bash

# 设置源目录和目标目录
SRC="/run/media/note_user/Windows/Users/nbljsbdk/AppData/Roaming/Rime"
DST="/home/note_user/.local/share/fcitx5/rime"

# 旧系统在~/.config/fcitx/rime/


# 确认源目录存在
if [ ! -d "$SRC" ]; then
  echo "源目录不存在: $SRC"
  exit 1
fi

# 删除目标目录下所有文件
echo "正在清空目标目录: $DST"
rm -rf "${DST:?}"/*

# 复制文件
echo "正在从 $SRC 复制文件到 $DST"
cp -r "$SRC"/* "$DST"

echo "完成！"
```