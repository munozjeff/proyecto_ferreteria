
function initMap() {
var myLatLng = {lat: 3.448947303361889, lng: -76.5336763364615};


var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: myLatLng
});

var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Ferroelectricos y soluciones muñoz'
});
}