mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v10', // style URL
    center: [geo_location.split(",")[0], geo_location.split(",")[1]], // starting position [lng, lat] 
    zoom: 9 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
    .setLngLat([geo_location.split(",")[0], geo_location.split(",")[1]])
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${campground_title}</h3>`
            )
    )
    .addTo(map);

