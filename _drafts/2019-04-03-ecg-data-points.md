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

<div id="ecg_3_vega" style="width:90%;"></div>


<script src="https://cdn.jsdelivr.net/npm/vega@5.3.5"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-lite@3.2.1"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-embed@4.0.0"></script>

<script>
  var yourVlSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
  "description": "Google's stock price over time.",
  "data": {
    "url": "https://macteo.it/assets/data/ecg_2019-03-28.csv"
  },
  "selection": {
    "grid": {
      "type": "interval",
      "bind": "scales"
    }
  },
  "transform": [
    {
      "calculate": "datum.point / 510.0",
      "as": "seconds"
    }
  ],
  "mark": {
    "type": "line",
    "color": "#e85249",
    "width": 1.5
  },
  "encoding": {
    "x": {
      "field": "seconds",
      "type": "quantitative",
      "scale": {
        "domain": [
          0,
          10
        ]
      }
    },
    "y": {
      "field": "value",
      "type": "quantitative",
      "scale": {
        "domain": [
          2000,
          -1000
        ]
      }
    }
  },
  "height": 80,
  "width": 300,
  "config": {
    "line": {}
  }
}

let markColor = '#0195E5';
let backColor = '#b3bbbd';

let SETheme = {
  "group": {
    "fill": 'white',
  },

  "arc": { "fill": markColor },
  "area": { "fill": markColor },
  "line": { "stroke": markColor},
  "path": { "stroke": backColor , "fill": "white"},
  "rect": { "fill": markColor },
  "shape": { "stroke": backColor , "fill": "white"},
  "symbol": { "fill": markColor, "size": 40 },

  "axis": {
    "domain": false,
    "grid": false,
    "tickColor": backColor,
   "titleFont": "Source Sans Pro",
   "titleFontSize": 20,
   "titleFontWeight": 300,
   "titleFontColor": "#191F2D",
   "labelFont": "Source Sans Pro",
   "labelFontSize": 10,
   "labelFontWeight": 300, "labelFontColor": "#191F2D"},
   "axisX": {"labelAngle": 0},

  "legend": {
    "symbolSize": 40,
    "titleFont": "Source Sans Pro", "titleFontSize": 30,
    "titleFontWeight": 300, "titleFontColor": "#191F2D",
    "labelFont": "Source Sans Pro", "labelFontSize": 18,
    "labelFontWeight": 300, "labelFontColor": "#191F2D",
    "titlePadding": 10
  },

  "range": {
    "category": [
      '#032765',
      '#0195E5',
      '#3FE8DF',
      '#E0E527',
      '#7329FF',
      '#ed76fb'
    ],
    "diverging": ["#0195E5", "white", "red"],
    "heatmap":{"scheme":"greenblue"},
    "ordinal":{"scheme":"greenblue"}
  }
};
var VIEW;
var opt = {"actions":false, "mode":"vega-lite",
               "renderer": 'svg', "config": SETheme,
               "width":300, "padding": {"left": 0, "top": 0, "right": 0, "bottom": 0}
              };
    if (!yourVlSpec["$schema"].includes("vega-lite") ) {
      console.log('vega mode');
      opt['mode'] = 'vega';
    }
    let tooltipOptions = {"theme":"se"};

    vegaEmbed('#ecg_3_vega', yourVlSpec, opt)
        .then(function(result) {
          // result.view is the Vega View, vlSpec is the original Vega-Lite specification
          VIEW = result.view;
          let w = $('div#ecg_3_vega').width() - 20;
          VIEW.width(w).run();
          // vegaTooltip.default(VIEW, tooltipOptions);
        })
        .catch(console.error);
  // vegaEmbed('#ecg_3_vega', yourVlSpec);
</script>

<script>
$(window).on('resize', function() {
//     // assume I have an element and viewInstance variables representing
//     // the container, and vega View instance, respectively.
    let element = $('div#ecg_3_vega')
    VIEW.width(element.width()).run();
    console.log(VIEW.getState());

});
</script>