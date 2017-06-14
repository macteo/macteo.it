---
layout: post
title: Hiking Map
date: 2017-06-03 16:12:00 +0200
categories: map
image: icons/hiking-map.png
tags: map mapbox
---

I'm building modern digital map suitable for hiking in the Alps as the existing ones are lacking too many basic features needed when you are outdoor in the mountains.

![Tabacco Reference image](/assets/images/hiking-map/Tabacco~015.jpg#center100s)

The map above is my reference one: it's manually drawn by [Tabacco](http://www.tabaccoeditrice.it/eng/azienda.asp) and it can be considered the state of the art for paper maps of the Alps. Many other vendors are offering those kind of maps, however the digital versions, when available, have so many drawbacks that the paper ones are always preferable.

##### Those were my base requirements:
* Mobile first: available at least on iOS (as it's the platform I use), better if also on Android.
* Offline: I should be able to go for a hike with my phone with the map already cached for offline use during the whole trip even without internet connection.
* Retina screen support.
* Position: should be able to overlay my current GPS position.
* Minimal memory footprint.
* Beautiful: I want it to look great!
* POI: alpine huts, bivouacs, shelters, inns, hotels, belied paths, peak names and altitude, city names, river names, hospitals, paths numbers, terrain coverage, paths scale, camping sites, information signs, parkings, scale, no vehicle admitted signs, rivers, lakes, waterfalls, springs, fountains, drinking trough, wood, altitude, houses, huts, ruins, bus stops, funiculars, cabin lifts, chair-lifts, ski lifts, passes and saddles, hospitals.
* Contours: view elevation lines.
* Hill shades: mountain profiles to better perceive your surroundings.

##### And few bonus points:
* Record my route and save it for later.
* Load previously recorder routes on top of base map.
* Select a path and see the altimetry chart before going along it.
* Search for POIs.
* Use vector tiles to limit data transfer, improve readability and performances.
* Based on Open Street Map data.
* Continuously updated.
* Optional 3D view with terrain elevation.

##### Desolation

There isn't any map provider that has realised a compelling digital map fulfilling my base requirements, so the only solution is to understand if I can build one myself.

##### Where to start?

[Open Street Map](http://openstreetmap.org) represents the state of the art of collaboration designing great maps and [Mapbox](https://www.mapbox.com) is the leading company contributing to the project development with a thriving set of modern tools, openly released to the community with the permissive MIT licenses.

###### Mapbox open source contributions

* [iD Editor](https://www.mapbox.com/blog/id-editor-sneak-peek/) founded by [The Knight Foundation](http://mapbox.com/blog/knight-invests-openstreetmap/).
* [Mapbox GL js](https://github.com/mapbox/mapbox-gl-js) Interactive, thoroughly customisable maps in the browser, powered by vector tiles and WebGL.
* [Mapbox GL native](https://github.com/mapbox/mapbox-gl-native) Interactive, thoroughly customisable maps in native Android, iOS, macOS, Node.js, and Qt applications, powered by vector tiles and OpenGL.
* [Mapbox Navigation iOS](https://github.com/mapbox/mapbox-navigation-ios) Turn-by-turn navigation logic and UI in Swift or Objective-C on iOS.

###### Mapbox commercial products

* [Mapbox  Maps](https://www.mapbox.com/maps/) are based on vector tiles, an advanced approach to mapping where data is delivered to the device and precisely rendered in real-time. The result is smooth, fast maps.
* [Directions](https://www.mapbox.com/directions/) Smart turn-by-turn routing based on crowdsourced real-time traffic.
* [Mapbox Studio](https://www.mapbox.com/mapbox-studio/) Design custom maps that fit seamlessly in your application.
* [Geocoding](https://www.mapbox.com/geocoding/) Turn your coordinates into addresses or your addresses into coordinates. 
* [Satellite](https://www.mapbox.com/maps/satellite/) Full global base map that is perfect as a blank canvas or an overlay for your own data.
* [Developer Tools](https://www.mapbox.com/developers/) native SDKs and remote APIs like Directions, Map Matching, Distance and many more.

##### Limits

The biggest limit that prevents me to use the OpenStreetMap data directly through the Mapbox platform is that Mapbox exposes a subset of the informations available on the OpenStreetMap database.

For example every mountain trail usually has an attribute called [`sac_scale`
](http://www.sac-cas.ch/nc/unterwegs/schwierigkeits-skalen.html?cid=1512&did=1000352&sechash=bdae41d3) that [based on the reference guidelines](http://wiki.openstreetmap.org/wiki/Key:sac_scale) can assume different values: 

* T1 - Hiking: trail well cleared.
* T2 - Mountain Hiking: trail with continuous line and balanced ascent.
* T3 - Demanding Mountain Hiking: exposed sites may be secured with ropes or chains, possible need to use hands for balance.
* T4 - Alpine hiking: sometimes need for hand use to get ahead.
* T5 - Demanding alpine hiking: single plainly climbing up to second grade.
* T6 - Difficult alpine hiking: climbing up to second grade.

Trails should be rendered on the map with different colours and sometimes dashes or points as you can see on the Tabacco map: trails are red continuous or dashed lines, sometimes white if large enough.

Similar issues needs to be faced for other mountain routes like *vie ferrate* or for the seasonality of mountain huts that require different icons, downhill ski paths ([piste](http://wiki.openstreetmap.org/wiki/Piste_Maps)) are differentiated by difficulty and uphill [aerialways](http://wiki.openstreetmap.org/wiki/Key:aerialway) should be classified based on their type.

##### Approach and initial results

It's a long way to go and at the moment I've only identified the flow to gather the desired informations and render the digital map. The goal is to build on top of the open source tools offered by [MapBox](https://www.mapbox.com) combined with the toolchain provided by [OpenMapTiles](https://openmaptiles.org), modifying them as needed. Source data is gathered at the moment from [OpenStreetMap](https://www.openstreetmap.org) and other public sources like [USGS SRTM](https://lta.cr.usgs.gov/SRTM1Arc) and [EU-DEM](https://www.eea.europa.eu/data-and-maps/data/eu-dem).
I'm releasing everything as open source on [GitHub](http://github.com/macteo) to respect the licenses so anyone can eventually build on top of my work and once the flow has settled I plan to organise the different repos and write a tutorial to replicate the effort.

The image below reflects the current results ([v0.3](https://map.macteo.it/styles/tralio-0.3.0/#14.1/46.4363/12.0728)) and it's definitely still lacking many informations, but it's a start.

![Tralio-0.3](/assets/images/hiking-map/tralio-0.3.jpg#center100s)

In order to speed up the development and get better performances I'm using the area with this bounding box 11.90000, 46.27185, 12.19625, 46.69510.

Progresses with detailed changelog are available for the reference area over at [map.macteo.it](https://map.macteo.it).

![Zoom and Pitch](/assets/images/hiking-map/map-zomm-pitch.gif#center100s)

In the second part of this post (still unpublished) I'm going to enumerate different tools and technologies I'm using to render and serve the map.