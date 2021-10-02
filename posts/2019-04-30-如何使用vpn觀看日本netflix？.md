---
title: 如何使用VPN跨區觀看日本Netflix？
author: hanlee
type: post
lang: zh-TW
date: 2019-04-29T19:17:03+00:00
description: 日本Netflix有些影片沒有開放給國外觀看，因此在台灣無法跨區看日本Netflix影集。
url: /如何使用vpn觀看日本netflix？/
image: /images/2019/05/netflix_title1_20150905-1.png
categories:
  - Netflix
  - OpenVPN
tags:
  - Netflix
  - OpenVPN
  - VPN

---

## 問題

日本 Netflix 有些影片沒有開放給國外觀看，因此在台灣無法跨區觀看日本才有的 Netflix 影集。

## 解決辦法

使用 VPN（虛擬私人網路）跨區連線到日本，Netflix 就會以為你是從日本的位置觀看影片，以達到目的。

如果想要更深入了解 VPN 的話可以 [點這裡](https://nordvpn.com/zh-tw/what-is-a-vpn/)。

雖然網路上有許多的 VPN 供應商，但是大部分都已經被日本 Netflix 封鎖了，所以基本上也是無法觀看的。

那該怎麼辦呢？？

幸好，有一個網站叫做 [VPN Gate](https://www.vpngate.net)

這個網站上面提供了許多學術用途或是自行架設的 VPN 伺服器可以供大家使用。由於這個網站上面的伺服器地址大部分都是來自一般用途的網路位置，經常變動，因此日本 Netflix 很難去封鎖。

在這裡還是要提醒一下，使用第三方提供的VPN都會有資料洩漏的風險，請自行評估，記得用完要斷線。

說到這裡，就讓我們開始教學如何使用 VPN 吧！

## 安裝 OpenVPN 用戶端軟體

Windows10 載點： （下載對應 Windows 版本的Installer）
[https://openvpn.net/community-downloads/](https://openvpn.net/community-downloads/)

> [如何查看Windows版本？](https://support.microsoft.com/zh-tw/windows/%E6%88%91%E6%AD%A3%E5%9C%A8%E5%9F%B7%E8%A1%8C%E5%93%AA%E5%80%8B%E7%89%88%E6%9C%AC%E7%9A%84-windows-%E4%BD%9C%E6%A5%AD%E7%B3%BB%E7%B5%B1-628bec99-476a-2c13-5296-9dd081cdd808)

Mac OS 載點： （下載 Stable 版本）
[https://tunnelblick.net/downloads.html](https://tunnelblick.net/downloads.html)

之後依照這個安裝教學安裝 OpenVPN 用戶端軟體：[連結](https://www.vpngate.net/cn/howto_openvpn.aspx)

## 下載 OpenVPN 配置文件（.ovpn 檔案)

VPN 有分成很多種，OpenVPN 是我們這次要使用的 VPN 種類，因為他的安裝方式幾乎是所有裡面最簡單的。

### VPN服務器列表

回到<a href="https://www.vpngate.net/ja/" target="_blank" rel="noreferrer noopener" aria-label=" (新しいタブで開く)">VPN
Gate</a>的首頁，往下拉你會發現有一整排的列表。

這個列表有幾樣東西是我們要看的：

- 国・地域
- VPN 接続数
- 回線品質
- スコア

首先第一個要找的就是『国・地域』，不用說當然是日本。

下一個是『VPN接続数』，下面顯示的有三行，分別是『目前使用人數、伺服器運作時間、累計使用人數』，基本上運作時間越長，累計使用人數越多，代表這個伺服器可以撐很久。

繼續看下去，『回線品質』下面顯示的是網路速度跟目前Ping值，速度越大代表網路越快，Ping越低代表反應越快，所以最好找速度快，Ping值低的伺服器。

最後一個是『スコア』這是官方自行計算出來的數值，基本上數值越高品質越好。

選好要的伺服器以後點選『OpenVPN 設定ファイル』

![wp-image-51](/images/2019/04/スクリーンショット-2019-04-30-2.45.53-min-1.png)

點進去以後會看到兩個分類

![wp-image-53](/images/2019/04/スクリーンショット-2019-04-30-2.49.33-min-1.png)

一個是DDNS開頭，另一個是IP開頭，選擇DDNS下方的設定檔。

你會看到他有分成UDP跟TCP這裡可以自行選擇，不過因為每個人環境不太一樣有時候TCP會失敗，因此我比較推薦直接用UDP。

## 使用 ovpn 配置文件

如果你是 Mac 使用者，依照剛剛安裝軟體的 [網址](https://www.vpngate.net/cn/howto_openvpn.aspx) 所說明的安裝 ovpn 檔案後，記得將第二個項目打勾（傳送所有流量），網路流量才會被導入VPN（如下圖）

![wp-image-54](/images/2019/04/スクリーンショット-2019-04-30-2.57.41.png)

Windows 會自動傳送所有流量所以不用多做設定。

完成之後按下『連結』，就可以開始享受日本Netflix了！！

### 測試

進入 [這個](https://www.ez2o.com/App/Net/IP) 網站查看自己目前的 IP 位置。

如果國家顯示日本，就代表成功了，還是顯示台灣的話就回去上面確認是不是少做了什麼。

## 補充

設定檔可能很快就因為一些變動而無法使用，這時候不要覺得奇怪，趕快去找下一個設定檔吧！

如果不想那麼常換設定檔的話最好當初就找『スコア』比較高、運作時間比較長的伺服器。

以上。
