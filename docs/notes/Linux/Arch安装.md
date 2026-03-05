# Arch Linux 安装指南

## 1. 准备工作
- 提前分配200G磁盘空间（不要格式化）
- 确保EFI分区有足够空间
- 进入ArchISO环境
- wifi连接
  ```bash
  nmcli device wifi list
  nmcli device wifi connect "SSID" password "密码"
  ```
- 测试网络连接：
  ```bash
  ping baidu.com
  ```
- 若想边装边远程维护：
  1. passwd # 给 root 设临时密码
  2. systemctl start sshd
  3. 记录 ip a 中的 IP，随后即可 SSH 进 ISO 环境
- 设置时间同步：
  ```bash
  timedatectl set-ntp true #（设置为UTC以及NTP时间同步）
  hwclock --systohc --utc # 设置ntp自动同步时间。不要跳过这个步骤

  ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime # 设置为东八区
  hwclock --systohc #写入bios

  ```

## 2. 磁盘分区
- 查看磁盘布局：
  ```bash
  fdisk -l | less
  ```
- 使用cfdisk进行分区：
  ```bash
  cfdisk /dev/yourdisk
  ```
  cfdisk界面说明：
  ```
  [ Delete ] [ New ] [ Quit ] [ Help ] [ Write ] [ Dump ]
  [ 删除 ]  [ 新建 ] [ 退出 ] [ 帮助 ] [ 写入 ] [ 转储 ]
  ```
> 选择空闲分区(绿色),直接new,输入大小,write后输入yes确定,quit退出
- 分区建议：
> 因为是双系统,还有使用swap文件,所以只要分/mnt和/home就可以了
  - /mnt 主分区
  - home
  - boot (用windows分好的)
  - swap分区（用swap文件取代,建议为内存大小的1/4）
- 格式化分区：
  ```bash
  mkfs.ext4 /dev/主分区  # 格式化主分区
  mkfs.ext4 /dev/home分区

  mkswap /dev/nvme0n1p2  # 创建Swap文件(没有就不用)
  swapon /dev/swpa位置   # 启用Swap分区(没有就不用)
  ```
- 分区检查：
  ```bash
  lsblk #检查硬盘分区情况，一般情况下，每个相应的分区后面应该标注其挂载的目录。
  unmount #出现了错误,可以这个命令,卸载分区后使用cfdisk再次分区。
  ```
## 3. 挂载分区
```bash
# 挂载根分区
mount /dev/主分区 /mnt

# 创建并挂载 EFI 分区（/boot）
mkdir /mnt/boot
mount /dev/efi分区位置 /mnt/boot
# 创建并挂载 home 分区
mkdir /mnt/home
mount /dev/home分区 /mnt/home
```

## 4. 系统安装
- 更新镜像源：
  ```bash
  reflector --country 'China' --age 12 --protocol https --sort rate --save /etc/pacman.d/mirrorlist
  pacman -Sy #同步并更新本地存储库
  ```
- 安装基本系统：
  ```bash
  # * 基础软件 base linux linux-firmware是
  # * 联网必装 networkmanager iwd 
  # * cpu微码 intel-ucode 或 amd-ucode
  pacstrap -K /mnt base base-devel linux linux-firmware \
         networkmanager iwd openssh sudo vim ntfs-3g \
         amd-ucode

  pacman -Sy archlinux-keyring #如果报错用这个
  ```
- **重要!!!生成fstab文件**：
  ```bash
  genfstab -U /mnt >> /mnt/etc/fstab
  ```

## 5. 系统配置
- 进入新系统：
  ```bash
  arch-chroot /mnt
  ```
- 设置时区：
  ```bash
  ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime #指定系统时区
  hwclock --systohc #将硬件时钟设置为当前的系统时间
  ```
- 配置系统语言：
  ```bash
  vim /etc/locale.gen
  # 搜索取消注释 en_US.UTF-8 UTF-8 和 zh_CN.UTF-8 UTF-8
  locale-gen #生成本地化文件
  echo "LANG=en_US.UTF-8" > /etc/locale.conf # 不要在安装中文字体前设置系统语言为中文
  ```
