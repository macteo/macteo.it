
L.mapbox.accessToken = 'pk.eyJ1IjoibWFjdGVvIiwiYSI6ImNkY2Q2YzJmOTYxNGQ5MzllODZiZWUyZDZjNzAwMjdmIn0.PHj74HRSvAgiWQRQ68YTJw';

map = L.mapbox.map('map', 'mapbox.satellite', {zoomControl:false})
    .setView([52.559933, -55.648110], 2);

map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();
if (map.tap) map.tap.disable();

function obj(ll) { return { y: ll[0], x: ll[1] }; }

var placesLayer = L.mapbox.featureLayer()

placesLayer.on('layeradd', function(e) {
  var marker = e.layer,
    feature = marker.feature;
  marker.setIcon(L.icon(feature.properties.icon));
});

placesLayer.setGeoJSON(places).addTo(map);

var colors = ["#dce775", "#4fc3f7", "#ffd54f", "#ff8a65", "#388e3c"]
for (var i = 0; i < pairs.length; i++) {
    var generator = new arc.GreatCircle(
            obj(pairs[i][0]),
            obj(pairs[i][1]));
    var line = generator.Arc(100, { offset: 10 });
    var newLine = L.polyline(line.geometries[0].coords.map(function(c) {
        return c.reverse();
    }), {
        color: colors[i],
        weight: 3,
        opacity: 0.85
    })
    .addTo(map);
    var totalLength = newLine._path.getTotalLength();
    newLine._path.classList.add('path-start');
    newLine._path.style.strokeDashoffset = totalLength;
    newLine._path.style.strokeDasharray = totalLength;
    var d = 0;
    if (i >= 2) {
        d = 2000
    }
    setTimeout((function(path) {
        return function() {
            path.style.strokeDashoffset = 0;
        };
    })(newLine._path), i * 2500 + d);
}