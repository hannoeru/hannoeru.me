---
title: 【MacOS】iTerm2 + Oh My Zsh + Cobalt2 安裝教學
author: hanlee
type: post
lang: zh-TW
date: 2020-02-22T06:04:40+00:00
description: iTerm2 + Oh My Zsh + Cobalt2 安裝教學，簡單快速，複製貼上就可以完成，安裝紀錄。
url: /iterm2-oh-my-zsh-cobalt2-install/
image: /images/2020/02/スクリーンショット-2020-02-22-14.31.19.png
categories:
  - MacOS
tags:
  - Cobalt2
  - Dev
  - iTerm
  - MacOS
  - Oh My Zsh
  - Shell
  - Zsh
  - 安裝教學

---

## iTerm2

官網：<https://iterm2.com/>

安裝檔（官方連結）：<https://iterm2.com/downloads/stable/latest>

下載完解壓縮後把它放到你的應用程式資料夾（~/Applications）

## Install Zsh

如果是不是使用 ＭacOS Catalina 的話，要手動安裝 Zsh 到電腦上。

可以先嘗試使用 **`zsh --version`** 看是不是已經安裝 Zsh 了，如果它高於 **4.3.9** 版的話就沒問題，不過還是建議安裝
5.0 以上的版本。

```bash
brew install zsh
```

如果要將 zsh 設為預設的話，可以執行：（**macOS High Sierra**）

```bash
chsh -s /bin/zsh
```

## Oh My Zsh

官方 Github：<https://github.com/ohmyzsh/ohmyzsh>

在安裝之前，確認一下 Zsh 已經被設為預設 Shell

```bash
echo $SHELL
```

出現 `/usr/bin/zsh` 代表已經成功切換為 Zsh 了

### 安裝 Oh My Zsh

這是官方提供的一鍵安裝指令

```bash
sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

## Cobalt2 主題

官方 Github：<https://github.com/wesbos/Cobalt2-iterm>

下載 Repo：[連結][1]

下載後解壓縮

或是使用 git clone

```bash
cd ~/Downloads
git clone https://github.com/wesbos/Cobalt2-iterm.git
cd Cobalt2-iterm
cp cobalt2.zsh-theme ~/.oh-my-zsh/themes/
```

修改 .zshrc 設定檔

```bash
nano ~/.zshrc
```

更改 ZSH_THEME

```bash
ZSH_THEME="cobalt2"
```

Ctrl + X 退出 Y 儲存

套用變更

```bash
source ~/.zshrc
```

## 安裝字型

安裝完主題之後應該會有一些字顯示不出來，這裡我們就要安裝字型：

```bash
git clone https://github.com/powerline/fonts
cd fonts
./install.sh
```

## 更改 iTrem 配置

打開 iTrem 設定，快速鍵 cmd + ,

### 更改顏色

到 Profiles >> Default >> Colors >> Color Presets 下拉選單

![wp-image-514](/images/2020/02/スクリーンショット-2020-02-22-14.16.48.png)

選擇 Import，到 ~/Downloads 選擇之前 Github 載下來的 cobalt2.itermcolors 這個檔案，匯入後選擇 cobalt2

之後也可以根據自己的喜好隨意調整。

### 更改字型

到旁邊的 Text 下方的 Font，搜尋「powerline」選擇自己喜歡的字型就可以了

![wp-image-513](/images/2020/02/スクリーンショット-2020-02-22-14.24.45.png)

## 完成

這是我目前使用的樣式

![wp-image-518](/images/2020/02/スクリーンショット-2020-02-22-14.31.19.png)

[下載設定檔](/data/itrem2-profile.json){download}

[1]: https://github.com/wesbos/Cobalt2-iterm/archive/master.zip
