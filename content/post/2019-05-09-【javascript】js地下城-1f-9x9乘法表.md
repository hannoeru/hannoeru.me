---
title: 【JavaScript】JS地下城-1F-9×9乘法表
author: hanlee
type: post
date: 2019-05-08T16:58:19+00:00
excerpt: JS地下城-1F-9x9乘法表
url: /【javascript】js地下城-1f-9x9乘法表/
featured_image: /wp-content/uploads/2019/05/スクリーンショット-2019-05-09-0.28.33.png
categories:
  - JavaScript
  - Programming
tags:
  - CSS
  - HTML
  - JavaScript
  - JS地下城

---
## 1F-9&#215;9乘法表<figure class="wp-block-image">

<img loading="lazy" width="850" height="921" src="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2019-05-09-0.28.33.png" alt="" class="wp-image-176" srcset="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2019-05-09-0.28.33.png 850w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2019-05-09-0.28.33-277x300.png 277w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2019-05-09-0.28.33-768x832.png 768w" sizes="(max-width: 850px) 100vw, 850px" /> </figure> 

### 連結

<a href="https://hannoeru.github.io/multiplication-chart/" target="_blank" rel="noreferrer noopener" aria-label="Demo (新しいタブで開く)">Demo</a>

<a href="https://github.com/hannoeru/multiplication-chart" target="_blank" rel="noreferrer noopener" aria-label="Code (新しいタブで開く)">Code</a>

### 使用語言

HTML、CSS、JavaScript

### BOSS 弱點

  1. 【特定技術】需使用&nbsp;`JS for 迴圈技巧`，裡頭數字不能直接寫在 HTML 上，需使用&nbsp;JS 印出。
  2. 需使用 HTML、CSS、JS 技術
  3. 介面需與設計稿一致

### 技巧

<pre><code class="language-js">function getNum(){
  var str = '';
  //第一個for迴圈-當前數字
  for (var i = 2; i &lt; 10; i++) {
    str += '&lt;div class="card">';
    str += '&lt;ul>';
    str += '&lt;li class="big-num">'+i+'&lt;/li>';
    //第二個for迴圈-要乘上的數字
    for (var a = 1; a &lt; 10; a++) {
      str += '&lt;li>'+i+' x '+a+' = '+(i*a)+'&lt;/li>';
    }
    str += '&lt;/ul>';
    str += '&lt;/div>';
  }
  //用insertAdjacentHTML插入str，
  //beforeend指定插入位置在元素結束前子元素結束後
  document.getElementById('wrap').insertAdjacentHTML('beforeend',str);
}
getNum();</code></pre>

#### 關於 `insertAdjacentHTML`

可以在不刪除子元素的狀態下，像 `innerHTML` 一樣插入內容

語法

<pre><code class="language-js">element.insertAdjacentHTML(position, text)</code></pre>

指定 position 位置

<pre><code class="language-html">&lt;!-- beforebegin -->
&lt;element>
  &lt;!-- afterbegin -->
  &lt;child>Text&lt;/child>
  &lt;!-- beforeend -->
&lt;/element>
&lt;!-- afterend --></code></pre>

#### 追加：如果想要清空元素

如果想要清空元素，比起 `innerHTML` ，用&nbsp;`textContent`&nbsp;的方法就效能上來說比較好。

<pre><code class="language-js">document.getElementById('foo').textContent = '';</code></pre>

#### 追加：如果想要插入HTML元素 `insertAdjacentElement`

如果想要插入元素而不是字串的時候，也有一個東西叫`insertAdjacentElement` 

使用方法基本上跟 `insertAdjacentHTML` 一樣。

<pre><code class="language-js">var contentBlock = document.getElementById('contentBlock'), 
var insetElement = document.createElement('b');

insetElement.textContent = 'Test:';

contentBlock.insertAdjacentElement('afterbegin', insetElement);</code></pre>

### 參考資料

<a href="https://qiita.com/amamamaou/items/624c22adec32515e863b" target="_blank" rel="noreferrer noopener" aria-label="innerHTML より insertAdjacentHTML を使う (新しいタブで開く)">innerHTML より insertAdjacentHTML を使う</a>