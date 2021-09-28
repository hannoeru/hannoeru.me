---
title: 【JavaScript】JS地下城-4F-時區
author: hanlee
type: post
lang: zh-TW
date: 2019-05-15T19:08:21+00:00
description: JS地下城-4F-時區
url: /【javascript】js地下城-4f-時區/
image: /images/2019/05/スクリーンショット-2019-05-16-2.51.05.png
categories:
  - JavaScript
  - Programming
tags:
  - CSS
  - HTML
  - JavaScript
  - JS地下城

---

## 4F-時區

![wp-image-256](/images/2019/05/スクリーンショット-2019-05-16-2.51.05.png)

### 連結

[Demo](https://hannoeru.github.io/world-clock/)

[Code](https://github.com/hannoeru/world-clock)

### 使用語言

HTML、CSS、JavaScript（ES6）

### BOSS 弱點

1. 【特定技術】僅能使用原生 JS 開發，不能使用套件
2. 【特定技術】特別注意必須用 JS 處理各國時區
3. 【書寫能力】請寫一篇 BLOG 來介紹你的挑戰過程，並介紹 JavaScript 如何提供 GMT、UTC 時區語法，以及何謂 TimeStamp。

### 技巧

#### **`toLocaleString()`** 函式用法

```js
var time = new Date();

//第一個參數：顯示語言＆格式
//第二個參數：option
console.log(time.toLocaleString("en-GB", {
  timeZone: "UTC",
  hour12: false,
}));
```

這次使用到的 Option 有兩個：

- timeZone
  - 可以接受像是 &#8220;America/New_York&#8221; 這樣的時區，參閱：[IANA time zone database][1]
- hour12
  - true //12小時制
  - false //24小時制

### 參考資料

[Date.prototype.toLocaleString() &#8211; JavaScript &#8211; MDN &#8211;
Mozilla][2]

[1]: https://www.iana.org/time-zones
[2]: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
