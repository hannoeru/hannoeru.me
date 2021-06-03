---
title: 超快速！在日本 Amazon EC2 架設 OpenVPN Server！！
author: hanlee
type: post
date: 2019-05-04T15:42:41+00:00
excerpt: 本教學主要是利用Pivpn這個套件在Amazon EC2上快速架設VPN伺服器，讓你可以不用受限於日本網站的境外IP限制。
url: /超快速！在日本-amazon-ec2-架設-openvpn-server！！/
image: /img/2019/05/ec2xopenvpn.jpg
categories:
  - OpenVPN
tags:
  - AWS
  - EC2
  - OpenVPN
  - pivpn

---
本教學主要是利用Pivpn這個套件在Amazon EC2上快速架設VPN伺服器，讓你可以不用受限於日本網站的境外IP限制。

## 註冊

### Step 1：註冊Amazon Web Services 帳號，Amazon有開放無料試用版請點選以下連結：


<img loading="lazy" width="1024" height="640" src="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-11-23.55.21-1024x640.png" alt="" class="wp-image-98" srcset="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-11-23.55.21-1024x640.png 1024w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-11-23.55.21-300x188.png 300w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-11-23.55.21-768x480.png 768w" sizes="(max-width: 1024px) 100vw, 1024px" />

看不懂日文的話在第一個畫面的右上角有語言選項，註冊完成後記得到控制台的右上角將區域調為東京。


<img loading="lazy" width="1024" height="640" src="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.05.39-1024x640.png" alt="" class="wp-image-101" srcset="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.05.39-1024x640.png 1024w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.05.39-300x188.png 300w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.05.39-768x480.png 768w" sizes="(max-width: 1024px) 100vw, 1024px" />

### Step 2：在服務（サービス）選項中進入EC2管理介面。


<img loading="lazy" width="1024" height="640" src="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-11-23.55.58-1024x640.png" alt="" class="wp-image-99" srcset="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-11-23.55.58-1024x640.png 1024w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-11-23.55.58-300x188.png 300w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-11-23.55.58-768x480.png 768w" sizes="(max-width: 1024px) 100vw, 1024px" />

### Step 3：點選（インスタンスの作成）準備建立一台虛擬機。


<img loading="lazy" width="1024" height="640" src="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-11-23.56.10-1024x640.png" alt="" class="wp-image-100" srcset="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-11-23.56.10-1024x640.png 1024w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-11-23.56.10-300x188.png 300w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-11-23.56.10-768x480.png 768w" sizes="(max-width: 1024px) 100vw, 1024px" />

## 建立虛擬機

### Step 1：選擇系統映像檔（AMI），在這裡下拉找到（Ubuntu Server 16.04 LTS (HVM), SSD Volume Type）的映像檔後按（選択）


<img loading="lazy" width="1024" height="640" src="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.14.05-1024x640.png" alt="" class="wp-image-103" srcset="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.14.05-1024x640.png 1024w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.14.05-300x188.png 300w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.14.05-768x480.png 768w" sizes="(max-width: 1024px) 100vw, 1024px" />

### Step 2：選擇系統配置，如果你要免費方案的話目前只有（t2.micro）可以選，其他都是要額外收費的方案。


<img loading="lazy" width="1024" height="640" src="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.18.24-1024x640.png" alt="" class="wp-image-104" srcset="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.18.24-1024x640.png 1024w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.18.24-300x188.png 300w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.18.24-768x480.png 768w" sizes="(max-width: 1024px) 100vw, 1024px" />

### Step 3：在這裡我們直接跳到第六個步驟，新增防火牆規則。


<img loading="lazy" width="1024" height="640" src="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.21.34-1024x640.png" alt="" class="wp-image-105" srcset="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.21.34-1024x640.png 1024w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.21.34-300x188.png 300w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.21.34-768x480.png 768w" sizes="(max-width: 1024px) 100vw, 1024px" />

接下來新增一條規則，如下圖：


<img loading="lazy" width="1024" height="640" src="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.23.32-1024x640.png" alt="" class="wp-image-106" srcset="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.23.32-1024x640.png 1024w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.23.32-300x188.png 300w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.23.32-768x480.png 768w" sizes="(max-width: 1024px) 100vw, 1024px" />

之後按下右下角的（確認と作成）進入下一個步驟。

### Step 4：確認後按下（作成）


