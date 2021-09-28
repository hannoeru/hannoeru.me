---
title: 【JavaScript】JS地下城-1F-9×9乘法表
author: hanlee
type: post
lang: zh-TW
date: 2019-05-08T16:58:19+00:00
description: JS地下城-1F-9x9乘法表
url: /【javascript】js地下城-1f-9x9乘法表/
image: /images/2019/05/スクリーンショット-2019-05-09-0.28.33.png
categories:
  - JavaScript
  - Programming
tags:
  - CSS
  - HTML
  - JavaScript
  - JS地下城

---
## 1F-9&#215;9乘法表

![wp-image-176](/images/2019/05/スクリーンショット-2019-05-09-0.28.33.png)

### 連結

[Demo](https://hannoeru.github.io/multiplication-chart/)

[Code](https://github.com/hannoeru/multiplication-chart)

### 使用語言

HTML、CSS、JavaScript

### BOSS 弱點

  1. 【特定技術】需使用&nbsp;`JS for 迴圈技巧`，裡頭數字不能直接寫在 HTML 上，需使用&nbsp;JS 印出。
  2. 需使用 HTML、CSS、JS 技術
  3. 介面需與設計稿一致

### 技巧

```js
function getNum(){
  var str = '';
  //第一個for迴圈-當前數字
  for (var i = 2; i < 10; i++) {
    str += '<div class="card">';
    str += '<ul>';
    str += '<li class="big-num">'+i+'</li>';
    //第二個for迴圈-要乘上的數字
    for (var a = 1; a < 10; a++) {
      str += '<li>'+i+' x '+a+' = '+(i*a)+'</li>';
    }
    str += '</ul>';
    str += '</div>';
  }
  //用insertAdjacentHTML插入str，
  //beforeend指定插入位置在元素結束前子元素結束後
  document.getElementById('wrap').insertAdjacentHTML('beforeend',str);
}
getNum();
```

#### 關於 `insertAdjacentHTML`

可以在不刪除子元素的狀態下，像 `innerHTML` 一樣插入內容

語法

```js
element.insertAdjacentHTML(position, text)
```

指定 position 位置

```html
<!-- beforebegin -->
<element>
  <!-- afterbegin -->
  <child>Text</child>
  <!-- beforeend -->
</element>
<!-- afterend -->
```

#### 追加：如果想要清空元素

如果想要清空元素，比起 `innerHTML` ，用&nbsp;`textContent`&nbsp;的方法就效能上來說比較好。

```js
document.getElementById('foo').textContent = '';
```

#### 追加：如果想要插入HTML元素 `insertAdjacentElement`

如果想要插入元素而不是字串的時候，也有一個東西叫`insertAdjacentElement`

使用方法基本上跟 `insertAdjacentHTML` 一樣。

```js
var contentBlock = document.getElementById('contentBlock'),
var insetElement = document.createElement('b');

insetElement.textContent = 'Test:';

contentBlock.insertAdjacentElement('afterbegin', insetElement);
```

### 參考資料

[innerHTML より insertAdjacentHTML を使う](https://qiita.com/amamamaou/items/624c22adec32515e863b)
