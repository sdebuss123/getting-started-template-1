

var $markersArray=[];
 $(document).ready(function(){
  var marker;
  var geocoder = new google.maps.Geocoder();
  var myLatLng = new google.maps.LatLng(51.0486, -114.0708);
  var mapOptions = {
    center: myLatLng,
    zoom: 10,
    draggable: false,
    zoomControl: false,
    scaleControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeControl: false
  };
  var map =new google.maps.Map($("#map").get(0), mapOptions);
  var address = "2500 University Dr NW, Calgary, AB T2N 1N4";
  geocoder.geocode({address: address}, function(results,status){
  //Check if status is ok
  if(status==google.maps.GeocoderStatus.OK) {
    //add marker
    marker= new google.maps.Marker({
      position: results[0].geometry.location,
      map: map
    });
    $markersArray.push(marker);
    map.setCenter(results[0].geometry.location);
    map.setZoom(12);

    var infoWindow = new google.maps.InfoWindow({
      content: "<b>" + address +"</b>"
    });
    infoWindow.open(map, marker);
  } else {
    alert(status);
  }
});
if (navigator.geolocation){
  getCurrentLocation();
}else{
  alert("Geoloaction API not available in this browser");
}
});

function getCurrentLocation(){
  navigator.geolocation.getCurrentPosition(successCallBack, errorCallback, {timeout: 10000});

}
function successCallback(result){
  var lat = result.coords.latitude;
  var lng = result.coords.longitude;
  var myLatLng = new google.maps.LatLng (lat,lng);
  var mapOptions = {
    //center: myLatLng,
    //zoom: 10,
    draggable:false,
    zoomControl:false,
    scaleControl:false,
    scrollwheel:false,
    disableDoubleClickZoom:true,
    mapTypeControl:false
  };

  var map = new google.maps.Map($("#map").get(0),mapOptions);


var currentMarker = new google.maps.Marker({
  position: myLatLng,
  map: map,
  title: "My Current Location"
})
var marker,i;
var bounds = new google.maps.LatLngBounds();
for(i=0, i<$markersArray.length,i++){
  marker=new google,maps.Marker({
  position:$markersArray[i].position,
  map:map,
  title:$markersArray[i].title
});
var infowindow= new google.maps.infoWindow();
bounds.extend(,arker.getPosition());
google.maps.event.addListner(marker,'click'(function(marker,i){
  return function(){
    infowindow.setContent("<b>"+
  $markersArray[i].title+"<b>");
  infowindow.open(mao,marker);
  }
})(marker,1));
}
map.fitBounds(bounds);
}
//test github
function errorCallback(error){
  switch (error.code){
    case error.PERMISSION_DENIED:
      alert("User location permission denied");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("User location unavailable.");
      break;
    case error.PERMISSION_DENIED_TIMEOUT:
      alert ("User took too long.");
      break;
    case error.UNKNOWN_ERROR:
      alert("User an unknown error occured.");
      break;
    default:
      alert("An unknown error occured.");
      break;
  }
}
