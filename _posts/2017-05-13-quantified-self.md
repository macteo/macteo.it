---
layout: post
title: Quantified Self
date: 2017-05-13 07:00:00 +0200
categories: data
image: /assets/images/icons/gyroscope-sum@2x.png
tags: quantified self
excerpt_separator: <!--more-->
---

The [quantified self](https://en.wikipedia.org/wiki/Quantified_Self) concept and movement represent an area of great interest to improve the knowledge of yourself and a great stimulus to become a better person.

At the moment I'm leveraging existing tools to measure few areas:

- Body weight with an old style scale each morning.
- Workouts: running and biking with [Strava](https://www.strava.com/athletes/12812427)[^1].
- Hearth rate[^1] with [HearthWatch](http://heartwatch.tantsissa.com).
- Steps with [Pedometer++](http://pedometerplusplus.com).
- Hours spent standing[^1].
- Active energy burned[^1].
- Minutes of daily activity[^1].
- Sleep with [AutoSleep](https://itunes.apple.com/us/app/autosleep-auto-sleep-tracker-for-watch/id1164801111?mt=8).
- Diet (occasionally) with [MyFitnessPal](https://www.myfitnesspal.com).
- Routes with [Moves](https://www.moves-app.com).
- Time spent on projects with [Toggl](https://toggl.com).
- <!--more-->

In order to see in a single place the collected data I'm leveraging [Gyroscope](https://gyrosco.pe/). It looks great and gives some insights, what it lacks though is a way to compare different periods.

[RescueTime](https://www.rescuetime.com) gives you some insights on productivity during working hours, tracking automatically the app you are using (works on macOS, doesn't on iOS), the name of the open document and website addresses on browsers. Unfortunately I wanted to have a more precise proxy of my productivity, measured for example in lines of code written and deleted, hours spent in conference calls, number of emails sent and so on.

I wasn't able to find something alredy existing and I'm also scared to give all this informations to a third party, so this is what I tried:

- Deployed a small VPS with the [ELK stack](https://www.elastic.co/products) (ElasticSearch, Logstash, Kibana) able to ingest, store and display charts of specially time series.
- Created a simple iOS app, with a list of buttons to increase different counters on ElasticSearch.
- Developed scripts to collect informations from different remote services sending them to Logstash.
- Setup webhooks, i.e. on GitHub, pointing to Logstash to collect actions from different services.
- Written Logstash scripts able to read exports of my bank transactions and store them in ElasticSearch.
- Created different dashboards in Kibana to visualise and compose all the informations coming from different sources.

Unfortunately I wasn't able to render the picture I desired: a single indicator (sum of many smaller ones) to tell me how much productive I've been in a particular day, that can be plotted in a single comprehensive chart.

Those are some of issues I faced:

- Kibana is a great tool specifically designed for time series. When the information is not clearly representative of just a single moment in time, it becomes useless. It has some charts to choose from, but are not very broad nor easily customizable.
- Automatic tracking for some stuff is impossible due to the absence of open APIs.
- Manual tracking is tedious, prone to errors and suffers deeply of rapid fatigue.

At the moment I'm stuck, I don't have this proxy and I'm really bored to track things manually so I stopped doing it.

Do you have any suggestion? Ping me on Twitter [@macteo](https://twitter.com/macteo).

[^1]: I own an [Apple Watch](https://www.apple.com/apple-watch-series-2/) series 2 that includes a hearth rate sensor, accelerometer, gyroscope and the GPS.
