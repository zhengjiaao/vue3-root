     Write-Output "clean project cache..."

     # 删除 node_modules 目录
     Write-Output "clean node_modules..."
     Remove-Item -Recurse -Force node_modules

     # 删除 package-lock.json 文件
     Write-Output "clean package-lock.json..."
     Remove-Item package-lock.json

     # 删除 dist 目录（如果存在）
     Write-Output "clean dist..."
     Remove-Item -Recurse -Force dist

     Write-Output "clean project cache is complete."
