---
title: 【Vue.js】VeeValidate 3.0 使用方法＆導入中文語系
author: hanlee
type: post
lang: zh-TW
date: 2019-12-29T17:00:22+00:00
description: VeeValidate 3.0 使用方法＆導入中文語系
url: /【vue-js】veevalidate-3-0-使用方法＆導入中文語系/
image: /images/2019/12/スクリーンショット-2019-12-30-0.56.24.png
categories:
  - Vue.js
tags:
  - JavaScript
  - VeeValidate
  - Vue

---
安裝方法：

```js main.js
import {
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
Vue.component("ValidationProvider", ValidationProvider);
```

使用方法：

局部驗證：`<ValidationProvider />`

```html
<ValidationProvider
  name="Email"
  class="form-group"
  rules="required|email"
  v-slot="{ failed, errors }"
  tag="div"
>
  <label for="useremail">Email</label>
  <input
    type="email"
    class="form-control"
    :class="{ 'is-invalid': failed }"
    name="email"
    id="useremail"
    v-model="form.user.email"
    placeholder="請輸入 Email"
    required
  />
  <span class="text-danger">{{ errors[0] }}</span>
</ValidationProvider>
```

全體驗證：`<ValidationObserver />`

驗證這個元件下所有的 `<ValidationProvider />` 都沒有錯誤才會放行

```html
<ValidationObserver
  class="col-md-6"
  @submit.prevent="createOrder"
  v-slot="{ invalid }"
  tag="form"
>
  <!-- form... -->
  <!-- 沒通過驗證時保持 Button disabled 狀態 -->
  <button class="btn btn-danger" :disabled="invalid">送出訂單</button>
</ValidationObserver>
```
