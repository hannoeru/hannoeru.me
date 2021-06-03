---
title: 【JavaScript】JavaScript 入門篇-學徒的試煉-最終作業
author: hanlee
type: post
date: 2019-05-08T13:17:36+00:00
excerpt: 'JavaScript 入門篇 - 學徒的試煉 - 最終作業'
url: /【javascript】javascript-入門篇-學徒的試煉-最終作業/
featured_image: /wp-content/uploads/2019/05/javascript.png
categories:
  - JavaScript
  - Programming
tags:
  - CSS
  - HTML
  - JavaScript

---
## 1. 高雄旅遊資訊

### 連結

[Demo][1]

<a href="https://github.com/hannoeru/kaohsiung-travel-information" target="_blank" rel="noreferrer noopener" aria-label="Code (新しいタブで開く)">Code</a>

### 使用語言

HTML、CSS、JavaScript

### 技巧

從陣列篩選出不重複的值

<pre><code class="language-js">function addToList(){
  var str = '';
  var zone = [];
  str += '&lt;option&gt;--請選擇行政區--&lt;/option&gt;';
  for(var i = 0;i &lt; data.length; i++){
    //如果在zone裡面找到data[i].Zone他會回傳位置找不到的話會回傳-1
    //當它回傳-1的時候就把目前這個zone裡面沒有的區域加進去
    if(zone.indexOf(data[i].Zone) == -1){
      zone.push(data[i].Zone);
      str += '&lt;option&gt;'+data[i].Zone+'&lt;/option&gt;';
    }
  }
  selectArea.innerHTML = str;
}</code></pre>

### 花費時間

約4小時，JS大概40分鐘寫完，由於沒有認真學過CSS排版搞好久&#8230;

## 2. BMI計算

### 連結

<a rel="noreferrer noopener" aria-label="Demo (新しいタブで開く)" href="https://hannoeru.github.io/bmi-calculator/" target="_blank">Demo</a>

<a href="https://github.com/hannoeru/bmi-calculator" target="_blank" rel="noreferrer noopener" aria-label="Code (新しいタブで開く)">Code</a>

### 使用語言

HTML、CSS、JavaScript

### 技巧

取得目前日期

<pre><code class="language-js">var today = new Date();
var date = today.getFullYear() + "/" +  (today.getMonth()+1) + "/"+ today.getDate();</code></pre>

### 筆記

BMI算法

<pre><code class="language-js">var bmi = Math.round((kg/((cm/100)*(cm/100)))*100)/100;</code></pre>

### 技巧

使用`:hover`與`::befor`做出刪除動畫

參考資料：<a rel="noreferrer noopener" aria-label=" (新しいタブで開く)" href="https://codepen.io/bunny06/pen/KYMwVo" target="_blank">https://codepen.io/bunny06/pen/KYMwVo</a>

<pre><code class="language-css">.card{
  width: 624px;
  height: 62px;
  background: #FFFFFF;
  line-height: 62px;
  margin: 16px auto 0px auto;
  vertical-align: middle;
  text-align: center;
  border-left: 7px solid;
  box-sizing: content-box;
  position: relative;
}
.card::before{
  content: "移除";
  display: block;
  position: absolute;
  top: 0;
  left: -7px;
  width: calc(100% + 7px);
  height: 100%;
  color: #fff;
  background-color: #424242;
  text-align: center;
  /*透明度預設為0=透明*/
  opacity: 0;
  /*漸入動畫效果*/
  transition: all 0.2s;
}
/*當滑鼠移入*/
.card:hover::before{
  /*調整為0.9半透明*/
  opacity: 0.9;
}</code></pre>

### 花費時間

約3小時，JS大概30分鐘寫完，一樣是CSS排版搞好久&#8230;

### 使用編輯器

Atom

 [1]: https://hannoeru.github.io/kaohsiung-travel-information/