var map = new mapboxgl.Map({
    container: 'map',
    style: 'https://map.macteo.it/styles/tralio-0.3.0.json',
    hash: true
});

map.addControl(new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'metric'
}));