- 设置主机名：
  ```bash
  # 打开/etc/hostname输入主机名"nbljsbdk-arch"
  # 建议小写,可以用 "字母" "数字" "-" "."
  echo "nbljsbdk-arch" > /etc/hostname
  ```
- 启用NetworkManager服务：
  ```bash
  systemctl enable NetworkManager
  ```
- 创建并启用 swap 文件：
  ```bash
  # *chroot模式下加入-U clear参数会生成uid失败
  mkswap --size 16G --file /swapfile
  # mkswap -U clear --size 16G --file /swapfile
  swapon /swapfile
  echo "/swapfile none swap defaults 0 0" | tee -a /etc/fstab


  # 删除交换文件（需要 root 权限）
  swapoff /swapfile
  rm -f /swapfile
  从 /etc/fstab 中删除相关条目
  ```


## 6. 用户配置
- 设置root密码：
  ```bash
  passwd root
  ```
- 创建普通用户：
  ```bash
  useradd -m -G wheel -s /bin/bash note_user
  passwd note_user
  ```
- 配置sudo权限：
  ```bash
  visudo
  # 取消注释 %wheel ALL=(ALL:ALL) ALL
  ```


## 7. 引导程序安装
- 安装GRUB包：
  ```bash
  pacman -S grub efibootmgr os-prober # 安装grub及相关组件
  ```
- 编辑GRUB文件：
  ```bash
  vim /etc/default/grub # 编辑grub配置
  找到#GRUB_DISABLE_OS_PROBER=false #（应该在文件末尾），删掉行首的注释。
  ```
- 硬盘安装GRUB引导：
  ```bash
  grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB 
  grub-mkconfig -o /boot/grub/grub.cfg # 创建配置文件

  blkid /dev/EIF分区 #查看EFI分区的UUID，分区参考前面的表格。EFI磁盘UUID为 72FE-9083
  vim /boot/grub/grub.cfg 用vim配置启动项，我们需要手动添加Windows配置。
  搜索os-prober，在BEGIN和END之间新编辑内容，结果如下，只需要修改第六行未的几个字符，将72FE-9083替换成上面找到的UUID。
  ```
  ```bash
  ### BEGIN /etc/grub.d/30_os-prober ###
  menuentry 'Microsoft Windows 11' {
  		insmod part_gpt
  		insmod fat
  		insmod chain
  		search --fs-uuid --no-floppy --set=root 72FE-9083
  		chainloader (${root})/EFI/Microsoft/Boot/bootmgfw.efi}
  ### END /etc/grub.d/30_os-prober ###
  保存退出
  ```
- 重启到Windows，防止暴毙：
  ```bash
  exit 退出/mnt环境
  
  umount -R /mnt 卸载/mnt下的所有硬盘 #不行就加入-l延迟卸载 不然就-f
  
  reboot重启设备

  # 如果不能进入grub  先改bios里面boot设置
  # 不行就整这个
  mkdir -p /boot/EFI/BOOT
  cp /boot/EFI/grub/grubx64.efi /boot/EFI/BOOT/BOOTX64.EFI
  ```
## 8. 桌面环境安装
- 重新打开ssh
  ```bash
  sudo systemctl status sshd
  ```

- 安装KDE桌面：
  ```bash
  pacman -S plasma sddm konsole dolphin kate kde-applications
  systemctl enable sddm
  ```

## 9. 系统修复
- 挂载分区：
  ```bash
  fdisk -l | less #查看分区
  lsblk 
  
  mount /dev/主分区 /mnt # 挂载主分区到/mnt文件夹。
  mount /dev/efi分区位置 /mnt/boot # 挂载EFI分区到boot文件夹。
  swapon /dev/swpa位置 #指定/dev/nvme0n1p2为Swap。

  root@archiso ~ #  mount /dev/nvme0n1p5 /mnt
  root@archiso ~ #  mount /dev/nvme0n1p1 /mnt/boot
  root@archiso ~ # arch-chroot /mnt

  ```
- 重新安装GRUB：
  ```bash
  arch-chroot /mnt #进入系统
  grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=GRUB #重新安装GRUB到EFI分区
  grub-mkconfig -o /boot/grub/grub.cfg # 更新GRUB配置文件
  exit
  reboot
  ```