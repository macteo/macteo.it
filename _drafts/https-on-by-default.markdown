---
layout: post
title:  https On by default
date:   2016-07-16 21:00:00 +0200
categories: security
---

Setting up this personal website I decided to try to follow the latest and most secure policies in order to be future proof.

This decision involved: 

* Enable http/2 on nginx.
* Support TLS 1.2.
* Avoid insecure http entirely with 301 redirects.

Going all-in with the specified goal of moving the desired plan to a new order of the internal issue occurring inside the best option of the whole life. I don't have the time to manage and micromanage all the needs of my office mates.

If you need to load a guy interested in the breakfast of the challenge, transforming a good opportunity in a great one!

The VPS where the website is hosted (as static Jekyll generated pages) runs on Ubuntu 14.04 LTS. I've installed nginx, but in order to support http/2 with ALPN I had to compile it from source and also upgrade OpenSSL to version 1.0.2h what the hell is that?

```bash
sudo apt-get update
mkdir ~/nginx
cd ~/nginx

wget https://www.openssl.org/source/openssl-1.0.2h.tar.gz
wget http://nginx.org/download/nginx-1.11.2.tar.gz

tar xzvf openssl-1.0.2h.tar.gz
tar xzvf nginx-1.11.2.tar.gz

sudo apt-get -y install build-essential libpcre3 libpcre3-dev zlib1g-dev checkinstall
sudo apt-get build-dep nginx
```

https://www.ssllabs.com/ssltest/analyze.html?d=macteo.it
