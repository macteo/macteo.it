---
layout: post
title: libjpeg-turbo with bitcode
date: 2016-08-09 21:14:00 +0200
categories: build
tags: build ios xcode
image: /assets/images/icons/bitcode@2x.png
excerpt_separator: <!--more-->
---

For a little side project I'm developing for iOS, I needed to build [libjpeg-turbo](http://libjpeg-turbo.virtualgl.org).

Unfortunately the binary provided by the project maintainers doesn't include [bitcode](https://developer.apple.com/library/tvos/documentation/IDEs/Conceptual/AppDistributionGuide/AppThinning/AppThinning.html) and even if at the moment it's not compulsory (unless you are targeting _WatchOS_), I like to be future proof, as Apple will eventually require it to be included in every app binary.

I've found a [dedicated repository](https://github.com/dhoerl/libjpeg-turbo-builder) by [David Hoerl](https://github.com/dhoerl) with instructions to build `libjpeg-turbo` for iOS, but unfortunately it doesn't include bitcode too.

In the issues on GitHub there's a [build script](https://github.com/libjpeg-turbo/libjpeg-turbo/issues/5) to build with bitcode enabled, but with the current SDK versions it fails.

<!--more-->

This is an updated version with some optimizations:

- Developer tools and SDK paths are automatically detected, so it should be compatible even with future Xcode versions (tested with Xcode 7.2.1, 7.3.1 and 8.0 β4).
- Install required packages: `libtool`, `automake`, `autoconf`, `nasm`.
- Creates a Universal Binary library with simulator and device architectures.

#### Instructions:

- Install Xcode and command line tools.
- Install [Homebrew](http://brew.sh) on your Mac.
- Open terminal and `cd` into a temporary directory.

Download and run the script that your can find [here](/g/libturbo-jpeg.sh) with just a single line of code.

```bash
curl -s https://macteo.it/g/libturbo-jpeg.sh | bash
```

**I'm not responsible if something goes wrong.**

You'll find the fat library with bitcode inside the `../libs/universal` folder.

> Architectures in the fat file: libturbojpeg.a are: armv7 armv7s i386 x86_64 arm64

🎉

The process [seems to be confirmed](https://github.com/libjpeg-turbo/libjpeg-turbo/issues/5#issuecomment-238588594).

I also sent a test build including bitcode to iTunes Connect, it has been processed successfully and it is now available (privately) on TestFlight.
