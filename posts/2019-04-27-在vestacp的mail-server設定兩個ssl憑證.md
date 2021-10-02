---
title: VestaCP Mail Server設定兩個SSL憑證
author: hanlee
type: post
lang: zh-TW
date: 2019-04-26T19:00:40+00:00
description: 如何在Dovecot和Exim上使用多個SSL證書？
url: /在vestacp的mail-server設定兩個ssl憑證/
image: /images/2019/04/Email-Server.png
categories:
  - VestaCP
tags:
  - Dovecot
  - Exim
  - IMAP
  - Mail
  - SMTP
  - SSL
  - VestaCP

---
## 問題

如何在 Dovecot 和 Exim 上使用多個 SSL 證書？

## 環境

VestaCP 0.9.8-24

## 原因

默認配置僅允許一對 SSL 證書。

## 解決辦法

假設我們現在有兩個網域

* cat.com
* dog.com

他們的憑證分別是

* cat.com.crt
* cat.com.key
* dog.com.crt
* dog.com.key

將所有憑證複製到 `/usr/local/vesta/ssl/`

```bash
scp /path/to/憑證/* Username@Vesta-IP:/usr/local/vesta/ssl/
```

切換目錄到 `/usr/local/vesta/ssl/` 後設定權限：

```bash
chmod 660 ./*
chown root:mail ./*
```

### Exim

到 Vesta 控制面板，點選右上腳 Server -> Exim4 -> CONFIGURE 找到下列三行：

```bash
tls_advertise_hosts = *
tls_certificate= /usr/local/vesta/ssl/certificate.crt  #註解或刪除
tls_privatekey= /usr/local/vesta/ssl/certificate.key   #註解或刪除
```

修改成

```bash
tls_advertise_hosts = *
tls_certificate = ${if exists{/usr/local/vesta/ssl/${tls_sni}.crt}{/usr/local/vesta/ssl/${tls_sni}.crt}{/usr/local/vesta/ssl/certificate.crt}}
tls_privatekey = ${if exists{/usr/local/vesta/ssl/${tls_sni}.key}{/usr/local/vesta/ssl/${tls_sni}.key}{/usr/local/vesta/ssl/certificate.key}}
```

勾選 Restart 後，按下 Save 儲存。

### Dovecot

到 Vesta 控制面板，點選右上腳 Server -> dovecot -> CONFIGURE 找到 `/etc/dovecot/conf.d/10-ssl.conf` 修改成：

```bash
# --------新增--------#
local_name cat.com {
  ssl_cert = </usr/local/vesta/ssl/cat.com.crt
  ssl_key = </usr/local/vesta/ssl/cat.com.key
}

local_name dog.com {
  ssl_cert = </usr/local/vesta/ssl/dog.com.crt
  ssl_key = </usr/local/vesta/ssl/dog.com.key
}
#--------------------#
ssl = yes
ssl_cert = </usr/local/vesta/ssl/certificate.crt
ssl_key = </usr/local/vesta/ssl/certificate.key
```

勾選 Restart 後，按下 Save 儲存。

### 測試

完成後記得測試憑證是否有正確安裝，要測試很簡單：

```bash
#測試IMAP
openssl s_client -showcerts -connect mail.example.com:993
#測試SMTP
openssl s_client -showcerts -connect mail.example.com:465
```

如果有憑證資訊跑出來核對一下正確就是成功了，失敗的話回去上面看一下是不是少做了什麼步驟。

以上。

## 參考資料

[MULTIPLE SSL CERTS WITH DOVECOT & EXIM][1]

[IMAP/POP3/SMTP 用に SSL が機能し、適切な証明書がインストールされていることを確認するには][2]

[1]: https://help.atmail.com/hc/en-us/articles/115009208748-Multiple-SSL-certs-with-Dovecot-Exim
[2]: https://support.plesk.com/hc/ja/articles/213961665-IMAP-POP3-SMTP-%E7%94%A8%E3%81%AB-SSL-%E3%81%8C%E6%A9%9F%E8%83%BD%E3%81%97-%E9%81%A9%E5%88%87%E3%81%AA%E8%A8%BC%E6%98%8E%E6%9B%B8%E3%81%8C%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB%E3%81%95%E3%82%8C%E3%81%A6%E3%81%84%E3%82%8B%E3%81%93%E3%81%A8%E3%82%92%E7%A2%BA%E8%AA%8D%E3%81%99%E3%82%8B%E3%81%AB%E3%81%AF
