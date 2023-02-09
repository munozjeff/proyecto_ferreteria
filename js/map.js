
function initMap() {
var myLatLng = {lat: 2.4574702, lng: -76.6349537};

var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: myLatLng
});

var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
});
}