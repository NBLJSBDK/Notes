装机必做：
sudo pacman -Syy ## 强制更新 package 目录
sudo pacman-mirrors --interactive --country China # 列出所有国内的镜像源，并提供交互式的界面手动选择镜像源
sudo pacman -Syyu # 强制更新 package 目录，并尝试更新已安装的所有 packages.
sudo pacman -S yay # 安装 yay
sudo pacman -S archlinuxcn-keyring # 安装中国源密钥
常用命令：
pacman -S package_name # 安装软件
pacman -S extra/package_name # 安装不同仓库中的版本
pacman -Syu # 升级整个系统，y是更新数据库，yy是强制更新，u是升级软件
pacman -Ss string # 在包数据库中查询软件
pacman -Si package_name # 显示软件的详细信息
pacman -Sc # 清除软件缓存，即/var/cache/pacman/pkg目录下的文件
pacman -R package_name # 删除单个软件
pacman -Rs package_name # 删除指定软件及其没有被其他已安装软件使用的依赖关系
pacman -Rs package_name #
pacman -Qs string # 查询已安装的软件包
pacman -Qi package_name # 查询本地安装包的详细信息
pacman -Ql package_name # 获取已安装软件所包含的文件的列表
pacman -U package.tar.zx # 从本地文件安装
pactree package_name # 显示软件的依赖树
yay与pacman一样，只要替换pacman为yay即可
其中特殊的一条：
yay -c # 卸载所有无用的依赖。类比 apt-get autoremove
