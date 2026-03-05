
如果你是在 TTY 用中文命令行（如中文 `man` 或 `ls` 输出）时遇到乱码，那就是终端字体（console font）问题，还可设置字体：

```bash
sudo nano /etc/vconsole.conf
```

设置为：

```ini
KEYMAP=us
FONT=lat9w-16
```

然后重启即可。

---
