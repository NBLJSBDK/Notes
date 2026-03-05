#GeForce Experience不能登录怎么办
1. 找到app.js文件：
    - 在目录"C:\Program Files\NVIDIA Corporation\NVIDIA GeForce Experience\www"下,用编辑器打开
2. 替换
    - 把 `nvActiveAuthView)}`替换成`nvActiveAuthView)},this.handleLoggedIn({sessionToken:"admin",userToken:"admin",user:{core:{displayName:"admin",primaryEmailVerified:true}}});` （不包含首尾的反引号）保存即可。