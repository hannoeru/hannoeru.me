---
title: 如何使用VPN跨區觀看日本Netflix？
author: hanlee
type: post
date: 2019-04-29T19:17:03+00:00
excerpt: 日本Netflix有些影片沒有開放給國外觀看，因此在台灣無法跨區看日本Netflix影集。
url: /如何使用vpn觀看日本netflix？/
image: /img/2019/05/netflix_title1_20150905-1.png
categories:
  - Netflix
  - OpenVPN
tags:
  - Netflix
  - OpenVPN
  - VPN

---
## 問題

日本Netflix有些影片沒有開放給國外觀看，因此在台灣無法跨區看日本Netflix影集。

## 解決辦法

使用VPN（虛擬私人網路）連線到日本，Netflix就會以為你是從日本的位置觀看影片，以達到目的。

如果想要更深入了解VPN的話可以<a href="https://nordvpn.com/zh-tw/what-is-a-vpn/" target="_blank" rel="noreferrer noopener" aria-label=" (新しいタブで開く)">點這裡</a>。

雖然網路上有許多的VPN供應商，但是大部分都已經被日本Netflix給封鎖了，所以基本上也是無法觀看的。

那該怎麼辦呢？？

幸好，有一個網站叫做 <a href="https://www.vpngate.net" target="_blank" rel="noreferrer noopener" aria-label=" (新しいタブで開く)">VPN Gate</a> ，這個網站上面提供了很多學術用途或是自行架設的VPN伺服器可以供大家使用。由於這個網站上面的伺服器地址大部分都是來自一般用途的網路位置，經常變動，因此日本Netflix很難去封鎖。

在這裡還是要提醒一下，使用第三方提供的VPN都會有資料洩漏的風險，請自行評估，記得用完要斷線。

說到這裡，就讓我們開始教學如何使用VPN吧！

### 安裝軟體

Windows10 載點： （下載你的Windows版本的Installer）  
<a href="https://openvpn.net/community-downloads/" target="_blank" rel="noreferrer noopener" aria-label=" (新しいタブで開く)">https://openvpn.net/community-downloads/</a> 

<a href="https://tw.answers.acer.com/app/answers/detail/a_id/60437/~/%E5%A6%82%E4%BD%95%E6%9F%A5%E8%A9%A2windows-%E7%B3%BB%E7%B5%B1%E7%89%88%E6%9C%AC%EF%BC%9F" target="_blank" rel="noreferrer noopener" aria-label=" (新しいタブで開く)">如何查看Windows版本？﻿</a>

Mac OS 載點： （下載Stable版本）  
<a href="https://tunnelblick.net/downloads.html" target="_blank" rel="noreferrer noopener" aria-label=" (新しいタブで開く)">https://tunnelblick.net/downloads.html</a> 

之後去這個<a href="https://www.vpngate.net/cn/howto_openvpn.aspx" target="_blank" rel="noreferrer noopener" aria-label=" (新しいタブで開く)">連結</a>，進去以後，如果你是Windows用戶，依照Windows的指南去安裝，如果是Mac的用戶，依照Mac的指南去安裝。

### 下載OpenVPN 連結配置文件（.ovpn file)

VPN有分成很多種，OpenVPN是我們這次要使用的VPN種類，因為他的安裝方式幾乎是所有裡面最簡單的。

#### VPN服務器列表

回到<a href="https://www.vpngate.net/ja/" target="_blank" rel="noreferrer noopener" aria-label=" (新しいタブで開く)">VPN Gate</a>的首頁，往下拉你會發現有一整排的列表。

這個列表有幾樣東西是我們要看的：

  * 国・地域
  * VPN 接続数
  * 回線品質
  * スコア

首先第一個要找的就是『国・地域』，不用說當然是日本。

下一個是『VPN 接続数』，下面顯示的有三行，分別是『目前使用人數、伺服器運作時間、累計使用人數』，基本上運作時間越長，累計使用人數越多，代表這個伺服器可以撐很久。

