# Markdown Here 速查表（Cheatsheet 中文版）

> 本文是 Markdown Here 使用的 Github 风格 Markdown 的速查与展示。它与 GitHub 原生渲染略有不同，效果可能略有出入。

## 目录
[标题](#标题（Headers）)
[强调](#强调emphasis)
[列表](#列表lists)
[链接](#链接links)
[图片](#图片images)
[代码与语法高亮](#代码与语法高亮code-and-syntax-highlighting)
[表格](#表格tables)
[引用块](#引用块blockquotes)
[行内](#行内-htmlinline-html)
[分隔线](#分隔线horizontal-rule)
[换行](#换行line-breaks)
[视频嵌入](#youtube-视频嵌入)
[数学公式tex](#tex-数学公式tex-mathematical-formulae)

---

## 标题（Headers）

```markdown
# 一级标题（H1）
## 二级标题（H2）
### 三级标题（H3）
#### 四级标题（H4）
##### 五级标题（H5）
###### 六级标题（H6）
```

或者使用下划线风格的 H1 和 H2：

```markdown
一级标题
========

二级标题
--------
```

---

## 强调（Emphasis）

```markdown
*斜体* 或 _斜体_

**加粗** 或 __加粗__

**加粗和 _斜体_ 的组合**

~~删除线~~
```

---

## 列表（Lists）

### 有序列表

```markdown
1. 第一项
2. 第二项
   * 无序子项
3. 数字可以重复
   1. 有序子项
4. 第四项

   缩进对齐的文字。
```

### 无序列表

```markdown
* 星号表示
- 减号表示
+ 加号表示
```

---

## 链接（Links）

```markdown
[内联链接](https://www.google.com)

[引用链接][标识]

[1]: http://example.com
[标识]: https://www.mozilla.org
[链接文本]: http://www.reddit.com

裸链接：http://www.example.com 或 <http://www.example.com>
```

---

## 图片（Images）

```markdown
![替代文本](图片地址 "图片标题")

或引用形式：

![替代文本][logo]

[logo]: 图片地址 "图片标题"
```

---

## 代码与语法高亮（Code and Syntax Highlighting）

### 行内代码

\`代码片段\`

### 块级代码

使用反引号包围（推荐）：

<pre>
```javascript
var s = "JS 高亮";
alert(s);
```

```python
s = "Python 高亮"
print(s)
```

```
未指定语言，则无高亮。
<b>HTML 标签</b> 也能写。
```
</pre>

---

## 表格（Tables）

```markdown
| 表头1     | 表头2     | 表头3  |
|----------|:----------:|-------:|
| 左对齐   | 居中对齐  | 右对齐 |
| 内容1    | 内容2     | 内容3  |
```

你也可以不对齐或使用行内 Markdown：

```markdown
Markdown | Less | Pretty
--- | --- | ---
*Still* | `renders` | **nicely**
1 | 2 | 3
```

---

## 引用块（Blockquotes）

```markdown
> 这是引用的内容。
> 这是同一个引用段落。

换一段。

> 也可以换段继续引用。
> 可以在引用中使用 *Markdown* 格式，比如 **加粗**。
```

---

## 行内 HTML（Inline HTML）

```html
<dl>
  <dt>定义列表</dt>
  <dd>人们有时会用这个。</dd>
  <dt>HTML 中的 Markdown</dt>
  <dd>不太兼容，请使用 HTML 标签。</dd>
</dl>
```

---

## 分隔线（Horizontal Rule）

```markdown
---

***

___
```

---

## 换行（Line Breaks）

Markdown Here 使用 GFM 规则：

```markdown
这是第一行。

这是新的段落（两个换行）。

这是同一段内的新行（一个换行）。
```

---

## YouTube 视频嵌入

Markdown 不支持直接嵌入视频，但可以用图片加链接实现：

```html
<a href="http://www.youtube.com/watch?v=视频ID" target="_blank">
  <img src="http://img.youtube.com/vi/视频ID/0.jpg" alt="视频预览图" width="240" height="180" border="10" />
</a>
```

或纯 Markdown（无法调整大小）：

```markdown
[![替代文字](http://img.youtube.com/vi/视频ID/0.jpg)](http://www.youtube.com/watch?v=视频ID)
```

---

## TeX 数学公式（TeX Mathematical Formulae）

使用 `$...$` 包裹公式：

```markdown
$-b \pm \sqrt{b^2 - 4ac} \over 2a$

$x = a_0 + \frac{1}{a_1 + \frac{1}{a_2 + \frac{1}{a_3 + a_4}}}$

$\forall x \in X, \quad \exists y \leq \epsilon$
```

你可以使用 [CodeCogs](https://www.codecogs.com/latex/eqneditor.php) 在线预览公式。

---

如需 PDF 或其他格式版本，也可以告诉我，我可以帮你转换。
