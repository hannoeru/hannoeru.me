---
title: 在 VestaCP 安裝 Let's Encrypt 憑證
author: hanlee
type: post
lang: zh-TW
date: 2019-06-06T18:55:10+00:00
description: "使用 Let's Encrypt 申請 SSL證書，同時套用到控制面板。"
url: /vestacp-lets-encrypt/
image: /images/2019/06/スクリーンショット-2019-06-07-2.50.50.png
categories:
  - VestaCP
tags:
  - Let's Encrypt
  - VestaCP

---
## 使用 Let's Encrypt 申請 SSL 證書

使用 您的域名:8083 登入 VestaCP，然後進入到 `WEB` 頁籤，點擊 `EDIT` 你的域名。

勾選兩個選項 `SSL support` 跟 `Let's Encrypt support` 。

打開终端，使用SSH連接到您的伺服器。進入 Let's encrypt 創建與存儲 SSL 證書的目錄，並列出這些證書。

```bash
cd /home/admin/conf/web
ls
```

你會看到以域名命名的文件

```bash
ssl.testing.com.ca
ssl.testing.com.crt
ssl.testing.com.key
ssl.testing.com.pem
```

我們需要備份舊的 VestaCP 證書，並為 Let's encrypt 創建的證書建立鏈接。執行以下命令（將 testing.com 替換為自己的域名）：

```bash
mv /usr/local/vesta/ssl/certificate.crt /usr/local/vesta/ssl/certificate.crt.bak
mv /usr/local/vesta/ssl/certificate.key /usr/local/vesta/ssl/certificate.key.bak
ln -s /home/admin/conf/web/ssl.testing.com.crt /usr/local/vesta/ssl/certificate.crt
ln -s /home/admin/conf/web/ssl.testing.com.key /usr/local/vesta/ssl/certificate.key
```

修復文件權限，在终端執行以下命令：

```bash
cd /home/admin/conf/web/
chgrp mail ssl.testing.com.key
chmod 660 ssl.testing.com.key
chgrp mail ssl.testing.com.crt
chmod 660 ssl.testing.com.crt
```

之後，重新啟動伺服器上的 VestaCP 服務。

**恭喜！** 關閉現有的瀏覽器視窗並打開一個新視窗。嘗試使用 您的域名:8083 再次登入 VestaCP。您將看到應用於控制面板的 Let's encrypt 證書！

## 參考資料

<https://medium.com/andrewmmc-io/apply-ssl-certificate-by-lets-encrypt-to-vestacp-b2e255e93496>
