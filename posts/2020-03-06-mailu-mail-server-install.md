---
title: 輕量簡單 Mail Server - Mailu 安裝教學
author: hanlee
type: post
lang: zh-TW
date: 2020-03-05T17:56:19+00:00
description: 官方簡介Mailu是一個簡單而功能齊全的郵件服務器，它是一組 Docker Image。它是開源軟體，可以接受建議和外部貢獻。該項目旨在為人們提供易於安裝，易於維護且功能齊全的郵件服務器，不發行專有軟體或流行的軟體中經常出現的不相關功能。
url: /mailu-mail-server-install/
image: /images/2020/03/スクリーンショット-2020-03-06-2.59.20.png
categories:
  - Linux
tags:
  - Admin
  - Debian
  - Docker
  - Email
  - IMAP
  - Linode
  - Linux
  - Mail
  - Mail Server
  - Mailu
  - SMTP
  - SSL

---

## 官方簡介

Mailu 是一個簡單而功能齊全的郵件服務器，它是一組 Docker
Image。它是開源軟體，可以接受建議和外部貢獻。該項目旨在為人們提供易於安裝，易於維護且功能齊全的郵件服務器，不發行專有軟體或流行的軟體中經常出現的不相關功能。

### 主要架構

- **標準電子郵件服務器**：IMAP 和 IMAP+、SMTP 跟 Submission。
- **進階電子郵件功能**：別名、域別名、自定義路由。
- **Web訪問**：多個 Webmail 和管理界面。
- **用戶功能**：別名、自動回复、自動轉發、獲取的帳戶。
- **管理員功能**：全局管理員、公告、每個域的委派、配額。
- **安全性**：強制 TLS，Let's encrypt！、輸出 DKIM、防病毒掃描程序。
- **反垃圾郵件**：自動學習、灰名單、DMARC 和 SPF。
- **自由**：全部都是開源軟體、不會追蹤資料。

## 伺服器

這次的伺服器我選擇了 Linode 的虛擬伺服器

官方網站：<https://www.linode.com/>

到 Linodes 目錄，選擇 Add a Linode，設定如下：

![wp-image-532](/images/2020/03/スクリーンショット-2020-03-06-2.08.53.png)

之後記得到下方設定 root 密碼，如果有 SSH Key 可以在這裡上傳（不知道的話不用）。

確定金額 5USD &#47; 一個月 按下 Create ，開始創建虛擬機。

## 安裝 Docker && docker-compose

在自己的電腦，打開終端機輸入：

```bash
ssh root@server-ip
```

### 安裝 Docker

官方安裝腳本：

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

### 安裝 docker-compose

下載 docker-compose

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

更改權限：（可執行）

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

連結到 `/usr/local/bin/`（可直接從終端執行）

```bash
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

測試安裝

```bash
docker-compose --version
```

如果有出現像是這樣的版本資訊就是成功了（類似）

```bash
docker-compose version 1.25.4, build 1110ad01
```

## 生成 Mailu 安裝檔案

網域名稱：`domain.com`

主機名稱：`mail.domain.com`

以上兩個請替換成自己的網域和主機名稱

官方設定檔生成網站：<https://setup.mailu.io/>

選擇 Compose 點選 Next

![wp-image-538](/images/2020/03/スクリーンショット-2020-03-06-2.24.47.png)
![wp-image-535](/images/2020/03/スクリーンショット-2020-03-06-2.25.59.png)
![wp-image-537](/images/2020/03/スクリーンショット-2020-03-06-2.26.10.png)

替換 server-ip 為你的 Linode IP（虛擬機IP）

![wp-image-536](/images/2020/03/スクリーンショット-2020-03-06-2.26.35.png)
![wp-image-534](/images/2020/03/スクリーンショット-2020-03-06-2.26.43.png)

最後點選 Setup Mailu 就會秀出這樣的頁面：

![wp-image-539](/images/2020/03/スクリーンショット-2020-03-06-2.34.08.png)

跟照他的指示

創建資料夾：

```bash
mkdir /mailu
cd /mailu
wget 網頁顯示的網址
```

啟動伺服器：

```bash
docker-compose -p mailu up  -d
docker-compose -p mailu exec admin flask mailu admin admin domain.com PASSWORD // 替換 PASSWORD => 管理員密碼
```

## 設定 DNS

設定一筆 Ａ 紀錄指向 Linode 虛擬伺服器 IP

```bash
mail.domain.com.  IN  A  a.b.c.d
```

過一陣子後，開啟瀏覽器進去 <https://mail.domain.com/admin> 並登入，成功的話就代表伺服器成功啟動了。

進去 Mail Doamins 點選第一個 Icon

![wp-image-540](/images/2020/03/スクリーンショット_2020-03-06_2_45_03.png)

裡面就會列出剩餘要設定的 DNS 紀錄了。

全部設定完以後就可以登入測試看看寄信了喔。

剩餘的功能就讓大家自己去摸索了，這個界面應該是沒有太困難，有問題在下面留言，我有空都會回覆。
