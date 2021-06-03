---
title: 【Vue.js】VeeValidate 3.0 使用方法＆導入中文語系
author: hanlee
type: post
date: 2019-12-29T17:00:22+00:00
excerpt: VeeValidate 3.0 使用方法＆導入中文語系
url: /【vue-js】veevalidate-3-0-使用方法＆導入中文語系/
featured_image: /wp-content/uploads/2019/12/スクリーンショット-2019-12-30-0.56.24.png
categories:
  - Vue.js
tags:
  - JavaScript
  - VeeValidate
  - Vue

---
安裝方法：

main.js

<pre class="language-js"><code>import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize
} from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import tw from "vee-validate/dist/locale/zh_TW.json";
 
// 安裝所有 VeeValidate 規則
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});
 
localize("zh_TW", tw);
 
// 註冊全域元件
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);</code></pre>

使用方法：

局部驗證：<ValidationProvider />

<pre class="language-html"><code>&lt;ValidationProvider
  name="Email" // 錯誤時顯示的名稱
  class="form-group"
  rules="required|email" // 規則條件
  v-slot="{ failed, errors }"
  tag="div"
>
  &lt;label for="useremail">Email&lt;/label>
  &lt;input
    type="email"
    class="form-control"
    :class="{ 'is-invalid': failed }" // 驗證失敗時套用
    name="email"
    id="useremail"
    v-model="form.user.email"
    placeholder="請輸入 Email"
    required
  />
  &lt;span class="text-danger">{‌{ errors[0] }}&lt;/span>
&lt;/ValidationProvider></code></pre>

全體驗證：<ValidationObserver />

驗證這個元件下所有的<ValidationProvider />都沒有錯誤才會放行

<pre class="language-html"><code>&lt;ValidationObserver
  class="col-md-6"
  @submit.prevent="createOrder"
  v-slot="{ invalid }"
  tag="form"
>
  &lt;!-- form... -->
  &lt;!-- 沒通過驗證時保持 Button disabled 狀態 -->
  &lt;button class="btn btn-danger" :disabled="invalid">送出訂單&lt;/button> 
&lt;/ValidationObserver></code></pre>