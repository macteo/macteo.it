---
layout: post
title: Dynamic Framework with CocoaPods support
date: 2016-10-18 11:04:00 +0200
categories: xcode
image: /framework.png
excerpt_separator: <!--more-->
---

A short and compact guide to create a basic redistributable framework with CocoaPods support. This example is intended to work on iOS, but the same principles can be applied to watchOS, tvOS and macOS.

Create a new Xcode project and select **Cocoa Touch Framework**.

![Framework](/assets/images/framework/001 - create_xcode_framework_project_0.jpg#center1000)

For redistributable libraries Objective-C is still the language-to-go. But you can also choose to write them in Swift if the host apps are willing to include the swift runtime.

![Framework](/assets/images/framework/002 - create_xcode_framework_project_1.jpg#center1000)

![Framework](/assets/images/framework/003 - create_xcode_framework_project_2.jpg#center1000)

<!--more-->

Set the right version, 0.1.0 is a good start point.
Check the **Allow app extension API only** if you plan to use your framework from inside app extensions.

![Framework](/assets/images/framework/004 - xcode_version_and_extension.jpg#center1000)

Create at least a new class.

![Framework](/assets/images/framework/005 - create_classes.jpg#center1000)

Populate the header file.

![Framework](/assets/images/framework/006 - write_headers.jpg#center1000)

Implement the methods.

![Framework](/assets/images/framework/007 - implement_classes.jpg#center1000)

Import your header files in the _Umbrella_ `Awesome.h` header file so they will be accessible.

![Framework](/assets/images/framework/008 - populate_umbrella_header.jpg#center1000)

Open **Terminal** and move into the project folder, for example

```bash
cd ~/Documents/Projects/Awesome
```

![Framework](/assets/images/framework/009 - terminal_move_to_folder.jpg#center1000)

Install [CocoaPods](http://cocoapods.org) gem if you don't have it already.

```bash
[sudo] gem install cocoapods
```

![Framework](/assets/images/framework/010 - install_cocoapods.jpg#center1000)

```bash
pod spec create Awesome
```

![Framework](/assets/images/framework/011 - create_podspec.jpg#center1000)

![Framework](/assets/images/framework/012 - finder_structure.jpg#center1000)

Edit `Awesome.podspec`

![Framework](/assets/images/framework/013 - edit_podspec.jpg#center1000)

![Framework](/assets/images/framework/014 - final_podspec.jpg#center1000)

Add a license file

![Framework](/assets/images/framework/015 - add_license_file.jpg#center1000)

Create a remote repository and add it the local copy

```bash
git remote add origin git@github.com/macteo/Awesome.git
```

Commit and push

```bash
git push origin master
```

![Framework](/assets/images/framework/016 - commit_and_push.jpg#center1000)

```bash
git tag v0.1.0
git push --tags
```

![Framework](/assets/images/framework/017 - add_tag.jpg#center1000)

```bash
pod spec lint Awesome.podspec
```

![Framework](/assets/images/framework/018 - lint.jpg#center1000)

Create a sample project inside the main folder.

![Framework](/assets/images/framework/019 - create_sample_project_0.jpg#center1000)

![Framework](/assets/images/framework/020 - create_sample_project_1.jpg#center1000)

![Framework](/assets/images/framework/021 - create_sample_project_2.jpg#center1000)

```bash
cd AwesomeExample
pod init
```

![Framework](/assets/images/framework/022 - move_to_sample_project_and_init_pods.jpg#center1000)

Edit podfile to include the previously defined podspec. We use relative path for the example project.

```ruby
pod 'Awesome', :path => '../'
```

![Framework](/assets/images/framework/023 - edit_podfile.jpg#center1000)

```bash
pod install
```

![Framework](/assets/images/framework/024 - pod_install.jpg#center1000)

![Framework](/assets/images/framework/025 - final_project_structure.jpg#center1000)

![Framework](/assets/images/framework/026 - open_sample_project.jpg#center1000)

Build so the dependencies are prepared

```swift
import Awesome
```

```swift
AwesomeLogger().log("Hello World")
```

![Framework](/assets/images/framework/027 - final_result.jpg#center1000)

Edit **Awesome.podspec** and bump version number.

![Framework](/assets/images/framework/028 - bump_version.jpg#center1000)

Add sample project files, commit, push and tag.

```bash
git add .
git commit -m "Added sample project"
git push origin master
git tag v0.1.1
git push --tags
```

![Framework](/assets/images/framework/029 - add_sample_project.jpg#center1000)

![Framework](/assets/images/framework/030 - create_new_tag_and_push.jpg#center1000)
