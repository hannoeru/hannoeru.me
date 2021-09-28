---
title: XMLHttpRequest 與 Fetch API：2019 年最適合 Ajax 的是什麼？
author: hanlee
type: post
lang: zh-TW
date: 2019-05-17T14:56:13+00:00
description: XMLHTTP最初是由微軟公司發明的，在Internet Explorer 5.0中用作ActiveX物件，可通過JavaScript、VBScript或其它瀏覽器支援的手稿語言存取。Mozilla的開發人員後來在Mozilla 1.0中實現了一個相容的版本。之後蘋果電腦公司在Safari 1.2中開始支援XMLHTTP，而Opera從8.0版開始也宣布支援XMLHTTP。
url: /xmlhttprequest與fetch-api：2019年最適合ajax的是什麼？/
image: /images/2019/05/0_Kj2i4zLF-jKOsiLb.jpg
categories:
  - JavaScript
  - Programming
tags:
  - Ajax
  - Fetch API
  - JavaScript
  - XHR

---

![wp-image-272](/images/2019/05/0_Kj2i4zLF-jKOsiLb.jpg)

XMLHTTP 最初是由微軟公司發明的，在 [Internet Explorer][1] 5.0 中用作 [ActiveX][2] 物件，可通過 JavaScript、VBScript 或其它瀏覽器支援的手稿語言存取。[Mozilla][3] 的開發人員後來在 Mozilla 1.0 中實現了一個相容的版本。之後蘋果電腦公司在 [Safari][4] 1.2中開始支援XMLHTTP，而 [Opera][5] 從 8.0 版開始也宣布支援 XMLHTTP。

大多數使用了 XMLHTTP 的設計良好的網頁，會使用簡單的 JavaScript 函式，將不同瀏覽器之間呼叫 XMLHTTP 的差異性封鎖，該函式會自動檢測瀏覽器版本並隱藏不同環境的差異。

在 [DOM][6] 3（文件物件模型 Level 3 ）的讀取和儲存規範（ Load and Save Specification ）中也有類似的功能，它已經成為 [W3C][7] 推薦的方法。截止 2011 年，大多數瀏覽器已經支援。

在此之前，有一些方法可以在沒有整頁刷新的情況下從服務器提取數據，但是他們通常依賴於諸如 `<script>` 注入或第三方插件之類的笨重技術。Microsoft `XMLHttpRequest` 為其 Outlook 電子郵件客戶端開發了基於瀏覽器的替代方案。

`XMLHttpRequest` 直到2006年才成為 Web 標準，但它已在大多數瀏覽器中實現。它在 Gmail（ 2004 ）和谷歌地圖（ 2005 ）的採用促成了 Jesse James Garrett 在2005年寫的一篇文章 [AJAX：一種新的Web應用程序方法][8]。新術語明確了開發人員的關注點。

### AJAX 到 Ajax {#ajaxtoajax}

AJAX 是不同步 JavaScript 和 XML 的標記符號。肯定是"不同步"，但是：

  1. 可能是 JavaScript，雖然你也可以用 VBScript 和 Flash
  2. 有效載荷不需要是 XML，雖然那當時很受歡迎。你可以使用任何數據格式，而今天，JSON 通常是首選。

我們現在使用 "Ajax" 作為任何客戶端程序的通用術語，該程序從服務器獲取數據並動態更新 DOM 而無需進行整頁刷新。Ajax 是大多數 Web 應用程序和單頁面應用程序（ SPA ）的核心技術。

### XMLHttpRequest 的極限 {#extremexmlhttprequest}

