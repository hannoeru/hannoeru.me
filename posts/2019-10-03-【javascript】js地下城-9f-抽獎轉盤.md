---
title: 【JavaScript】JS地下城-9F-抽獎轉盤
author: hanlee
type: post
lang: zh-TW
date: 2019-10-02T15:38:11+00:00
description: 這次是我第一次用Vue寫一個比較完整的東西，對Vue還沒有非常熟悉，算是邊寫邊學。
url: /【javascript】js地下城-9f-抽獎轉盤/
image: /images/2019/10/スクリーンショット-2019-10-02-23.46.48.png
categories:
  - JavaScript
  - Programming
tags:
  - Axios
  - CSS
  - HTML
  - JavaScript
  - JS地下城
  - Vue

---

## 9F-抽獎轉盤

![wp-image-479](/images/2019/10/スクリーンショット-2019-10-02-23.46.48.png)

### 連結

[DEMO][1]

[CODE][2]

### 使用語言＆框架

HTML、CSS、JavaScript、Axios、Vue.js

### BOSS 弱點

1. 【特定技術】2017 遊戲輪盤規則，樣式請參考 Adobe XD 設計稿
   1. 輪盤只能轉 20 次，人人有獎
      1. Flight：1份
      2. Child：4份
      3. Anything：5份
      4. Wifi：5份
      5. Wish：5份
   2. 已經被抽到的獎項，就不可再次出現
2. 【特定技術】2018 遊戲輪盤規則
   1. 編號 20：69 份
   2. 編號 19：20 份
   3. 編號 18：10 份
   4. 編號 17：5 份
   5. 編號 16~2：各編號皆 1 份
   6. 編號 1：1 份
   7. 請移除獎品名稱與 icon，僅單純顯示編號
   8. 已經被抽到的獎項，就不可再次出現
3. 【特定技術】以上兩個遊戲轉盤，不可直接寫死樣式在網頁上，請將品項以「JSON」格式來儲存，再藉由 JS
   跑迴圈依序顯示獎項在輪盤上，此舉用意為若日後輪盤會新增獎項時，只要在 JSON 格式上新增即可。
4. 【特定技術】點選中間的「PRESS」後，指針開始滾動，滾動到一定時間後，就會停止並指向到獎項上。
5. 【特定技術】請考量中獎機率，以 2018 來說，總計有 120 份獎品，所以編號 1 的獎品第一次抽中機率是
   1/120，而隨著品項變少也會跟著重新計算中獎率。

### 心得

這次是我第一次用 Vue 寫一個比較完整的東西，對 Vue 還沒有非常熟悉，算是邊寫邊學。

#### 資料處理

一開始在 beforeMount 的地方去處理資料，包含使用 Axios 撈好資料。

其中有一部分做了一些處理

假設你有很多數量一樣的禮物，你可以直接寫：

```js
{
  "start": 2,
  "end": 16,
  "count": 1
}
```

利用 start 定義開始值，end 定義結束值。

在撈到資料後，將其轉換為陣列，再插入到原本的資料中。

#### Axios

這次新學了 Axios 的用法：

```js
axios.get("./data.json")
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
```

#### 機率計算

我另外生成了一個陣列用來存放剩餘的獎項，這樣子就可以保持 1 / 剩餘獎項 的機率。

```js
// 生成剩餘獎項陣列
generateIndex(data) {
  let indexArray = []
  for (let i = 0; i < data.length; i++) {
    if (data[i].count !== 0) indexArray.push(i)
  }
  return indexArray
},
// 從陣列長度中取得隨機數字
getRandomNumber(data) {
  const index = this.generateIndex(data)
  let num = Math.floor(Math.random() * index.length)
  // 回傳 剩餘獎項陣列[隨機數字]，以得到正確的獎項。
  return index[num]
}
```

#### 頃斜角度計算

用目前年份的禮物數量為基準去做計算

```js
transformHandler(index, location) {
  // 禮物數量
  let len = this.dataCache[this.year].length
  // 一份禮物所佔角度
  let rotate = 360 / len
  // 開始角度
  let rotateFrom = -rotate / 2
  // 變形角度
  let skewY = rotate - 90
  // 依照禮物的位置回傳數值
  if (location === 'prize') {
    return `rotate(${rotateFrom + index * rotate}deg) skewY(${skewY}deg)`
  }
  // 回傳禮物內容數值
  if (location === 'content') {
    let translate = len > 10 ? 'translate(19px, 110px)' : 'translate(70px, 45px)'
    return `skewY(${90 - rotate}deg) rotate(${rotate / 2}deg) ${translate}`
  }
}
```

#### 花費時間

約 10 小時

### 參考資料

[Axios Github][3]

[Vue &#8211; List Rendering][4]

[Vue &#8211; The Vue Instance][5]

[Vue API Vue.set][6]

[何番目系の便利なCSSまとめ][7]

[1]: https://hannoeru.github.io/lucky-wheel/
[2]: https://github.com/hannoeru/lucky-wheel
[3]: https://github.com/axios/axios
[4]: https://vuejs.org/v2/guide/list.html
[5]: https://vuejs.org/v2/guide/instance.html
[6]: https://jp.vuejs.org/v2/api/#Vue-set
[7]: https://qiita.com/ituki_b/items/62a752389385de7ba4a2
