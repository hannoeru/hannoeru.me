---
title: 【JavaScript】JS地下城-3F-計算機
author: hanlee
type: post
lang: zh-TW
date: 2019-05-14T16:40:28+00:00
description: JS地下城-3f-計算機
url: /【javascript】js地下城-3f-計算機/
image: /images/2019/05/スクリーンショット-2019-05-14-23.51.36.png
categories:
  - JavaScript
  - Programming
tags:
  - CSS
  - HTML
  - JavaScript
  - JS地下城

---
## 3F-計算機

![wp-image-242](/images/2019/05/スクリーンショット-2019-05-14-23.51.36.png)

### 連結

[Demo][1]

[Code][2]

### 使用語言

HTML、CSS、JavaScript（ES6）

### BOSS 弱點

  1. 【特定技術】數字位數過多時，不能因此而破版，計算機功能皆須齊全
  2. 【自我學習】請在此關卡中「自學一個你原本不太會的技巧」，投稿時分享你透過哪些資源學習，並寫範例程式碼講解該技巧，以及你如何應用在此關卡上。

### 技巧

#### 使用 `const` 宣告函式

```js
const function = () => { /*.......*/ };
```

#### 三元運算子

使用三元運算子可以大大減少程式碼佔用的行數，也可以提高效能，寫得好可以讓程式碼更好閱讀，寫不好可能連自己都看不懂&#8230;

語法：

```js
x ? i : a
```

範例：

```js
//宣告
var x = true;
//true的話回傳i，false的話回傳a
x ? i : a;
//結果回傳i
```

#### `eval()` 函式

語法：

```js
eval( 要執行的字串 )
```

範例：

```js
var str = '10+4*5';
var B = eval(str);

console.log(B); // 輸出 30
```

#### 依照文字寬度縮放文字

從 30 開始用 for 加大文字到 56，如果中間超過計算機寬度就設定當前文字大小，為了要符合美觀再 -4，才不會太靠近邊緣。

```js
//在主函式最後一行執行resizeText()
const resizeText = () => {
  for (var i = 30; i < 56; i++) {
    display.style.fontSize = i + 'px';
    if (display.scrollWidth > calculator.clientWidth) {
        display.style.fontSize = (i-4) + 'px';
        break;
    }
  }
};
```

#### 在小數點前每3格加一個逗號

參考資料：<https://codepen.io/anon/pen/xBGOLy>

```js
//在主函式第一行執行addComma(false)消除逗號進入計算
//在主函式最後一行執行addComma(true)新增逗號到輸出結果
const addComma = (isAdd) => {
  if (isAdd) {
    let parts = display.textContent.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    display.textContent = parts.join('.');
  }else {
    display.textContent = display.textContent.replace(/,/g, '');
  }
};
```

### 參考資料

[How to build an HTML calculator app from scratch using JavaScript](https://medium.freecodecamp.org/how-to-build-an-html-calculator-app-from-scratch-using-javascript-4454b8714b98)

[JavaScript初級者のためのコーディングガイド](https://qiita.com/raccy/items/bf590d3c10c3f1a2846b)

 [1]: https://hannoeru.github.io/js-calculator/
 [2]: https://github.com/hannoeru/js-calculator
