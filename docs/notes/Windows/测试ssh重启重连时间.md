# 测试ssh重启重连时间的ps1脚本

```powershell
# Measure-Reboot.ps1
param (
    [string]$RPiIP = "",       # 树莓派 IP
    [string]$KeyPath = "",     # 私钥路径
    [string]$User = " "        # SSH 用户名
)

# 记录开始时间
$start = Get-Date

# 发送重启命令
Write-Host "Sending reboot command..."
ssh -i $KeyPath $User@$RPiIP sudo reboot

# 等待 RPi 下线
Write-Host "Waiting for RPi to go down..."
do {
    Start-Sleep -Milliseconds 200
    $ping = Test-Connection -ComputerName $RPiIP -Count 1 -Quiet
} while ($ping)

# 等待 RPi 上线
Write-Host "Waiting for RPi to come back..."
do {
    Start-Sleep -Milliseconds 200
    $ping = Test-Connection -ComputerName $RPiIP -Count 1 -Quiet
} while (-not $ping)

# 记录结束时间
$end = Get-Date
$duration = $end - $start

Write-Host "Reboot duration: $duration"
```