繼續看下去，『回線品質』下面顯示的是網路速度跟目前Ping值，速度越大代表網路越快，Ping越低代表反應越快，所以最好找速度快，Ping值低的伺服器。

最後一個是『スコア』這是官方自行計算出來的數值，基本上數值越高品質越好。

選好要的伺服器以後點選『OpenVPN 設定ファイル』


<img loading="lazy" width="1024" height="451" src="https://blog.hanlee.co/wp-content/uploads/2019/04/スクリーンショット-2019-04-30-2.45.53-min-1-1024x451.png" alt="" class="wp-image-51" srcset="https://blog.hanlee.co/wp-content/uploads/2019/04/スクリーンショット-2019-04-30-2.45.53-min-1-1024x451.png 1024w, https://blog.hanlee.co/wp-content/uploads/2019/04/スクリーンショット-2019-04-30-2.45.53-min-1-300x132.png 300w, https://blog.hanlee.co/wp-content/uploads/2019/04/スクリーンショット-2019-04-30-2.45.53-min-1-768x338.png 768w, https://blog.hanlee.co/wp-content/uploads/2019/04/スクリーンショット-2019-04-30-2.45.53-min-1.png 1260w" sizes="(max-width: 1024px) 100vw, 1024px" />

點進去以後會看到兩個分類


<img loading="lazy" width="954" height="773" src="https://blog.hanlee.co/wp-content/uploads/2019/04/スクリーンショット-2019-04-30-2.49.33-min-1.png" alt="" class="wp-image-53" srcset="https://blog.hanlee.co/wp-content/uploads/2019/04/スクリーンショット-2019-04-30-2.49.33-min-1.png 954w, https://blog.hanlee.co/wp-content/uploads/2019/04/スクリーンショット-2019-04-30-2.49.33-min-1-300x243.png 300w, https://blog.hanlee.co/wp-content/uploads/2019/04/スクリーンショット-2019-04-30-2.49.33-min-1-768x622.png 768w" sizes="(max-width: 954px) 100vw, 954px" />

一個是DDNS開頭，另一個是IP開頭，選擇DDNS下方的設定檔。

你會看到他有分成UDP跟TCP這裡可以自行選擇，不過因為每個人環境不太一樣有時候TCP會失敗，因此我比較推薦直接用UDP。

### 使用.ovpn檔案

如果你是Mac使用者，依照剛剛安裝軟體的網址<a rel="noreferrer noopener" aria-label=" (新しいタブで開く)" href="https://www.vpngate.net/cn/howto_openvpn.aspx" target="_blank">連結</a>所說明的安裝ovpn檔案後，記得將第二個項目打勾（傳送所有流量），網路流量才會被導入VPN（如下圖）


<img loading="lazy" width="872" height="640" src="https://blog.hanlee.co/wp-content/uploads/2019/04/スクリーンショット-2019-04-30-2.57.41.png" alt="" class="wp-image-54" srcset="https://blog.hanlee.co/wp-content/uploads/2019/04/スクリーンショット-2019-04-30-2.57.41.png 872w, https://blog.hanlee.co/wp-content/uploads/2019/04/スクリーンショット-2019-04-30-2.57.41-300x220.png 300w, https://blog.hanlee.co/wp-content/uploads/2019/04/スクリーンショット-2019-04-30-2.57.41-768x564.png 768w" sizes="(max-width: 872px) 100vw, 872px" />

Windows會自動傳送所有流量所以不用多做設定。

完成之後按下『連結』，就可以開始享受日本Netflix了！！

### 測試

進入這個<a rel="noreferrer noopener" aria-label=" (新しいタブで開く)" href="https://www.ez2o.com/App/Net/IP" target="_blank">網站</a>查看IP位置

如果國家顯示日本，就代表成功了，還是顯示台灣的話就回去上面確認是不是少做了什麼。

## 補充

設定檔可能很快就因為一些變動而無法使用，這時候不要覺得奇怪，趕快去找下一個設定檔吧！

如果不想那麼常換設定檔的話最好當初就找『スコア』比較高、運作時間比較長的伺服器。

如果有問題歡迎在下面留言！

以上。