以下 JavaScript 代碼使用 [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) 示範了一個基本的 HTTP GET 請求到 [http://domain/serviceusing](http://domain/serviceusing)

```js
let xhr = new XMLHttpRequest();
xhr.open('GET', 'http://domain/service');

// request state change event
xhr.onreadystatechange = function() {

  // request completed?
  if (xhr.readyState !== 4) return;

  if (xhr.status === 200) {
    // request successful - show response
    console.log(xhr.responseText);
  }
  else {
    // request error
    console.log('HTTP error', xhr.status, xhr.statusText);
  }
};

// start request
xhr.send();
```

`[XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)` 具有許多其他選項，事件和回應屬性。例如，可以設置和檢測超時（以毫秒為單位）：

```js
// set timeout
xhr.timeout = 3000; // 3 seconds
xhr.ontimeout = () => console.log('timeout', xhr.responseURL);
```

`progress` 事件可以報告長時間的文件上傳：

```js
// upload progress
xhr.upload.onprogress = p => {
  console.log( Math.round((p.loaded / p.total) * 100) + '%') ;
}
```

選項的數量多到可能令人困惑，早期 `XMLHttpRequest` 有一些跨瀏覽器的不一致。出於這個原因，大多數庫和框架都提供Ajax包裝函數來處理複雜性，例如 `[jQuery.ajax()](http://api.jquery.com/jquery.ajax/)` 方法：

```js
// jQuery Ajax
$.ajax('http://domain/service')
  .done(data => console.log(data))
  .fail((xhr, status) => console.log('error:', status));
```

### 進化到 Fetch

Fetch API 是一個現代化的替代品。通用的 [Headers][9]，[Request][10] 和 [Response][11] 接口提供了一致性，而 Promises 允許更容易的鏈接和 async / await 而不需要回傳。上面的 XHR 示範可以轉換為更簡單的 Fetch API 程式，甚至可以解析回傳的 JSON：

```js
fetch(
    'http://domain/service',
    { method: 'GET' }
  )
  .then( response => response.json() )
  .then( json => console.log(json) )
  .catch( error => console.error('error:', error) );
```

Fetch 乾淨，優雅，易於理解，並在 [PWA服務工作者中][12] 大量使用。**為什麼不用它而去用古老的 XMLHttpRequest？**

遺憾的是，Web 開發從未如此完美。Fetch 不是 Ajax 技術的完全替代品&#8230;&#8230;

### 瀏覽器支持 {#browsersupport}

Fetch API 有[相當好的支持][13]，但在所有版本的 Internet Explorer 中都會失敗。使用 2017 年以前版本的 Chrome，Firefox 和 Safari 版本的用戶也可能遇到問題。這些用戶可能構成您的用戶群的一小部分&#8230;&#8230;或者它可能是主要客戶。所以**在開始寫程式之前一定要檢查！**

此外，比起 XHR，Fetch API 有更多持續的更新。這些更新不太可能破壞程式，但預計未來幾年會有一些維護更新。

### 默認為無 Cookie {#cookielessbydefault}

與 `XMLHttpRequest` 不同，並非所有 Fetch 連線都會發送 cookie，因此您的應用程式的身份驗證可能會失敗。可以通過更改第二個參數中傳遞的[證書選項][14]來修復問題，例如

```js
fetch(
    'http://domain/service',
    {
      method: 'GET',
      credentials: 'same-origin'
    }
  )

```

### 錯誤不會被拒絕 {#errorsarenotrejected}

令人驚訝的是，HTTP 錯誤如 `404 Page Not Found` 或 `500 Internal Server Error` 不會導致 Fetch Promise 拒絕，`.catch()` 永遠不會執行。它通常會在 `response.ok` 狀態設置為 `false` 的情況下判斷。

僅在無法完成請求（例如網絡故障）時才會發生拒絕。這可能使判斷錯誤更加複雜。

### 不支持超時 {#timeoutsarenotsupported}

Fetch 不支持超時，只要瀏覽器選擇，請求就會繼續。需要進一步的代碼來將 Fetch 包裝在另一個 Promise 中，例如

```js
// fetch with a timeout
function fetchTimeout(url, init, timeout = 3000) {
  return new Promise((resolve, reject) => {
    fetch(url, init)
      .then(resolve)
      .catch(reject);
    setTimeout(reject, timeout);
  }
}

```

或者使用 `[Promise.race()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)` 當 GET 或超時先完成時，判斷哪一個先執行，例如：

```js
Promise.race([
  fetch('http://url', { method: 'GET' }),
  new Promise(resolve => setTimeout(resolve, 3000))
])
  .then(response => console.log(response))

```

### 中止獲取 {#abortingafetch}

很容易結束 XHR 請求，`xhr.abort()` 並在必要時使用 `xhr.onabort` 函數偵測此類事件。

多年來中止 Fetch 是不可能的，但現在支持在實現[AbortController API的][15]瀏覽器中。這會觸發一個可以傳遞給 Fetch 啟動對象的信號：

```js
const controller = new AbortController();

fetch(
  'http://domain/service',
  {
    method: 'GET'
    signal: controller.signal
  })
  .then( response => response.json() )
  .then( json => console.log(json) )
  .catch( error => console.error('Error:', error) );

```

可以通過使用中止獲取 `controller.abort()`。因為 Promise 拒絕所以 `.catch()` 函數被執行。

### 無法判斷進度 {#noprogress}

在撰寫本文時，Fetch 不支持進度事件。因此，無法報告文件上載或類似大型表單提交的狀態。

### XMLHttpRequest 與 Fetch API？ {#xmlhttprequestorfetch}

最終，選擇是你的&#8230;&#8230; **除非你的應用程序有 IE 客戶端要求上傳進度條。**

對於更簡單的 Ajax 調用，`XMLHttpRequest` 更低級，更複雜，並且您將需要包裝函數。不幸的是，一旦你開始考慮超時、中止進程和錯誤捕獲的複雜性，Fetch 也會變複雜。

您可以選擇將 [Fetch polyfill][16] 與 [Promise polyfill][17] 結合使用，這樣就可以在 IE 中編寫 Fetch 代碼。但是，在 XHR 作為底層的狀態下，並非每個選項都能按預期工作，例如，無論設置如何都會發送 cookie。

Fetch 是未來，API 相對較新。但是，它沒有提供 XHR 的所有功能，而且有些選項很麻煩。請在接下來的幾年中謹慎的使用它。

翻譯自：<https://www.sitepoint.com/xmlhttprequest-vs-the-fetch-api-whats-best-for-ajax-in-2019/>

 [1]: https://zh.wikipedia.org/wiki/Internet_Explorer
 [2]: https://zh.wikipedia.org/wiki/ActiveX
 [3]: https://zh.wikipedia.org/wiki/Mozilla
 [4]: https://zh.wikipedia.org/wiki/Safari
 [5]: https://zh.wikipedia.org/wiki/Opera
 [6]: https://zh.wikipedia.org/wiki/DOM
 [7]: https://zh.wikipedia.org/wiki/W3C
 [8]: https://adaptivepath.org/ideas/ajax-new-approach-web-applications/
 [9]: https://developer.mozilla.org/en-US/docs/Web/API/Headers
 [10]: https://developer.mozilla.org/en-US/docs/Web/API/Request
 [11]: https://developer.mozilla.org/en-US/docs/Web/API/Response
 [12]: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
 [13]: https://caniuse.com/#search=fetch
 [14]: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters
 [15]: https://developer.mozilla.org/en-US/docs/Web/API/AbortController
 [16]: https://github.github.io/fetch/
 [17]: https://www.npmjs.com/package/promise-polyfill
