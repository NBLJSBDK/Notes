# 🌐 Git 全流程操作指南 (Modern Workflow)

> **"Git 是记录『为什么这样改代码』的工具，而非简单的备份工具。"**

---

## 📑 0. 核心提交规范 (Commit Message Convention)
*这是最重要的一环，良好的提交习惯是协作与维护的基础。*

| type     | 用途           | 示例 |
| -------- | ------------ | ---- |
| **feat**     | 新功能 (feature) | `feat(auth): 增加微信登录功能` |
| **fix**      | 修补 Bug | `fix(menu): 修复下拉菜单在移动端不显示的错误` |
| **refactor** | 重构 (即不是新增功能，也不是修改bug的代码变动) | `refactor: 简化逻辑判断函数` |
| **perf**     | 性能优化 | `perf: 提高渲染效率` |
| **docs**     | 文档变动 | `docs: 更新 API 使用说明` |
| **test**     | 增加测试 | `test: 添加登录模块单元测试` |
| **chore**    | 构建过程或辅助工具的变动 | `chore: 升级依赖库` |
| **wip**      | 工作进行中 (Work In Progress) | `wip: 正在处理搜索建议逻辑` |

>**禁止：** `add`、`update`、`modify`、`big`
---

## 🛠️ 1. 环境配置 (First Time Setup)

### 1.1 身份识别
```bash
# 必须配置，否则无法提交
git config --global user.name "YourName"
git config --global user.email "your_email@example.com"
```

### 1.2 效率与兼容性配置 (Windows 推荐)
```bash
# 解决中文字符集乱码
git config --global core.quotepath false
# 统一换行符 (建议关闭自动转换，保持原始状态)
git config --global core.autocrlf false
# 设置默认编辑器 (如 VS Code)
git config --global core.editor "code --wait"
```

### 1.3 常用别名 (Alias)
```bash
git config --global alias.st status
git config --global alias.lg "log --graph --oneline --decorate"
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
```

### 1.4 查看配置
```bash
git config --global --list 
```
---

## 🔑 2. SSH 密钥连接
为了安全且无需重复输入密码，推荐使用 SSH。

1. **生成密钥**: `ssh-keygen -t rsa -b 4096 -C "email@example.com"`
2. **获取公钥**: `cat ~/.ssh/id_rsa.pub` (复制内容到 GitHub Settings -> SSH Keys)
3. **测试连接**: `ssh -T git@github.com`

### 💡 可选：管理 SSH 密钥密码 (ssh-agent)
如果你给密钥设置了 **Passphrase (密码)**，可以使用以下命令将其托管给系统，避免每次操作都输入密码：
```bash
# 1. 启动 SSH 代理进程 (Windows PowerShell 环境建议手动启动 OpenSSH Authentication Agent 服务)
eval "$(ssh-agent -s)"

# 2. 将私钥添加到代理中 (以后在此会话中无需再输密码)
ssh-add ~/.ssh/id_rsa
```

---

## 🚀 3. 标准工作流 (Standard Workflow)

### 第一步：同步远程
```bash
git pull origin main
```

### 第二步：分支开发 (推荐)
```bash
git switch -c feature/new-task  # 创建并切换到新分支
```

### 第三步：精确提交
1. **查看状态**: `git status` (时刻了解仪表盘)
2. **查看改动**: `git diff` (不看 diff 不 commit)
3. **暂存文件**: `git add <file>` (避免无脑 `git add .`)
4. **提交记录**: `git commit` (弹出编辑器编写多行规范信息)

### 第四步：合并与推送
```bash
git switch main
git merge feature/new-task
git push origin main
```

---

## 🚑 4. 救急与撤销 (Quick Fix)

*   **撤销本地未暂存的修改**: `git checkout -- <file>`
*   **撤销已 add 但未 commit 的文件**: `git reset <file>`
*   **修改最后一次 commit**: `git commit --amend`
*   **临时保存进度**: `git stash` -> `git stash pop` (当你需要紧急切换分支时)

---

## 💡 5. 进阶建议
1. **一次 Commit 只干一件事**：不要把修 Bug 和写新功能混在一起。
2. **保持 Master 分支干净**：永远确保主分支是可运行、可发布的。
3. **编写有意义的 Body**：如果改动逻辑复杂，在 commit 的第二行补充“为什么”这么改。
