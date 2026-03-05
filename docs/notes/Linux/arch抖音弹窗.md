## Arch Linux 下屏蔽抖音 bitbrowser 协议报错解决方案

### 1. 问题现象

在 Chrome 访问抖音网页版时，页面脚本尝试调用 `bitbrowser://` 协议进行环境探测（指纹识别）。由于系统未安装 BitBrowser，KDE 桌面环境的 KIO 组件报错“无法读取文件”。

### 2. 解决方案：创建“哑元”程序欺骗系统

**步骤一：定义处理程序 (Create Dummy Desktop Entry)**
创建一个实际上什么都不做（执行 `/bin/true`）的桌面快捷方式文件，伪装成 BitBrowser。

使用 VS Code 创建文件：

```bash
code ~/.local/share/applications/bitbrowser-dummy.desktop

```

写入以下内容并保存：

```ini
[Desktop Entry]
Type=Application
Name=BitBrowser Silencer
Exec=/bin/true %u
StartupNotify=false
MimeType=x-scheme-handler/bitbrowser;
NoDisplay=true

```

**步骤二：注册关联 (Register Protocol Handler)**
告诉系统，当遇到 `bitbrowser://` 协议时，使用上面创建的文件来处理。

```bash
xdg-mime default bitbrowser-dummy.desktop x-scheme-handler/bitbrowser

```

*注意：如果遇到 `/usr/bin/xdg-mime: 行 885: qtpaths: 未找到命令` 错误，可忽略。该脚本已在报错退出前成功写入了配置文件。*

**步骤三：验证配置 (Verify Configuration)**
检查关联是否生效：

```bash
cat ~/.config/mimeapps.list | grep bitbrowser

```

输出应包含：`x-scheme-handler/bitbrowser=bitbrowser-dummy.desktop`

**步骤四：浏览器设置 (Final Browser Setting)**

1. 再次刷新抖音页面。
2. 浏览器弹出 `xdg-open` 提示时，**勾选** ✅ “始终允许...”。
3. 点击“打开”。
4. 此后系统将静默处理该请求，不再报错。

### 3. 原理解析

* **Definition (定义能力)**：`.desktop` 文件声明了系统拥有处理该协议的能力。
* **Association (建立关联)**：`xdg-mime` 命令修改了 `~/.config/mimeapps.list`，将协议头绑定到了具体的 `.desktop` 文件上。即使脚本后续因缺少依赖报错，核心的文件写入操作已完成。

---