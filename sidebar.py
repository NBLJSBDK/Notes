import os
import re

def natural_sort_key(text):
    """
    实现类似 ls -v 的排序逻辑（自然排序）
    将字符串拆分为文本和数字部分，并将数字部分转换为整数进行对比。
    """
    return [int(c) if c.isdigit() else c.lower() for c in re.split(r'(\d+)', text)]

def generate_sidebar(doc_path):
    sidebar_content = ""
    # os.walk 会递归遍历文件夹
    for root, dirs, files in os.walk(doc_path):
        # 修正行：过滤掉以 . 或 _ 开头的文件夹（如 .git, _target）
        dirs[:] = [d for d in dirs if not d.startswith(('.', '_'))]
        # 对子目录进行自然排序，确保文件夹在侧边栏的顺序也是确定的
        dirs.sort(key=natural_sort_key)
        
        # 计算当前目录的深度，用于缩进
        level = root.replace(doc_path, '').count(os.sep)
        indent = '  ' * level
        folder_name = os.path.basename(root)
        
        # 如果不是根目录，则添加文件夹标题
        if folder_name and folder_name != os.path.basename(doc_path):
            sidebar_content += f"{indent}* **{folder_name}**\n"
        
        # 使用自然排序逻辑添加 Markdown 文件链接
        for file in sorted(files, key=natural_sort_key):
            if file.endswith(".md") and not file.startswith(('_', 'README.md')):
                file_name = file.replace(".md", "")
                # 转换路径分隔符为斜杠 / 以保证在 Web 端正常显示
                relative_path = os.path.relpath(os.path.join(root, file), doc_path).replace("\\", "/")
                sidebar_content += f"{indent}  * [{file_name}]({relative_path})\n"
                
    with open(os.path.join(doc_path, "_sidebar.md"), "w", encoding="utf-8") as f:
        f.write(sidebar_content)
    print("Successfully generated _sidebar.md")

# 确保你的文件夹名字确实是 docs
generate_sidebar("./docs")