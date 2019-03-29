var map;
var marker;

navigator.geolocation.getCurrentPosition(success, failure);

function success(position) {
    var myLat = position.coords.latitude;
    var myLong = position.coords.longitude;

    var coords = new google.maps.LatLng(myLat, myLong);

    var mapOptions = {
        zoom: 16,
        center: coords,
    }
 
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var marker = new google.maps.Marker({
        draggable: true,
        animation: google.maps.Animation.DROP, map: map, position: coords
    });

        marker.addListener('click', function toggleBounce() {
                  if (marker.getAnimation() !== null) {
                      marker.setAnimation(null);
                  } else {
                      marker.setAnimation(google.maps.Animation.BOUNCE);
                  }
        });
    
        //Attach click event handler to the map.
    google.maps.event.addListener(map, 'click', function (e) {
 
        //Determine the location where the user has clicked.
        var location = e.latLng;
 
        //Create a marker and placed it on the map.
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
 
        //Attach click event handler to the marker.
        google.maps.event.addListener(marker, "click", function (e) {
            var infoWindow = new google.maps.InfoWindow({
                content: 'Latitude: ' + location.lat() + '<br />Longitude: ' + location.lng()
            });
            infoWindow.open(map, marker);
        });
    });
    

}
function failure() {
    $('body').innerHTML("<p>Failure</p>");
}


function initialize() {
    var input = document.getElementById('searchTextField');
    var autocomplete = new google.maps.places.Autocomplete(input);
      google.maps.event.addListener(autocomplete, 'place_changed', function () {
          var place = autocomplete.getPlace();
          var currentDate = new Date();
          var month = currentDate.getMonth() + 1;
          var date = currentDate.getDate() + "/" + month + "/" + currentDate.getFullYear() + " " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();


          document.getElementById('city2').value = place.name;
          document.getElementById('cityLat').value = place.geometry.location.lat();
          document.getElementById('cityLng').value = place.geometry.location.lng();
          document.getElementById('time').value = "Time: " + date;


          var myLat = place.geometry.location.lat();
          var myLong = place.geometry.location.lng();


          var coords = new google.maps.LatLng(myLat, myLong);

          var mapOptions = {
              zoom: 16,
              center: coords,
          }

         map =  new google.maps.Map(document.getElementById('map'), mapOptions);

          marker = new google.maps.Marker({
              draggable: true,
              animation: google.maps.Animation.DROP, map: map, position: coords
          });

          marker.addListener('click', function toggleBounce() {
                  if (marker.getAnimation() !== null) {
                      marker.setAnimation(null);
                  } else {
                      marker.setAnimation(google.maps.Animation.BOUNCE);
                  }
          });

        
      });
  }
google.maps.event.addDomListener(window, 'load', initialize); 



  