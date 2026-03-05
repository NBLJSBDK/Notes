# Markdown 代码
### 用反引号\`\`括起来就行
`printf()` 函数  
## 代码区块  
### 代码区块使用 4 个空格或者一个制表符
    int main(){
    	while(1)
    	{
    	P2=0xFE;
    	Delay500ms();
    	P2=0xFF;
    	Delay500ms();
    	}
    	return 0;
    }

就可以了
### 也可以用 \``` 包裹一段代码，\```单独开一行 可以在后面指定语言格式
```C++
int main(){
    	while(1)
    	{
    	P2=0xFE;
    	Delay500ms();
    	P2=0xFF;
    	Delay500ms();
    	}
    	return 0;
    }
```  