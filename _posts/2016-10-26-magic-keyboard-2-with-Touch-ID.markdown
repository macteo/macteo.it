---
layout: post
title: Magic Keyboard 2
date: 2016-10-26 11:57:00 +0200
categories: apple
tags: apple magic keyboard TouchID
image: /assets/images/magic-keyboard/magic-keyboard-2-small.png
excerpt_separator: <!--more-->
---

Apple all but confirmed that the next MacBook Pro models will be unveiled tomorrow and will include support for Touch ID and a custom bar is going to replace the current top row of keys in the embedded keyboard.

![Pay MacBook Pro](/assets/images/magic-keyboard/ApplePaySplashSA.png#center100s)

The above image is already on your Mac if you installed the latest macOS Sierra 10.12.1 update. Check for yourself looking at

```sh
/System/Library/PrivateFrameworks/PassKitUI.framework/Versions/A/Resources/ApplePaySplashSA.tiff
```

Besides the lack of a visible physical power button and of the `Esc` key, [Steve Troughton Smith suggested](http://twitter.com/stroughtonsmith/status/790977924132433920) that developers, in order to populate the _Magic Bar_ with custom controls, will need to create extensions much like the ones used in watchOS 1.

<!--more-->

This opinion is corroborated by the fact that since august a new target named `os_bridge` is available as part of the Xcode toolchain.

![target_os_bridge](/assets/images/magic-keyboard/os_bridge.png#center100s)

In order to support Touch ID - that requires the presence of a Secure Enclave available only as part of the custom _A_ series custom _arm_ SoC used on mobile devices - on Macs that are running on _x86-64_ Intel processors, Apple is going to embed another custom arm SoC inside the Macs. Probably a new letter will be used to describe those chips like the [_S_](http://www.apple.com/apple-watch-series-2/) serie created for the ᴡᴀᴛᴄʜ or the [_W_](http://www.apple.com/airpods/) serie for headphones. I'm going to bet my \$1 to _E1_ - Embedded 1.

##### Magic Keyboard 2

All those speculations come nicely together also if Apple is going to upgrade the Magic Keyboard replacing the top row with a customizable display like the one rendered below. This device will enable Touch ID support also on iMac, Mac Pro, Mac mini and Apple TV devices..

![Pay MacBook Pro](/assets/images/magic-keyboard/magic-keyboard-2.png#center100s)

All the same principles will apply nicely:

- Custom E1 SoC.
- Touch ID with secure enclave.
- Extensions are preloaded as happens on watchOS (without too much RAM and battery constraints).
- All the logic will run on the extension directly on the keyboard itself and only equivalent _keystrokes_ will be sent back to the Mac to keep low latency.
- The base interface will be preloaded in RAM on the keyboard to speed up the launch.
- Authentication and Security will be managed directly on the Magic Keyboard, but passwords will stay encrypted on the paired Mac keychain.
- It will also work as external keyboard for iPhone, iPad, Apple TV devices.
- Works with Bluetooth and (already) has a Lightning port to charge and eventually communicate.
- Requires macOS Sierra 10.12.1, iOS 10.1 or tvOS 10.0.1.

Now the really bold prediction: the price will stay the same as the original Magic Keyboard: $99. Apple has already increased the price by $30 last year.
