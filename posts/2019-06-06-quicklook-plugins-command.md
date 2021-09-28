---
title: QuickLook 插件、指令列表
author: hanlee
type: post
lang: zh-TW
date: 2019-06-06T10:25:36+00:00
description: 安裝 QuickLook 插件，指令列表，錯誤排除。
url: /quicklook-plugins-command/
image: /images/2019/06/スクリーンショット-2019-06-06-18.22.47.png
categories:
  - MacOS
tags:
  - Homebrew
  - MacOS
  - QuickLook

---

![wp-image-388](/images/2019/06/スクリーンショット-2019-06-06-18.22.47.png)

## 安裝

### 使用[Homebrew Cask][1]

安裝插件：

```bash
brew cask install <package>
```

安裝全部插件：

```bash
brew cask install qlcolorcode qlstephen qlmarkdown quicklook-json qlimagesize webpquicklook suspicious-package quicklookase qlvideo
```

## 指令

顯示幫助

```bash
qlmanage -h
```

指定 QuickLook 開啟檔案

```bash
qlmanage -p filename.jpg
```

清除 QuickLook 快取

```bash
qlmanage -r cache
```

重新載入插件

```bash
qlmanage -r
```

Quick Look 的故障排除，通常清除快取並重新載入插件就可以解決問題。

如果無法排除，使用命令方式開啟檔案，就會看到詳細錯誤信息。

在安裝新插件後要重新載入插件才會生效。

## 插件

### [QLColorCode][2]

在預覽時幫程式碼加上顏色，幫助閱讀。

```bash
brew cask install qlcolorcode
```

### [QLStephen][3]

預覽沒有或具有未知副檔名的文件，以純文本顯示。例如：README，CHANGELOG，index.style 等...

```bash
brew cask install qlstephen
```

### [QLMarkdown][4]

預覽 Markdown&nbsp;文件

```bash
brew cask install qlmarkdown
```

### [QuickLookJSON][5]

預覽 JSON 文件

```bash
brew cask install quicklook-json
```

### [BetterZipQL][6]

預覽壓縮檔

注意：BetterZipQL 包含在 BetterZip APP 內，安裝時會一併安裝 BetterZip。

```bash
brew cask install betterzip
```

### [qlImageSize][7]

顯示照片大小與解析度

```bash
brew cask install qlimagesize
```

### [WebP][8]

預覽 WebP 圖像

```bash
brew cask install webpquicklook
```

### [Suspicious Package][9]

預覽標準 Apple 安裝程式內容

```bash
brew cask install suspicious-package
```

### [QuickLookASE][10]

預覽 Adobe ASE 色表

```bash
brew cask install quicklookase
```

### [QLVideo][11]

預覽大多數的影像檔，會自動生成縮圖、封面跟詳細數據。

```bash
brew cask install qlvideo
```

## 參考資料

<https://github.com/sindresorhus/quick-look-plugins>

[1]: https://github.com/phinze/homebrew-cask
[2]: https://github.com/anthonygelibert/QLColorCode
[3]: https://github.com/whomwah/qlstephen
[4]: https://github.com/toland/qlmarkdown
[5]: http://www.sagtau.com/quicklookjson.html
[6]: https://macitbetter.com/downloads/
[7]: https://github.com/Nyx0uf/qlImageSize
[8]: https://github.com/dchest/webp-quicklook
[9]: http://www.mothersruin.com/software/SuspiciousPackage/
[10]: https://github.com/rsodre/QuickLookASE
[11]: https://github.com/Marginal/QLVideo
