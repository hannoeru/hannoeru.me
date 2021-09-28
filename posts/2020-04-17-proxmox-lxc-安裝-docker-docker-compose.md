---
title: 'Proxmox LXC 安裝 Docker & Docker Compose'
author: hanlee
type: post
lang: zh-TW
date: 2020-04-17T08:10:44+00:00
description: '建立一個 Proxmox LXC，在 LXC 中新增使用者，安裝 Docker & Docker Compose。'
url: /proxmox-lxc-安裝-docker-docker-compose/
image: /images/2020/04/docker-in-lxc.png
categories:
  - Proxmox
tags:
  - Container
  - Debian
  - Docker
  - Docker Compose
  - LXC
  - Proxmox
  - sudo

---

## 建立 LXC

重點：

- 勾選 Unprivileged container
- 不要在建立後自動啟動

![wp-image-551](/images/2020/04/スクリーンショット-2020-04-17-16.08.06.png)
![wp-image-555](/images/2020/04/スクリーンショット-2020-04-17-16.08.19.png)
![wp-image-552](/images/2020/04/スクリーンショット-2020-04-17-16.10.13.png)

## 設定 LXC

設定內容：Options => Features 勾選

- keyctl
- Nesting

以上兩個

![wp-image-553](/images/2020/04/スクリーンショット-2020-04-17-16.10.38.png)
![wp-image-554](/images/2020/04/スクリーンショット-2020-04-17-16.10.46.png)

## 啟動 LXC & 新增使用者

### 啟動後 SSH 進 LXC

```bash
ssh root@server_ip_address
```

### 安裝 sudo

```bash
apt update
apt install sudo
```

### 新增使用者

自行替換 username

```bash
adduser username
```

### 把剛創建的使用者加入 sudo 群組

```bash
usermod -aG sudo username
```

### sudo 不需輸入密碼（可選）

開啟設定檔：

```bash
visudo
```

更改為不需輸入密碼

```bash
# Allow members of group sudo to execute any command
%sudo  ALL=(ALL:ALL) NOPASSWD:ALL
```

### 切換使用者 & 測試 sudo

切換使用者：

```bash
su - username
```

測試 sudo

```bash
sudo whoami
```

輸出：username 的話就代表成功了！

## 安裝 Docker & Docker Compose

使用剛剛創建的使用者執行以下步驟

### 前置步驟

更新 source

```bash
sudo apt update
```

讓 apt 使用 HTTPS 連線

```bash
sudo apt install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
```

加入 Docker 官方 GPG key

```bash
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -
```

加入 Docker 官方 repository

```bash
sudo add-apt-repository \
   "deb &#91;arch=amd64] https://download.docker.com/linux/debian \
   $(lsb_release -cs) \
   stable"
```

### 安裝 Docker

```bash
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

測試：

```bash
docker version
```

有跑出版本資訊就成功了

#### 將使用者加入 docker 群組（可選）

可以不使用 sudo 直接執行 docker

```bash
sudo usermod -aG docker $USER
```

### 安裝 Docker Compose

下載 Docker Compose

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

權限可執行

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

連結到 path

```bash
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

確認安裝

```bash
docker-compose --version
```

有跑出版本資訊就成功了

## 結語

以上就是在 Proxmox LXC 安裝 Docker & Docker Compose 的方法

至於要新增一個使用者而不直接使用 root 帳號主要有兩個原因

- 安全性問題，Docker 官方也建議不要使用 root 帳號
- 有些 image 如果用 root 跑的話會有權限問題

如果有其他問題，歡迎在下面留言！
