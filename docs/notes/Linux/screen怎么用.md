# screen怎么用

`screen` 是一个终端复用器，常用于远程会话保持、后台运行程序等。你提到你只会 `screen -xRR`，这个是用于**重新连接现有会话或创建新会话并共享当前会话**的命令。下面我系统性地介绍 `screen` 的基本用法：

---

## 一、screen 基础命令

### 1. 启动新会话

```bash
screen -S 会话名
```

示例：

```bash
screen -S mysession
```

会启动一个名为 `mysession` 的新 screen 会话。

### 2. 查看当前所有会话

```bash
screen -ls
```

输出示例：

```
There is a screen on:
    12345.mysession  (Detached)
1 Socket in /run/screens/S-username.
```

### 3. 重新连接到已有会话

```bash
screen -r 会话名或ID
```

示例：

```bash
screen -r mysession
```

或

```bash
screen -r 12345
```

### 4. 强制连接已有会话（其他地方已连接时）

```bash
screen -dr 会话名
```

或

```bash
screen -dr
```

### 5. 共享会话（多终端同步）

```bash
screen -x 会话名
```

如果只有一个会话，直接：

```bash
screen -x
```

你用的 `screen -xRR` 等价于：

* `-x`：连接并共享已有会话
* `-R`：尝试恢复断开连接的会话；如果没有，则创建新会话
* 第二个 `R`（等价于 `-RR`）：强制恢复，即使已连接

---

## 二、在 screen 中的快捷键（Ctrl + a 开头）

这些快捷键默认都以 `Ctrl + a` 为前缀：

| 快捷键          | 功能描述                       |
| ------------ | -------------------------- |
| `Ctrl + a d` | **Detach**，从会话中退出（会话在后台保持） |
| `Ctrl + a c` | 创建新窗口                      |
| `Ctrl + a n` | 切换到下一个窗口                   |
| `Ctrl + a p` | 切换到上一个窗口                   |
| `Ctrl + a "` | 显示窗口列表                     |
| `Ctrl + a k` | 关闭当前窗口                     |

---

## 三、退出/关闭会话

在会话中：

1. 使用 `exit` 命令可以关闭当前窗口；
2. 所有窗口都关闭后，screen 会话也会结束；
3. 或者直接在 screen 中执行：

```bash
Ctrl + a` 然后输入 `:quit`
```

---

## 四、常见用途示例

### 后台运行任务

```bash
screen -S build_kernel
# 在 screen 会话中执行长时间编译命令
make -j8
```

执行完后按 `Ctrl + a d`，断开连接，任务继续在后台执行。

---

## 总结

| 命令                  | 含义             |
| ------------------- | -------------- |
| `screen -S name`    | 新建会话           |
| `screen -ls`        | 查看会话           |
| `screen -r name`    | 重连会话           |
| `screen -dr name`   | 强制断开其他并连接      |
| `screen -x name`    | 多终端共享会话        |
| `screen -xRR`       | 重连或共享或新建会话（常用） |
| `Ctrl + a d`        | 分离会话（后台运行）     |
| `exit` / `Ctrl + d` | 退出会话窗口         |

---

如果你习惯 `screen -xRR`，建议记住 `screen -ls` 查看会话，`screen -r` 或 `screen -x` 连接会话，基本就足够使用。

如需进一步自动化或管理多个会话，也可考虑 `tmux`，功能更强，但更复杂。你可以根据需求再做选择。
