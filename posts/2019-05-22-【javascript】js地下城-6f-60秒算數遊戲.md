---
title: 【JavaScript】JS地下城-6F-60秒算數遊戲
author: hanlee
type: post
lang: zh-TW
date: 2019-05-21T15:41:10+00:00
description: 6F-60秒算數遊戲
url: /【javascript】js地下城-6f-60秒算數遊戲/
image: /images/2019/05/スクリーンショット-2019-05-21-21.03.28.png
categories:
  - JavaScript
  - Programming
tags:
  - CSS
  - HTML
  - JavaScript
  - JS地下城

---

## 6F-60秒算數遊戲

![wp-image-289](/images/2019/05/スクリーンショット-2019-05-21-21.03.28.png)

### 連結

[Demo](https://hannoeru.github.io/sec-game/)

[Code](https://github.com/hannoeru/sec-game)

### 使用語言

HTML、CSS、JavaScript（ES6）

### BOSS 弱點

1. 【特定技術】遊戲規則
   1. 0~20 秒為 1位數計算 (5-3)，21~40 秒為 2 位數計算 (30*19)，41~60 秒為 3 位數計算
      (332+312)，加減乘除規則請用隨機產生，不可寫死題目，60 秒內可無限次數答題。
   2. 0~40 秒答對加一分，41~60 秒答對加五分，答錯扣一分，最多僅能扣到零分
2. 【特定技術】不可設計跳轉頁面，都得在同一頁內部切換頁面完成。

### 心得

最近感覺用 flex 用上癮了，所以這次排版用了很多，也越來越了解用法，CSS 很快就寫完了。

JS 的部分，原本想要用 Vue 做的，但是因為我才剛開始看教學&#8230;很多語法搞不清楚還要一直查，所以等我學得差不多再來用&#8230;

### 防止作弊

#### 將全域變數變成區域變數

我目前用了 ES6 的語法加上外面包了一層 function，就無法透過 console 修改變數內容或執行函數了，不知道有沒有破解的方法？

#### 混淆程式碼

透過混淆程式碼破壞可讀性，讓其他人看不懂你在寫什麼，不知道你的程式邏輯，自然就不知道該怎麼修改。

可是這個很容易被逆向，厲害的不用幾分鐘就可以還原出源碼，不是一個非常有效的方式。

#### 後端驗證

將題目、答案、分數、時間等加密後傳至後端做驗證，如果擅自修改比對後就會發現，使用 HTTPS 防止封包被攔截。

### 技巧

#### `setInterval()` & `clearInterval()`

`setInterval()`：根據設定的時間重複執行。

`clearInterval()`：停止已經設定的 `setInterval()`。

範例：

```js
// 指定interval變數到setInterval()
const interval = setInterval(() => {
  countTime -= 1;
  if (countTime < 10) {
    timeDOM.textContent = `00 : 0${countTime}`;
  } else {
    timeDOM.textContent = `00 : ${countTime}`;
  }
  if (countTime === 0) {
    mainDOM.classList.add("hidden");
    restartDOM.classList.remove("hidden");
    gaming = false;
    // 用clearInterval()停止interval
    clearInterval(interval);
    finalScore.textContent = score;
  }
}, 1000);
```

### 參考資料

<a href="https://wcc723.github.io/css/2017/07/21/css-flex/" target="_blank" rel="noreferrer noopener" aria-label=" (新しいタブで開く)">圖解：CSS
Flex 屬性一點也不難</a>

[JavaScriptでsetIntervalを使う方法【初心者向け】](https://techacademy.jp/magazine/5537)
