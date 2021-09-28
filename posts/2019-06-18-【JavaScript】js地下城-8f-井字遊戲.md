---
title: 【JavaScript】JS地下城-8F-井字遊戲
author: hanlee
type: post
lang: zh-TW
date: 2019-06-17T17:06:22+00:00
description: 8F-井字遊戲
url: /【JavaScript】js地下城-8f-井字遊戲/
image: /images/2019/06/スクリーンショット-2019-06-18-0.12.55.png
categories:
  - JavaScript
  - Programming
tags:
  - Bootstrap
  - CSS
  - HTML
  - JavaScript
  - JS地下城
  - RWD

---

## 8F-井字遊戲

![wp-image-414](/images/2019/06/スクリーンショット-2019-06-18-0.12.55.png)

### 連結

[Demo](https://hannoeru.github.io/tic-tac-toe/)

[Code](https://github.com/hannoeru/tic-tac-toe)

### 使用語言＆框架

HTML、CSS、Bootstrap、JavaScript（ES6）

### BOSS 弱點

1. 【特定技術】先手為 O，後手為 X，某方獲勝時，上方會紀錄各方的獲勝戰績
2. 【特定技術】每回合結束後，會判定結果頁(平手、Ｏ 獲勝、X 獲勝)
3. 【特定技術】需符合 RWD，能在低螢幕解析度也能遊玩，介面不能超出 x 軸，至少在以下解析度能夠遊玩。
   1. iPhone SE 320px
   2. iPhone 8 375px
   3. iPhone PLUS 414px
4. 【特定技術】請使用瀏覽器離線儲存技術，將戰績保留起來，重新打開遊戲也仍可觀看到歷史戰績。技術請任選以下幾種
   1. Cookie
   2. localStorage
5. 【書寫能力】請寫 BLOG，描述你在開發「滿足獲勝條件」解題思維來進行加強描述
   1. 上面三個 O 符合獲勝條件
   2. 斜線三個 X 符合獲勝條件\
      請先不要參考網路上的寫法，試著用自身開發能力來解題，進以提升開發思維。但這段並非強制，真的卡關到爆炸，就還是試圖尋找攻略吧，但我相信想立志成為前端之碑的樓主，一定辦得到的！（崇拜眼神

### 心得

#### 滿足勝利條件

因為最近看到很多這種類型選取的都是用 dataset 將參數直接帶進 JavaStript 做判斷，因此一開始就先以這個為方向。

知道確切按的區域以後，下一步是儲存當前狀態。將要填入的內容，依照「○」或「X」紀錄下來存到一個變數內，比如說arr[3]存的就是第四格的狀態，所以在
dataset 的時後我是從 0 開始寫，省去轉換的麻煩。

```js
status[e.target.dataset.index] = isX ? -1 : 1;
```

這樣子基本的判斷資料就完成了。

之後要想辦法在每次點擊後判斷是否勝利。

在這裏先把所有組合列出來：

```js
const type = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
```

我自己原本想好邏輯寫了很長一段，但是中間卡住&#8230;後來看到有其他學員寫了一個很簡單的&#8230;因此就抄來改了一下。

參考資料：[連結][1]

邏輯是這樣的：

用 for 迴圈將所有勝利組合跑過一遍

在 status 狀態中「○」是 1 ，「X」是 -1

所以如果勝利組合的三個位置都是「○」，「○」就贏了

相反來說三個位置都是「X」的話，「X」就贏了

因為我每次都會檢查是否勝利，所以我加了一個判斷是否平手

status 的預設狀態是 0 ，所以要是 status 中沒有 0 了，代表棋盤都下完了還是沒有勝負，因此平手。

```js
function checkWin() {
  for (let i = 0; i < 8; i += 1) {
    const [a, b, c] = type[i];
    const sum = status[a] + status[b] + status[c];
    if (sum === 3) {
      winO += 1;
      updateScore();
      gaming = false;
      return 1;
    }
    if (sum === -3) {
      winX += 1;
      updateScore();
      gaming = false;
      return -1;
    }
  }
  if (status.indexOf(0) === -1) {
    gaming = false;
    return 3;
  }
}
```

#### 手機版版型

我做了一個 600px 的分割點跟電腦還有平板做區隔。

只有手機版的部分要適應不同大小，因此把部分CSS改用 vw 。

```js
@media screen and (max-width : 600px) {
    /* Main Size */
    .start-ox, .game, .x-win, .o-win, .draw, .x-win .cross{
        width: 90vw;
        height: 90vw;
    }
    /* ...... */
}
```

### 參考資料

[Bootstrap &#8211; Document][2]

[[筆記] 好用的css 3新單位vh vw ─ 讓你的圖片可以隨著螢幕大小而不同][3]

這次的參考資料&#8230;好少歐

[1]: https://medium.com/@q503433/%E6%96%B0%E6%89%8B-js-%E5%9C%B0%E4%B8%8B%E5%9F%8E-8f-%E4%BA%95%E5%AD%97%E9%81%8A%E6%88%B2-e7dd97f6cb5a
[2]: https://getbootstrap.com/docs/4.3/getting-started/introduction/
[3]: https://pjchender.blogspot.com/2015/04/css-3vh-vw.html
