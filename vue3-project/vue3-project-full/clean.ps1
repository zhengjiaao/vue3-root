Write-Output "clean project cache..."

# 删除 node_modules 目录
if (Test-Path -Path "node_modules") {
    Write-Output "clean node_modules..."
    Remove-Item -Recurse -Force node_modules
} else {
    Write-Output "node_modules directory does not exist."
}

# 删除 package-lock.json 文件
if (Test-Path -Path "package-lock.json") {
    Write-Output "clean package-lock.json..."
    Remove-Item package-lock.json
} else {
    Write-Output "package-lock.json file does not exist."
}

# 删除 dist 目录（如果存在）
if (Test-Path -Path "dist") {
    Write-Output "clean dist..."
    Remove-Item -Recurse -Force dist
} else {
    Write-Output "dist directory does not exist."
}

Write-Output "clean project cache is complete."
