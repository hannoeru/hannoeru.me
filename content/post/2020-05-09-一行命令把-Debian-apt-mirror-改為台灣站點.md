---
title: 一行命令把 Debian apt mirror 改為台灣站點
author: hanlee
type: post
date: -001-11-30T00:00:00+00:00
excerpt: 更改APT源為台灣鏡像站點
draft: true
url: /一行命令把-Debian-apt-mirror-改為台灣站點/
categories:
  - Linux
tags:
  - apt
  - Debian
  - mirror
  - tw
  - 鏡像站點

---
更改 source.list 

<pre class="wp-block-code"><code>sed -i 's/ftp.debian.org/ftp.tw.debian.org/g' /etc/apt/sources.list</code></pre>

重新取得

<pre class="wp-block-code"><code>apt update</code></pre>

更新

<pre class="wp-block-code"><code>apt upgrade</code></pre>