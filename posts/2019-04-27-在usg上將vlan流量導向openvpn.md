---
title: 在USG上將VLAN流量導向OpenVPN
author: hanlee
type: post
lang: zh-TW
date: 2019-04-26T17:34:14+00:00
description: 在不能使用VPN的產品上透過Wifi連到VPN，就可以解開有些服務的地區限制。
url: /在usg上將vlan流量導向openvpn/
image: /images/2019/04/1_dExpXTogMQ1mnsJKvFMOMA.png
categories:
  - OpenVPN
  - Unifi
tags:
  - OpenVPN
  - Unifi
  - USG
  - VLAN
  - VPN
  - Wifi

---
## 問題

想要在不能使用 VPN 的產品上透過 Wifi 連到 VPN，就可以解開有些服務的地區限制，也可以以非常便利的方式快速切換 VPN。

## 環境

Unifi USG

## 解決辦法

首先先在你想要的國家架設 OpenVPN 伺服器，或是使用免費或付費的 OpenVPN 伺服器。

取得 ovpn 檔案後用記事本或你習慣的文字編輯器開啟檔案在 `<ca>` 之前加上 `route-nopull`

```bash
route-nopull #加上
<ca>
xxxxxxxxxxxxx
```

接下來將 ovpn 檔案複製到 USG，路徑：`/config/openvpn/`

```bash
scp /path/to/filename.ovpn user@usg-ip:/config/openvpn/
```

之後在 Unifi 上新增你要使用的 Corporate Network（有線網路）& Wireless Network（無線網路）並設定 VLANID

如果直接在USG上設定OpenVPN跟路由的話會因為重新啟動而覆蓋掉原本的更動，所以要在 Unifi Controller 中加上 [config.gateway.json](https://help.ubnt.com/hc/en-us/articles/215458888-UniFi-USG-Advanced-Configuration) 檔案，內容如下：

```json config.gateway.json
{
 "firewall": {
  "modify": {
   "namevpn": {
    "rule": {
     "10": {
      "action": "modify",
      "description": "Traffic to VLAN to VPN",
      "modify": {
       "table": "1"
      },
      "source": {
       "address": "<VLAN's Address/Subnet>"
      }
     }
    }
   }
  },
  "source-validation": "disable"
 },
 "interfaces": {
  "ethernet": {
   "eth1": {
    "vif": {
     "<VLANID>": {
      "firewall": {
       "in": {
        "modify": "namevpn"
       }
      }
     }
    }
   }
  },
  "openvpn": {
   "vtun0": {
    "firewall": {
     "in": {
      "name": "LAN_IN"
     },
     "local": {
      "name": "LAN_LOCAL"
     },
     "out": {
      "name": "LAN_OUT"
     }
    },
    "config-file": "/config/openvpn/filename.ovpn"
   }
  }
 },
 "protocols": {
  "static": {
   "table": {
    "1": {
     "interface-route": {
      "0.0.0.0/0": {
       "next-hop-interface": {
        "vtun0": "''"
       }
      }
     }
    }
   }
  }
 },
 "service": {
    "nat": {
      "rule": {
        "5000": {
          "description": "masq to vpn vtun0",
          "destination": {
            "address": "0.0.0.0/0"
          },
          "outbound-interface": "vtun0",
          "type": "masquerade"
        }
      }
    }
  }
}
```

依照你的Unifi網路設定更改你想要使用的 `<VLAN's Address/Subnet>` & `<VLANID>`，之後將 [config.gateway.json](https://help.ubnt.com/hc/en-us/articles/215458888-UniFi-USG-Advanced-Configuration) 複製到：`/unifi/data/sites/<unifi_base>/`

```bash
scp /path/to/config.gateway.json user@unifi-controller:/unifi/data/sites/<unifi_base>/
```

`<unifi_base>` 的位置因操作系統而異。你可以在瀏覽器的URL上面，控制器的網址中找到。原始站點名為 `default`，如果你有一個以上的站點，Unifi 將會為每個創建的站點分配一個隨機字符串。例如，當在站點的儀表板頁面面時，將在 URL 欄中看到：

```bash
https://127.0.0.1:8443/manage/s/ceb1m27d/dashboard
```

`ceb1m27d` 就是 `<unifi_base>` 的位置

把檔案丟進去以後你可以去 Devices > USG > Config > Manage Device > Force provision，強制 Provision USG，就會把你的設定檔推送到 USG 上，這個過程可能要等待數分鐘。

如果想要恢復的話單純刪除 `config.gateway.json` 後強制 Provision USG 就可以回復原狀了。

以上。

## 參考資料

[UniFi &#8211; USG Advanced Configuration][1]

[USG Route VLAN over OpenVPN client][2]

 [1]: https://help.ubnt.com/hc/en-us/articles/215458888-UniFi-USG-Advanced-Configuration
 [2]: https://community.ui.com/t5/UniFi-Routing-Switching/USG-Route-VLAN-over-OpenVPN-client/td-p/2146180
