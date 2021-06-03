---
title: MacOS 出現 NSSQLiteErrorDomain 錯誤的解決辦法
author: hanlee
type: post
date: 2019-06-06T09:51:58+00:00
excerpt: 這是一個文件權限錯誤，我是在用 Time Machine 回復資料後出現這個錯誤，也有可能會是其他原因導致錯誤
url: /macos-nssqliteerrordomain/
image: /img/2019/06/NSSQLiteErrorDomain.png
categories:
  - MacOS
tags:
  - Error
  - MacOS
  - NSSQLiteErrorDomain
  - Time Machine

---
<figure class="wp-block-image"><img loading="lazy" width="1024" height="683" src="https://blog.hanlee.co/wp-content/uploads/2019/06/NSSQLiteErrorDomain-1024x683.png" alt="" class="wp-image-383" srcset="https://blog.hanlee.co/wp-content/uploads/2019/06/NSSQLiteErrorDomain-1024x683.png 1024w, https://blog.hanlee.co/wp-content/uploads/2019/06/NSSQLiteErrorDomain-300x200.png 300w, https://blog.hanlee.co/wp-content/uploads/2019/06/NSSQLiteErrorDomain-768x512.png 768w, https://blog.hanlee.co/wp-content/uploads/2019/06/NSSQLiteErrorDomain.png 1200w" sizes="(max-width: 1024px) 100vw, 1024px" /></figure> 

## 原因

這是一個文件權限錯誤，我是在用 Time Machine 回復資料後，開啟行事曆時出現這個錯誤，也有可能會是其他原因導致錯誤。

## 解決方法

Apple 有一篇關於修復權限的文章：

<https://support.apple.com/zh-tw/HT203538>

照著操作做過一遍後記得重新啟動，問題應該解決。

如果沒有解決，可能就要重新安裝MacOS了。

## 參考資料

<https://github.com/folivoraAI/BetterTouchTool/issues/2118>