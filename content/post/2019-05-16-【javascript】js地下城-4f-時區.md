---
title: 【JavaScript】JS地下城-4F-時區
author: hanlee
type: post
date: 2019-05-15T19:08:21+00:00
excerpt: JS地下城-4F-時區
url: /【javascript】js地下城-4f-時區/
featured_image: /wp-content/uploads/2019/05/スクリーンショット-2019-05-16-2.51.05.png
categories:
  - JavaScript
  - Programming
tags:
  - CSS
  - HTML
  - JavaScript
  - JS地下城

---
## 4F-時區<figure class="wp-block-image">

<img loading="lazy" width="1024" height="826" src="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2019-05-16-2.51.05-1024x826.png" alt="" class="wp-image-256" srcset="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2019-05-16-2.51.05-1024x826.png 1024w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2019-05-16-2.51.05-300x242.png 300w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2019-05-16-2.51.05-768x620.png 768w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2019-05-16-2.51.05.png 1073w" sizes="(max-width: 1024px) 100vw, 1024px" /> </figure> 

### 連結

<a rel="noreferrer noopener" aria-label="Demo (新しいタブで開く)" href="https://hannoeru.github.io/world-clock/" target="_blank">Demo</a>

<a rel="noreferrer noopener" aria-label="Code (新しいタブで開く)" href="https://github.com/hannoeru/world-clock" target="_blank">Code</a>

### 使用語言

HTML、CSS、JavaScript（ES6）

### BOSS 弱點

  1. 【特定技術】僅能使用原生 JS 開發，不能使用套件
  2. 【特定技術】特別注意必須用 JS 處理各國時區
  3. 【書寫能力】請寫一篇 BLOG 來介紹你的挑戰過程，並介紹 JavaScript 如何提供 GMT、UTC 時區語法，以及何謂 TimeStamp。

### 技巧

#### **`toLocaleString()`** 函式用法

<pre class="language-js"><code>var time = new Date();

//第一個參數：顯示語言＆格式
//第二個參數：option
console.log(time.toLocaleString('en-GB', {
timeZone: 'UTC',
hour12: false 
}));</code></pre>

這次使用到的 Option 有兩個：

  * timeZone
      * 可以接受像是 &#8220;America/New_York&#8221; 這樣的時區，參閱：[IANA time zone database][1]
  * hour12
      * true //12小時制
      * false //24小時制

### 參考資料

[Date.prototype.toLocaleString() &#8211; JavaScript &#8211; MDN &#8211; Mozilla][2]

 [1]: https://www.iana.org/time-zones
 [2]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString