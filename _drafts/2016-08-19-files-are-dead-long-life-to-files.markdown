---
layout: post
title:  Files are dead long life to files
date:   2016-08-19 07:00:00 +0200
categories: files
---

**Since the iPhone's advent in 2007 files started to die.**
**With iOS 11 and the iPad Pro they started to be alive again.**

File as representation of bits on a disk are obviously doing good and are stronger than ever, however the perception of what is a file or what it contains to the final and generic user is fading away. It's still important to digital content creators, but most people don't have to directly manipulate a single file on most days.

![Homescreen](/assets/images/files-are-dead/Homescreen.png#center400)

Google Docs, Sheets, Photos, Strava, Health, Checkins, YouTube, What'App, Telegram, Facebook, Notes, News.

#TODO describe the apps that doesn't have any file notion


##### Filesytem

iOS didn't include a native file management app until [iCloud Drive](http://www.apple.com/icloud/icloud-drive/) gained an optional and hidden by default app in 2015.

The filesystem and file/folder structure is still there obviously but it's completely hidden from the end user[^1].

##### Safari

The web experienced inside a browser mostly doesn't have the file notion too. Files can be downloaded or uploaded, but on iOS it's a pain to transfer them inside the desired app[^2], and until iOS 9 (available in late 2015) you weren't able to select anything different than an image from the camera roll.

##### Apps and services

[Good Reader](https://www.goodreader.com) was one of the first apps that back in 2008 started providing PDF viewing capabilities and file management: *open*, *move*, *copy*, *duplicate*, *unzip*, *delete*. Many other apps followed and apps/services like [Dropbox](https://dropbox.com) let you browse your files and folders even if you don't have them available in the local storage. Files are entities that live in the cloud *in some form* based on the service you rely on to host them.

Informations inside apps are usually saved in a proprietary or at least undocumented format inside a database ([SQLite](https://www.sqlite.org), [CoreData](https://developer.apple.com/library/watchos/documentation/Cocoa/Conceptual/CoreData/index.html), [CloudKit](https://developer.apple.com/icloud/), [Realm](https://realm.io) or just synchronized in realtime with remote services.

##### The file concept

If you ask a 10 years old where you can find a particular photo, you'll probably get the answer to look inside the [Photos](http://www.apple.com/ios/photos/) app or eventually [Google Photos](https://photos.google.com). The file containing the photo informations, the raster one, basically disappeared: it's somewhere but we don't know where it's stored, even if it probably contains the most valuable piece of information every family has.

##### The murderer

Apple is clearly the killer as it has designed an entire OS to hide files from the users, and it became the second most popular one in the world - after Android that adopted the very same principles.

##### File limits

- Everything on mobile works against them.
- Kids are born with 

##### Service limits

- If something goes wrong, they're lost.
- Who owns the information?
- How can I export?
- Lock-in.
- Versions.
- Share.
- Backup.

#### A new hope

##### Notes for iOS and macOS

Notes app, the XXX most used app by Apple's admission, has been praised by many reviewers as one of the best apps created by Apple with Safari. [Federico Viticci](https://twitter.com/viticci) of MacStories wrote a [great Notes review](https://www.macstories.net/stories/ios-9-review/8/).

> Notes isn't just a powerful alternative to third-party note-taking apps – it joins Safari on the podium of Apple's best work on iOS, period.

Notes is based on CloudKit so it doesn't expose the structure of notes to the end user. Simplicity and ease of use are winning, but the lock-in is really strong as the only export format (on macOS version) is the brave old PDF.

What I consider really interesting is the support of inline attachments besides rich text. You are able to embed links, images, drawings and generic files that will be saved as [Assets](https://developer.apple.com/library/ios/documentation/DataManagement/Conceptual/CloudKitQuickStart/AddingAssetsandLocations/AddingAssetsandLocations.html) in the cloud.

---

[^1]: Developers have access only to a small portion of the filesystem as each app lives insides a small *sandbox* for security reasons.

[^2]: [`UIDocumentPicker`](https://developer.apple.com/library/ios/documentation/FileManagement/Conceptual/DocumentPickerProgrammingGuide/AccessingDocuments/AccessingDocuments.html) and the iOS 8 [`UIDocumentProvider`](https://developer.apple.com/library/mac/documentation/General/Conceptual/ExtensibilityPG/FileProvider.html) extensions have been mostly neglected by third party developers (i.e. Dropbox still doesn't support the `open` feature).