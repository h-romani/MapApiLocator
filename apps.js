

let map = L.map('map', {
    layers: MQ.mapLayer(),
    center: [40.7128, -74.0060],
    zoom: 10
});


navigator.geolocation.getCurrentPosition(function(position){

    map.remove(); 

    map = L.map('map', {
        layers: MQ.mapLayer(),
        center: [position.coords.latitude,position.coords.longitude],
        zoom: 12
    });

});



    function direction(start, end) {
        
        
        map = L.map('map', {
            layers: MQ.mapLayer(),
            center: [40.7128,-74.0060],
            zoom: 12
        });
        
        var dir = MQ.routing.directions();

        dir.route({
            locations: [
                start,
                end
            ]
        });
    

        CustomRouteLayer = MQ.Routing.RouteLayer.extend({
            createStartMarker: (location) => {
                var custom_icon;
                var marker;

                custom_icon = L.icon({
                    iconUrl: 'png/1.png',
                    iconSize: [30, 40],
                    iconAnchor: [10, 29],
                    popupAnchor: [0, -29]
                });

                marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);

                return marker;
            },

            createEndMarker: (location) => {
                var custom_icon;
                var marker;

                custom_icon = L.icon({
                    iconUrl: 'png/2.png',
                    iconSize: [30, 40],
                    iconAnchor: [10, 29],
                    popupAnchor: [0, -29]
                });

                marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);

                return marker;
            }
        });
        
        map.addLayer(new CustomRouteLayer({
            directions: dir,
            fitBounds: true
        })); 
    }
  

function submitForm(event) {

    event.preventDefault();

    map.remove();

    start = document.getElementById("origin").value;
    end = document.getElementById("destination").value;

    direction(start, end);

    document.getElementById("location-search").reset();
}

const form = document.getElementById('location-search');

form.addEventListener('submit', submitForm);