---
layout: post
title: ECG data points
date: 2019-04-02T08:52:00+01:00
categories:
tags: egc
rounded_image: true
excerpt_separator: <!--more-->
---

After my beloved Apple Watch gained the ECG feature last week, I've taken few
electrocardiograms to better understand the feature and, why not, check if there
are sign of atrial fibrillation. Everything seems fine fortunately.
However one of the thing I noticed is that I need to securely strap the watch to
my wrist in order to take effective measurements.

![ECGs in Health App](/assets/images/ECG-health.png#center320s)

The
Out of curiosity I've also performed a complete data export from HealthKit and
there they are, few [CSV](https://it.wikipedia.org/wiki/Comma-separated_values)
files, one per each test.

Open one and you'll find 15.314 rows of measures.

_yes_ that's exactly

<!--more-->

<div id="ecg_0"></div>

<script>hearthChart('#ecg_0', '/assets/data/ecg_2019-03-28.csv');</script>

<div id="ecg_1"></div>

<script>hearthChart('#ecg_1', '/assets/data/ecg_2019-04-04_0.csv');</script>

<div id="ecg_2"></div>

<script>hearthChart('#ecg_2', '/assets/data/ecg_2019-04-04_1.csv');</script>
