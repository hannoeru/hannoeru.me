---
title: 【JavaScript】JS地下城-5F-全台空氣指標儀表板
author: hanlee
type: post
lang: zh-TW
date: 2019-05-17T15:29:24+00:00
description: JS地下城-5F-全台空氣指標儀表板參考資料
url: /【javascript】js地下城-5f-全台空氣指標儀表板/
image: /images/2019/05/スクリーンショット-2019-05-17-23.27.20.png
categories:
  - JavaScript
  - Programming
tags:
  - CSS
  - Fetch API
  - HTML
  - JavaScript
  - JS地下城

---

## 5F-全台空氣指標儀表板

![wp-image-281](/images/2019/05/スクリーンショット-2019-05-17-23.27.20.png)

### 連結

[Demo](https://hannoeru.github.io/js-aqi/)

[Code](https://github.com/hannoeru/js-aqi)

### 使用語言&API

HTML、CSS、JavaScript（ES6）、Fetch API

### BOSS 弱點

1. 【特定技術】必須使用 AJAX 技術串接資料 API，不可直些寫死資料在變數上。
2. 【特定技術】上方切換城市(高雄、台北)後，下方會切換該城市的各地區
3. 【解決問題】糟糕，BOSS 使用屏蔽魔法將 API 出處移除了，身為勇者的你必須查出 API 的下落，才能順利擊敗此 BOSS。什麼，你說會有 CORS
   問題？嗯&#8230; 身為勇者的你，一定可以找各種服務來解決的，畢竟你是「勇者」嘛 （燦笑

### 心得

這次在一開始尋找 CORS 的解決方案的時候找了很久，後來是搜尋到 Google Script 回來查才發現之前的勇者有用過，就照樣抄了 GAS 回來用。

找資料我是用 UI 線上設計稿 footer 寫的來源去找的，很快就找到了。

後來才發現其實他有一個鏡像站點是允許 CORS 的&#8230;也快很多

連結：<http://opendata2.epa.gov.tw/AQI.json>

但是因為我上傳到 Github Pages 會有混合內容的問題，所以還是掛了 Proxy。

Fetch API 照著官方文檔跟網路上找到的文章寫就沒問題了，Fetch API 有一個本棒的點是他可以直接用 response.ok
去判斷是否成功，其他參數設定也很簡單。

其他其實就跟 JS最終作業 很像，我有一部分也是直接剪下貼上以前寫的再去改。

### 底層 XMLHttpRequest、Fetch API 的差異

我翻譯了一篇寫得還不錯的文章：

<div class="wp-block-embed__wrapper">
  <blockquote class="wp-embedded-content" data-secret="o8tBgcpMY9">
    [XMLHttpRequest與Fetch API：2019年最適合Ajax的是什麼？](https://blog.hanlee.co/xmlhttprequest%e8%88%87fetch-api%ef%bc%9a2019%e5%b9%b4%e6%9c%80%e9%81%a9%e5%90%88ajax%e7%9a%84%e6%98%af%e4%bb%80%e9%ba%bc%ef%bc%9f/)
  </blockquote>
</div>

### CORS 問題解決方案

自己架 Node.JS CORS Proxy

[https://github.com/Rob&#8211;W/cors-anywhere][1]

Google搜尋：Google Apps Script CORS Proxy

<a rel="noreferrer noopener" aria-label=" (新しいタブで開く)" href="https://mtwmt.github.io/blog/api_cors_error/" target="_blank">利用google
apps script做中繼點跨網域遠端取得api資料</a>

### 技巧

#### Fetch API 寫法

基本的 fetch 請求，非常簡單就寫好了。

```js
fetch("http://example.com/movies.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (myJson) {
    console.log(JSON.stringify(myJson));
  });
```

這是一個通過網絡獲取 JSON 文件並將其輸出到控制台的程式碼。`fetch()` 最簡單的方法是只使用一個參數 &#8211; 您想要獲取的資源的路徑
&#8211;`[Response](https://developer.mozilla.org/ja/docs/Web/API/Response)`
並返回包含響應（對象）的 Promise。

這只是一個 HTTP 響應，而不是實際的 JSON。您需要使用
`[json()](https://developer.mozilla.org/ja/docs/Web/API/Body/json)`
從響應對像中提取 JSON&nbsp;。

#### 用變數提取陣列內容

原本寫法是 `array.name` 但是如果使用 [] 就可以直接帶變數進去，配合 for 回圈很好用。

```js
var array = {
  name: joy,
  age: 30,
};
var list = ["name", "age"];

array[list[1]]; //30
```

### 參考資料

<a href="https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch" target="_blank" rel="noreferrer noopener" aria-label="Fetch を使う (新しいタブで開く)">Fetch
を使う</a>

<a rel="noreferrer noopener" aria-label="まだXMLHttpRequestを使ってるの？ fetchのすすめ (新しいタブで開く)" href="https://qiita.com/uhyo/items/91649e260165b35fecd7" target="_blank">まだXMLHttpRequestを使ってるの？
fetchのすすめ</a>

[何番目系の便利なCSSまとめ](https://qiita.com/ituki_b/items/62a752389385de7ba4a2)

<a rel="noreferrer noopener" aria-label="圖解：CSS Flex 屬性一點也不難 (新しいタブで開く)" href="https://wcc723.github.io/css/2017/07/21/css-flex/" target="_blank">圖解：CSS
Flex 屬性一點也不難</a>

[1]: https://github.com/Rob--W/cors-anywhere