<img loading="lazy" width="1024" height="640" src="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.27.14-1024x640.png" alt="" class="wp-image-107" srcset="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.27.14-1024x640.png 1024w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.27.14-300x188.png 300w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.27.14-768x480.png 768w" sizes="(max-width: 1024px) 100vw, 1024px" />

之後他就會建立一個金鑰給你下載，作為以後登入的認證。

## 連線並設定Pivpn

### Step 1：選擇你要連線的虛擬機後按下（接続）


<img loading="lazy" width="1024" height="640" src="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.33.42-1024x640.png" alt="" class="wp-image-108" srcset="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.33.42-1024x640.png 1024w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.33.42-300x188.png 300w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.33.42-768x480.png 768w" sizes="(max-width: 1024px) 100vw, 1024px" />
<img loading="lazy" width="1024" height="640" src="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.37.52-1024x640.png" alt="" class="wp-image-109" srcset="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.37.52-1024x640.png 1024w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.37.52-300x188.png 300w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.37.52-768x480.png 768w" sizes="(max-width: 1024px) 100vw, 1024px" />

之後他就會顯示出連結的方法：

如果你是用MacOS或是Linux的話打開Terminal依照上面的指令：

切換到金鑰所在的目錄後更改權限：chmod 400 <檔案名稱>.pem

之後用SSH連線上伺服器：ssh -i &#8220;<檔案名稱>.pem&#8221; ubuntu@<你的Amazon伺服器區域名稱>.compute.amazonaws.com

第一次連線時會出現確認畫面，請輸入Yes。

