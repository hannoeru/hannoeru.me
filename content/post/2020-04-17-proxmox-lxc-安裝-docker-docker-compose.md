---
title: 'Proxmox LXC 安裝 Docker & Docker Compose'
author: hanlee
type: post
date: 2020-04-17T08:10:44+00:00
excerpt: '建立一個 Proxmox LXC，在 LXC 中新增使用者，安裝 Docker & Docker Compose。'
url: /proxmox-lxc-安裝-docker-docker-compose/
featured_image: /wp-content/uploads/2020/04/docker-in-lxc.png
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

  * 勾選 Unprivileged container
  * 不要在建立後自動啟動<figure class="wp-block-image size-large">

<img loading="lazy" width="1024" height="747" src="https://blog.hanlee.co/wp-content/uploads/2020/04/スクリーンショット-2020-04-17-16.08.06-1024x747.png" alt="" class="wp-image-551" srcset="https://blog.hanlee.co/wp-content/uploads/2020/04/スクリーンショット-2020-04-17-16.08.06-1024x747.png 1024w, https://blog.hanlee.co/wp-content/uploads/2020/04/スクリーンショット-2020-04-17-16.08.06-300x219.png 300w, https://blog.hanlee.co/wp-content/uploads/2020/04/スクリーンショット-2020-04-17-16.08.06-768x560.png 768w, https://blog.hanlee.co/wp-content/uploads/2020/04/スクリーンショット-2020-04-17-16.08.06.png 1396w" sizes="(max-width: 1024px) 100vw, 1024px" /> </figure> <figure class="wp-block-image size-large"><img loading="lazy" width="752" height="352" src="https://blog.hanlee.co/wp-content/uploads/2020/04/スクリーンショット-2020-04-17-16.08.19.png" alt="" class="wp-image-555" srcset="https://blog.hanlee.co/wp-content/uploads/2020/04/スクリーンショット-2020-04-17-16.08.19.png 752w, https://blog.hanlee.co/wp-content/uploads/2020/04/スクリーンショット-2020-04-17-16.08.19-300x140.png 300w" sizes="(max-width: 752px) 100vw, 752px" /></figure> <figure class="wp-block-image size-large"><img loading="lazy" width="1024" height="748" src="https://blog.hanlee.co/wp-content/uploads/2020/04/スクリーンショット-2020-04-17-16.10.13-1024x748.png" alt="" class="wp-image-552" srcset="https://blog.hanlee.co/wp-content/uploads/2020/04/スクリーンショット-2020-04-17-16.10.13-1024x748.png 1024w, https://blog.hanlee.co/wp-content/uploads/2020/04/スクリーンショット-2020-04-17-16.10.13-300x219.png 300w, https://blog.hanlee.co/wp-content/uploads/2020/04/スクリーンショット-2020-04-17-16.10.13-768x561.png 768w, https://blog.hanlee.co/wp-content/uploads/2020/04/スクリーンショット-2020-04-17-16.10.13.png 1402w" sizes="(max-width: 1024px) 100vw, 1024px" /></figure> 

## 設定 LXC

設定內容：Options => Features 勾選

  * keyctl
  * Nesting

以上兩個<figure class="wp-block-image size-large">

<img loading="lazy" width="932" height="828" src="https://blog.hanlee.co/wp-content/uploads/2020/04/スクリーンショット-2020-04-17-16.10.38.png" alt="" class="wp-image-553" srcset="https://blog.hanlee.co/wp-content/uploads/2020/04/スクリーンショット-2020-04-17-16.10.38.png 932w, https://blog.hanlee.co/wp-content/uploads/2020/04/スクリーンショット-2020-04-17-16.10.38-300x267.png 300w, https://blog.hanlee.co/wp-content/uploads/2020/04/スクリーンショット-2020-04-17-16.10.38-768x682.png 768w" sizes="(max-width: 932px) 100vw, 932px" /> </figure> <figure class="wp-block-image size-large"><img loading="lazy" width="602" height="482" src="https://blog.hanlee.co/wp-content/uploads/2020/04/スクリーンショット-2020-04-17-16.10.46.png" alt="" class="wp-image-554" srcset="https://blog.hanlee.co/wp-content/uploads/2020/04/スクリーンショット-2020-04-17-16.10.46.png 602w, https://blog.hanlee.co/wp-content/uploads/2020/04/スクリーンショット-2020-04-17-16.10.46-300x240.png 300w" sizes="(max-width: 602px) 100vw, 602px" /></figure> 

## 啟動 LXC & 新增使用者

### 啟動後 SSH 進 LXC

<pre class="wp-block-code"><code>ssh root@server_ip_address</code></pre>

### 安裝 sudo

<pre class="wp-block-code"><code>apt update
apt install sudo</code></pre>

### 新增使用者

自行替換 username

<pre class="wp-block-code"><code>adduser username</code></pre>

### 把剛創建的使用者加入 sudo 群組

<pre class="wp-block-code"><code>usermod -aG sudo username</code></pre>

### sudo 不需輸入密碼（可選）

開啟設定檔：

<pre class="wp-block-code"><code>visudo</code></pre>

更改為不需輸入密碼

<pre class="wp-block-code"><code># Allow members of group sudo to execute any command
%sudo  ALL=(ALL:ALL) NOPASSWD:ALL</code></pre>

### 切換使用者 & 測試 sudo

切換使用者：

<pre class="wp-block-code"><code>su - username</code></pre>

測試 sudo

<pre class="wp-block-code"><code>sudo whoami</code></pre>

輸出：username 的話就代表成功了！

## 安裝 Docker & Docker Compose

使用剛剛創建的使用者執行以下步驟

### 前置步驟

更新 source

<pre class="wp-block-code"><code>sudo apt update</code></pre>

讓 apt 使用 HTTPS 連線

<pre class="wp-block-code"><code>sudo apt install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common</code></pre>

加入 Docker 官方 GPG key

<pre class="wp-block-code"><code>curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -</code></pre>

加入 Docker 官方 repository

<pre class="wp-block-code"><code>sudo add-apt-repository \
   "deb &#91;arch=amd64] https://download.docker.com/linux/debian \
   $(lsb_release -cs) \
   stable"</code></pre>

### 安裝 Docker

<pre class="wp-block-code"><code>sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io</code></pre>

測試：

<pre class="wp-block-code"><code>docker version</code></pre>

有跑出版本資訊就成功了

#### 將使用者加入 docker 群組（可選）

可以不使用 sudo 直接執行 docker

<pre class="wp-block-code"><code>sudo usermod -aG docker $USER</code></pre>

### 安裝 Docker Compose

下載 Docker Compose

<pre class="wp-block-code"><code>sudo curl -L "https://github.com/docker/compose/releases/download/1.25.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose</code></pre>

權限可執行

<pre class="wp-block-code"><code>sudo chmod +x /usr/local/bin/docker-compose</code></pre>

連結到 path

<pre class="wp-block-code"><code>sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose</code></pre>

確認安裝

<pre class="wp-block-code"><code>docker-compose --version</code></pre>

有跑出版本資訊就成功了

## 結語

以上就是在 Proxmox LXC 安裝 Docker & Docker Compose 的方法

至於要新增一個使用者而不直接使用 root 帳號主要有兩個原因

  * 安全性問題，Docker 官方也建議不要使用 root 帳號
  * 有些 image 如果用 root 跑的話會有權限問題

如果有其他問題，歡迎在下面留言！