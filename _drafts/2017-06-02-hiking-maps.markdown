---
layout: post
title: Hiking Maps
date: 2017-06-02 07:00:00 +0200
categories: map mapbox hike
tags: map
---

I live in Trento, a beautiful city in northern Italy surrounded by the Alps and I really like hiking, skiing, climbing, camping and broadly being into the wild. What I also like are maps, new and old, digital and made of paper. My two thesis written while obtaining my degrees in Environmental Engineering were both centered on maps and especially GIS applications.

[Open Street Map](http://openstreetmap.org) represents the state of the art of collaboration designing great maps and [Mapbox](https://www.mapbox.com) is the leading company contributing to the project development with a thriving set of modern tools, openly released to the community with the permissive MIT licenses. 

##### Just to enumerate some open source contributions:
* [iD Editor](https://www.mapbox.com/blog/id-editor-sneak-peek/) founded by [The Knight Foundation](http://mapbox.com/blog/knight-invests-openstreetmap/).
* [Mapbox GL js](https://github.com/mapbox/mapbox-gl-js) Interactive, thoroughly customisable maps in the browser, powered by vector tiles and WebGL.
* [Mapbox GL native](https://github.com/mapbox/mapbox-gl-native) Interactive, thoroughly customisable maps in native Android, iOS, macOS, Node.js, and Qt applications, powered by vector tiles and OpenGL.
* [Mapbox Navigation iOS](https://github.com/mapbox/mapbox-navigation-ios) Turn-by-turn navigation logic and UI in Swift or Objective-C on iOS.

##### Mapbox's commercial products are also thriving:
* [Maps](https://www.mapbox.com/maps/) Mapbox is built on vector maps, an advanced approach to mapping where data is delivered to the device and precisely rendered in real-time. The result is smooth, fast maps.
* [Directions](https://www.mapbox.com/directions/) Smart turn-by-turn routing based on crowdsourced real-time traffic.
* [Mapbox Studio](https://www.mapbox.com/mapbox-studio/) Design custom maps that fit seamlessly in your application.
* [Geocoding](https://www.mapbox.com/geocoding/) Turn your coordinates into addresses or your addresses into coordinates. 
* [Satellite](https://www.mapbox.com/maps/satellite/) Full global base map that is perfect as a blank canvas or an overlay for your own data.
* [Developer Tools](https://www.mapbox.com/developers/) native SDKs and remote APIs like Directions, Map Matching, Distance and many more.

#### Digi
During the last few months I've analysed the panorama of digital hiking maps available for my region (Trentino - Alto Adige) in order to replace printed paper ones, carefully designed to help hikers. 

##### Those were my base requirements:
* Mobile first: available at least on iOS (as it's the platform I use, your mileage may vary), better if also on Android.
* Offline: I should be able to go for an hike with my phone with the map cached for offline use to use if for the whole trip even without internet connection.
* Retina images
* Position: should be able to overlay my current GPS position.
* Minimal memory footprint.
* Beautiful: I want it to look great!
* POI: alpine huts, bivouacs, shelters, inns, hotels, belied paths, peak names and altitude, city names, river names, hospitals, paths numbers, terrain coverage, paths scale, camping sites, information signs, parkings, scale, no vehicle admitted signs, rivers, lakes, waterfalls, springs, fountains, drinking trough, wood, altitude, houses, huts, ruins, bus stops, funiculars, cabin lifts, chair-lifts, ski lifts, passes and saddles, hospitals.
* Contours: view elevation lines.
* Hill shades: view mountain profiles to better perceive your surroundings.

##### And few bonus points:
* Record my route and save it for later.
* Load previously recorder routes on top of base map.
* Select a path and see the altimetry chart before going along it.
* Search for POIs.
* Use vector tiles to limit data transfer and improve readability.
* Based on Open Street Map data.
* Continuously updated.
* Optional 3D view with mountains elevation.

For reference this is an extract of a plain old paper map designed and sold by Tabacco - Sheet 015 *Marmolada - Pelmo - Civetta - Moiazza* scale 1:25.000 when printed (used without permission from unknown source - few files stitched together), that I intend to use as reference.

-- Image


Obviously this paper map lacks many of the basic features I'm looking for in a digital map, however it serves hikers really well.

![Tabacco Reference image](/assets/images/hiking-map/Tabacco~015.jpg#center100s)

The very same area, with updated informations, is available also through the [TABACCOmapp](http://www.tabaccomapp.it) with a 1,99€ in-app purchase.

[TABACCOmapp](/assets/images/hiking-map/TABACCOmapp_s.gif#center100s)


##### Mapbox Outdoor
![Mapbox outdoor](/assets/images/hiking-map/mapbox-outdoor.png#center100s)
![Mapbox outdoor zoom](/assets/images/hiking-map/mapbox-outdoor-zoom.png#center100s)

##### Open Map Tiles
![OpenMapTiles outdoor](/assets/images/hiking-map/openmaptiles.png#center100s)
![OpenMapTiles outdoor zoom](/assets/images/hiking-map/openmaptiles-zoom.png#center100s)

### What makes an outdoor map great?

* POIs: 
* Contour lines.
* Paths with classification and numbers.
* Roads.
* Rivers, lakes, sea with names.
* Buildings.
* Mountains with cliffs.
* Aerialways.
* Ice.
* Via ferrata.
* Saddles and passi.
* Peaks with altitude.
* Punti panoramici.
* Car Parks.
* Divieti di accesso per le auto.
* Alping Hut, ricoveri.
* Springs, fountains.
* Hillshades.
* Land cover (grass, forests, rocks, gravel, barren land...)
* Piste, ski trail
* Toponyms
* Boundaries.
* Open trasport stops (bus)
* Campings