如果是Windows用戶的話請參考以下文件：[https://docs.aws.amazon.com/zh\_cn/AWSEC2/latest/UserGuide/putty.html?icmpid=docs\_ec2_console][1]

### Step 2：安裝Pivpn

  1. 切換到root帳戶：sudo -i
  2. 取得安裝包：curl -L https://install.pivpn.io | bash
  3. 接下來就會進入安裝畫面了：


<img loading="lazy" src="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.54.01-1024x773.png" alt="" class="wp-image-111" width="580" height="437" srcset="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.54.01-1024x773.png 1024w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.54.01-300x227.png 300w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.54.01-768x580.png 768w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.54.01.png 1602w" sizes="(max-width: 580px) 100vw, 580px" />

這裡依照預設值一直按Enter直到跳離粉色畫面。


<img loading="lazy" width="1024" height="773" src="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.54.07-1024x773.png" alt="" class="wp-image-112" srcset="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.54.07-1024x773.png 1024w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.54.07-300x227.png 300w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.54.07-768x580.png 768w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.54.07.png 1602w" sizes="(max-width: 1024px) 100vw, 1024px" />
<img loading="lazy" width="1024" height="773" src="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.54.32-1024x773.png" alt="" class="wp-image-119" srcset="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.54.32-1024x773.png 1024w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.54.32-300x227.png 300w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.54.32-768x580.png 768w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.54.32.png 1602w" sizes="(max-width: 1024px) 100vw, 1024px" />

在這裡用方向鍵移動到UDP後按下空白鍵即可選擇UDP，之後按下Enter。


<img loading="lazy" width="1024" height="773" src="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.54.42-1024x773.png" alt="" class="wp-image-120" srcset="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.54.42-1024x773.png 1024w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.54.42-300x227.png 300w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.54.42-768x580.png 768w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.54.42.png 1602w" sizes="(max-width: 1024px) 100vw, 1024px" />
<img loading="lazy" width="1024" height="773" src="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.54.46-1024x773.png" alt="" class="wp-image-121" srcset="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.54.46-1024x773.png 1024w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.54.46-300x227.png 300w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.54.46-768x580.png 768w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.54.46.png 1602w" sizes="(max-width: 1024px) 100vw, 1024px" />

這裡依照預設值按下Enter，之後如果沒有要變更其他設定的話也是一直Enter直到跳離粉色畫面。


<img loading="lazy" width="1024" height="773" src="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.54.50-1024x773.png" alt="" class="wp-image-122" srcset="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.54.50-1024x773.png 1024w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.54.50-300x227.png 300w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.54.50-768x580.png 768w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.54.50.png 1602w" sizes="(max-width: 1024px) 100vw, 1024px" />

在這裡按下Enter後會生成金鑰，要稍等一下。


<img loading="lazy" width="1024" height="773" src="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.54.54-1024x773.png" alt="" class="wp-image-123" srcset="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.54.54-1024x773.png 1024w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.54.54-300x227.png 300w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.54.54-768x580.png 768w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-0.54.54.png 1602w" sizes="(max-width: 1024px) 100vw, 1024px" />

這裡可以選擇要用伺服器的IP還是你要自行設定DNS，如果不知道的話請選擇預設值按下Enter。


<img loading="lazy" width="1024" height="773" src="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-1.04.35-1024x773.png" alt="" class="wp-image-125" srcset="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-1.04.35-1024x773.png 1024w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-1.04.35-300x227.png 300w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-1.04.35-768x580.png 768w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-1.04.35.png 1602w" sizes="(max-width: 1024px) 100vw, 1024px" />
<img loading="lazy" width="1024" height="773" src="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-1.04.39-1024x773.png" alt="" class="wp-image-126" srcset="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-1.04.39-1024x773.png 1024w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-1.04.39-300x227.png 300w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-1.04.39-768x580.png 768w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-1.04.39.png 1602w" sizes="(max-width: 1024px) 100vw, 1024px" />
<img loading="lazy" width="1024" height="773" src="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-1.04.44-1024x773.png" alt="" class="wp-image-127" srcset="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-1.04.44-1024x773.png 1024w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-1.04.44-300x227.png 300w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-1.04.44-768x580.png 768w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-1.04.44.png 1602w" sizes="(max-width: 1024px) 100vw, 1024px" />

這裡是問你要不要現在重新起動，請用方向鍵選擇『Yes』按下Enter。


<img loading="lazy" width="1024" height="773" src="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-1.04.49-1024x773.png" alt="" class="wp-image-128" srcset="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-1.04.49-1024x773.png 1024w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-1.04.49-300x227.png 300w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-1.04.49-768x580.png 768w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-1.04.49.png 1602w" sizes="(max-width: 1024px) 100vw, 1024px" />
<img loading="lazy" width="1024" height="773" src="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-1.04.55-1024x773.png" alt="" class="wp-image-129" srcset="https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-1.04.55-1024x773.png 1024w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-1.04.55-300x227.png 300w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-1.04.55-768x580.png 768w, https://blog.hanlee.co/wp-content/uploads/2019/05/スクリーンショット-2018-02-12-1.04.55.png 1602w" sizes="(max-width: 1024px) 100vw, 1024px" />

按下Enter後系統就會重新啟動了，重新啟動後請重新用SSH連線一次。

### Part 3：建立OpenVPN Profile

  1. 重新連線後切換到root帳號：sudo -i
  2. 新建立profile檔案用於連線：pivpn add
  3. 輸入profile名稱：Enter a Name for the Client:<名稱>
  4. 輸入密碼：Enter the password for the client: <密碼>
  5. 重複輸入密碼：Enter the password again to verify: <密碼>
  6. 成功的話你就會看到：  
    ========================================================  
    Done! <profile名稱>.ovpn successfully created!  
    <profile名稱>.ovpn was copied to:  
    /home/ubuntu/ovpns  
    for easy transfer. Please use this profile only on one  
    device and create additional profiles for other devices.  
    ========================================================
  7. 打開Terminal利用scp指令下載OpenVPN描述黨（.ovpn）：  
    scp -i &#8220;<檔案名稱>.pem&#8221; ubuntu@<你的Amazon伺服器區域名稱>.compute.amazonaws.com:/home/ubuntu/ovpns/<profile名稱>.ovpn <本機位置> &nbsp;*Windows的Putty有scp請自行去搜尋教學。

### Part 4：連線！！！

  1. 到以下網頁下載客戶端： 
      1. Windows：<https://openvpn.net/index.php/open-source/downloads.html>
      2. MacOS：<https://tunnelblick.net/downloads.html> 
  2. 將下載下來的OpenVPN Profile匯入程式後按下連線，輸入當初設定的密碼後就可以連線了喔！
  3. IP有可能會變更，如果發現連不上請重新建立一次Profile。
  4. Mac版要勾選傳送所有流量，網路才會被導向VPN。
  5. 享受沒有IP限制的世界。

 [1]: https://docs.aws.amazon.com/zh_cn/AWSEC2/latest/UserGuide/putty.html?icmpid=docs_ec2_console