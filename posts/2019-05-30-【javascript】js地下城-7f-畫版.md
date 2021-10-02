---
title: 【JavaScript】JS地下城-7F-畫版
author: hanlee
type: post
lang: zh-TW
date: 2019-05-30T10:31:06+00:00
description: 這次是我第一次使用BootStrap，之前從來都沒有用過，所以一開始查了蠻多資料了，也不知道用的方法正不正確，不過官方文檔寫得很棒所以其實上手並不難。Canvas API的部分，最基礎的畫畫功能其實很簡單，參考Google到的文章，很快就可以寫出最基本的東西，之後加上去的功能...花的時間比較多。
url: /【javascript】js地下城-7f-畫版/
image: /images/2019/05/スクリーンショット-2019-05-30-17.48.18.png
categories:
  - JavaScript
  - Programming
tags:
  - Bootstrap
  - Canvas API
  - CSS
  - HTML
  - JavaScript
  - JS地下城

---

## 7F-畫版

![wp-image-361](/images/2019/05/スクリーンショット-2019-05-30-17.48.18.png)

### 連結

[Demo](https://hannoeru.github.io/canvas-panel/)

[Code](https://github.com/hannoeru/canvas-panel)

### 使用語言

HTML、CSS、Bootstrap、JavaScript（ES6）、Canvas API

### BOSS 弱點

1. 【特定技術】遊戲規則
   1. 繪圖區請使用 Canvas 來設計，上方的控制列與下方的畫筆調整可不用
   2. SAVE ：點擊後可直接下載轉出的 PNG 圖片
   3. CLEAR ALL：清除畫版樣式
   4. UNDO、REDO：上一步、下一步
   5. 點擊箭頭時，功能列介面皆可進行收闔
2. 【擴充功能】請再自行增加「兩個功能」，我相信勇者們都是很有梗的~

### 擴充功能

- 支援手機操作
- 支援手機版型
- 橡皮擦

### 心得

這次是我第一次使用 Bootstrap，之前從來都沒有用過，所以一開始查了蠻多資料了，也不知道用的方法正不正確，不過官方文檔寫得很棒所以其實上手並不難。

Canvas API 的部分，最基礎的畫畫功能其實很簡單，參考 Google
到的文章，很快就可以寫出最基本的東西，之後加上去的功能&#8230;花的時間比較多。

點一下畫筆可以切換橡皮擦跟畫筆，橡皮擦是用背景顏色去做的。

之前從來沒有寫過 CSS 的動畫，所以一開始也是去翻文檔，這部分卡了比較久一點，版型我花了超久才弄好&#8230;

### 功能

#### SAVE

生成一個 Element 把該填的資料填進去，之後再用 `click()` 觸發。

```js
const link = document.createElement("a");
link.href = canvas.toDataURL();
link.download = "cancas.png";
link.click();
```

#### CLEAR ALL

用 `clearRect()` 指定範圍清空。

```js
ctx.clearRect(0, 0, canvas.width, canvas.height);
```

#### UNDO & REDO

參考資料：[連結][1]

做法是用兩個陣列 `undoDataStack[]` 跟 `redoDataStack[]` 儲存 UNDO & REDO 的
`ctx.getImageData()` 資料。

還有一個選項是 `STACK_MAX_SIZE` 可以設定最高紀錄多少步驟，防止瀏覽器效能不足。

控制 `.disable` 在沒有下一步時關閉按鈕。

```js
const STACK_MAX_SIZE = 30;
let undoDataStack = [];
let redoDataStack = [];
const saveDraw = () => {
  redoDataStack = [];
  document.querySelector(".nav-redo").classList.add("disable");
  if (undoDataStack.length >= STACK_MAX_SIZE) {
    undoDataStack.pop();
  }
  undoDataStack.unshift(ctx.getImageData(0, 0, canvas.width, canvas.height));
  document.querySelector(".nav-undo").classList.remove("disable");
};
const undo = () => {
  if (undoDataStack.length <= 0) return;
  redoDataStack.unshift(ctx.getImageData(0, 0, canvas.width, canvas.height));
  document.querySelector(".nav-redo").classList.remove("disable");
  const imageData = undoDataStack.shift();
  ctx.putImageData(imageData, 0, 0);
  if (undoDataStack.length <= 0) {
    document.querySelector(".nav-undo").classList.add("disable");
  }
};
const redo = () => {
  if (redoDataStack.length <= 0) return;
  undoDataStack.unshift(ctx.getImageData(0, 0, canvas.width, canvas.height));
  document.querySelector(".nav-undo").classList.remove("disable");
  const imageData = redoDataStack.shift();
  ctx.putImageData(imageData, 0, 0);
  if (redoDataStack.length <= 0) {
    document.querySelector(".nav-redo").classList.add("disable");
  }
};
```

#### 手機版操作

觸控螢幕監聽事件

```js
canvas.addEventListener("touchstart", touchStart); // mousedown
canvas.addEventListener("touchmove", touchMove); // mousemove
canvas.addEventListener("touchend", touchEnd); // mouseup
```

### 參考資料

[Canvas APIの基礎][2]

[Bootstrap - Document][3]

[HTML5 Canvas 簡易手繪板][4]

[Canvas 教學文件- Web APIs | MDN][5]

[canvasを画像としてダウンロードさせたかった話][6]

[Canvasで元に戻す（Undo），やり直し（Redo）を実装する方法][1]

[Webデザインの知識がなくてもOK！Bootstrapの使い方【入門者向け】][7]

[1]: https://qiita.com/ampersand/items/69c8d632ed9f60358418
[2]: https://www.atmarkit.co.jp/ait/articles/1208/01/news151.html
[3]: https://getbootstrap.com/docs/4.3/getting-started/introduction/
[4]: https://audi.tw/Blog/JavaScript/javascript.html5.canvas.asp
[5]: https://developer.mozilla.org/zh-TW/docs/Web/API/Canvas_API/Tutorial
[6]: https://qiita.com/iwaimagic/items/1d16a721b36f04e91aed
[7]: https://techacademy.jp/magazine/6270
