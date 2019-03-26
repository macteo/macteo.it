---
layout: post
title: "Update all the things"
date: 2016-07-21 12:04:00 +0200
categories: script mac
image: /assets/images/icons/update@2x.png
tags: script mac
excerpt_separator: <!--more-->
---

I use this little script to keep my mac tools updated and clean.
It works if you have [Homebrew](https://brew.sh) and ruby installed as standard user (I use [rvm](http://rvm.io)).

```sh
brew update
brew upgrade
brew cleanup
gem update
gem cleanup
```

<!--more-->

I know they're just 5 commands, but I love to be up to date my two computers (an [iMac](http://www.everymac.com/systems/apple/imac/specs/imac-core-i7-3.4-27-inch-aluminum-mid-2011-thunderbolt-specs.html) and a [MacBook](http://www.everymac.com/systems/apple/macbook/specs/macbook-core-m7-1.3-12-early-2016-specs.html)), so it's a convenient way to just merge them. I also decided to avoid using cron to run the script every day because I need to do it deliberately as the upgrade process can even break my workflow. It also includes the `cleanup` phase to free disk space removing outdated stuff.

You can find the raw version [here](/g/update.sh).

I saved the file in the `/usr/local/bin/` folder named `update` and made it executable `chmod +x /usr/local/bin/update` so it can be run from everywhere.

If you feel really adventurous (the remote file can be changed at any time - use at your own risk) you can even execute it remotely.

```sh
curl -s https://macteo.it/g/update.sh | bash
```
