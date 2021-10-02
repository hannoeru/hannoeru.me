---
title: Replace Docker Desktop with Multipass
author: hanlee
type: post
lang: en-US
date: 2021-09-28T18:59:14+00:00
description: How to prevent Docker Desktop taken a lot resource from my Mac.
image: /images/2021/No-Docker-Desktop.png
categories:
  - Docker
tags:
  - Docker
  - Docker Desktop
  - Multipass
  - Mac

---

## Why

Because Docker Desktop is taking a lot of resource from my Mac.

## Getting Started

The follwing steps have been tested on my Intel Macbook w/ 16gb ram.

You will needs to remove Docker Desktop before started this tutorial.

## Install Multipass & Docker

Multipass is a cli tools that can let you create and running Ubuntu VM in a minutes.

> Require [Homebrew](https://brew.sh/) installed

```bash
brew install multipass docker
```

Test install

```bash
multipass version

multipass  1.7.0+mac
multipassd 1.7.0+mac
```

## Create Multipass VM

First, create a VM config file `docker.yaml`

```yaml docker.yaml
users:
  - name: ubuntu
    sudo: ALL=(ALL) NOPASSWD:ALL
    ssh-authorized-keys:
      - your-ssh-public-key
package_uplang: zh-TW
date: true
packages:
  - docker
  - avahi-daemon
  - apt-transport-https
  - ca-certificates
  - curl
  - gnupg
  - lsb-release
runcmd:
  - sudo curl -fsSL https://get.docker.com | sudo bash
  - sudo systemctl enable docker
  - sudo systemctl enable -s HUP ssh
  - sudo groupadd docker
  - sudo usermod -aG docker ubuntu
```

Then run this command to create a Ubuntu VM

```bash
multipass launch -c 2 -m 1G -d 5G -n docker 20.10 --cloud-init docker.yaml
```

This will take a few mins to build and start. Once it's done you can see what is running with

```bash
multipass list
```

### Connect to VM

SSH into docker VM

```bash
ssh ubuntu@docker.local
```

Makesure you accepted VM to save you SSH key, this is required for docker to auto connect to remote docker engian.

Also check is docker installed on VM by running

```bash
docker info
```

### Setup docker host

Add this to your `~/.zprofile` to always use this `DOCKER_HOST`

```bash
export DOCKER_HOST="ssh://ubuntu@docker.local"
```

Apply changes

```bash
source ~/.zprofile
```

Check docker info

```bash
docker info
```

### Reference

- [How to Replace Docker Desktop with Ubuntu Multipass](https://www.jimhribar.com/replace-docker-desktop-with-ubuntu-multipass/)
- [Docker Engine with multipass on macOS](https://medium.com/@gourneau/docker-engine-with-multipass-on-macos-9d22b8ade35c)
- [Using SSH Connections in Docker Contexts](https://blog.mikesir87.io/2019/08/using-ssh-connections-in-docker-contexts/)
