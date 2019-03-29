$(document).ready(function () {
 
    var list1 = document.getElementById('firstList');
     
    list1.options[0] = new Option('--Select--', '');
    list1.options[1] = new Option('Theft/Burglary/Robbery', 'Theft/Burglary/Robbery', 'Theft/Burglary/Robbery');
    list1.options[2] = new Option('Traffic related', 'Traffic related', 'Traffic related');
    list1.options[3] = new Option('Destruction of propery', 'Destruction of propery', 'Destruction of propery');
    list1.options[4] = new Option('Drug related', 'Drug related', 'Drug related');
    list1.options[5] = new Option('Animal related', 'Animal related', 'Animal related');
    list1.options[6] = new Option('Abuse', 'Abuse', 'Abuse');
    list1.options[7] = new Option('Minor suspicious activity', 'Minor suspicious activity', 'Minor suspicious activity');
    list1.options[8] = new Option('Other', 'Other', 'Other');
    });

    function getTypeName(){
 
        var list1 = document.getElementById('firstList');
        var list2 = document.getElementById("secondList");
        var list1SelectedValue = list1.options[list1.selectedIndex].value;
         
        if (list1SelectedValue=='Theft/Burglary/Robbery')
        {
             
            list2.options.length=0;
            list2.options[0] = new Option('--Select--', '');
            list2.options[1] = new Option('Theft', 'Theft');
            list2.options[2] = new Option('Burglary', 'Burglary');
            list2.options[3] = new Option('Robbery', 'Robbery');
            list2.options[4] = new Option('Other', 'Other');
             
        }
        else if (list1SelectedValue=='Traffic related')
        {
             
            list2.options.length=0;
            list2.options[0] = new Option('--Select--', '');
            list2.options[1] = new Option('Reckless driving', 'Reckless driving');
            list2.options[2] = new Option('Driving under influence', 'Driving under influence');
            list2.options[3] = new Option('Suspicious pirates', 'Suspicious pirates');
            list2.options[4] = new Option('Other', 'Other');

        }

        else if (list1SelectedValue=='Destruction of propery')
        {
             
            list2.options.length=0;
            list2.options[0] = new Option('--Select--', '');
            list2.options[1] = new Option('Arson', 'Arson');
            list2.options[2] = new Option('Vandalizing', 'Vandalizing');
            list2.options[3] = new Option('Other', 'Other');
                        
        }

        else if (list1SelectedValue=='Drug related')
        {
             
            list2.options.length=0;
            list2.options[0] = new Option('--Select--', '');
            list2.options[1] = new Option('Producing substances', 'Producing substances');
            list2.options[2] = new Option('Selling substances', 'Selling substances');
            list2.options[3] = new Option('Selling alcohol to minors', 'Selling alcohol to minors');
            list2.options[4] = new Option('Drunk/Intoxicated person', 'Drunk/Intoxicated person');
            list2.options[5] = new Option('Other', 'Other');
                        
        }

        else if (list1SelectedValue=='Animal related')
        {
             
            list2.options.length=0;
            list2.options[0] = new Option('--Select--', '');
            list2.options[1] = new Option('Animal abuse', 'Animal abuse');
            list2.options[2] = new Option('Illigal animal/animal part import', 'Illigal animal/animal part import');
            list2.options[3] = new Option('Arangement of animal fight/race', 'Arangement of animal fight/race');
            list2.options[4] = new Option('Other', 'Other');
                        
        }

        else if (list1SelectedValue=='Abuse')
        {
             
            list2.options.length=0;
            list2.options[0] = new Option('--Select--', '');
            list2.options[1] = new Option('Domestic violence', 'Domestic violence');
            list2.options[2] = new Option('Child abuse', 'Child abuse');
            list2.options[3] = new Option('Assault', 'Assault');
            list2.options[4] = new Option('Other', 'Other');
                        
        }

        else if (list1SelectedValue=='Minor suspicious activity')
        {
             
            list2.options.length=0;
            list2.options[0] = new Option('--Select--', '');
            list2.options[1] = new Option('Petty theft', 'Petty theft');
            list2.options[2] = new Option('Public disturbance', 'Public disturbance');
            list2.options[3] = new Option('Other', 'Other');
                        
        }
}
$('#myForm').on('submit', function (e) {
    $('#myModal').modal('show');
    e.preventDefault();
});

/*put map stuff here*/

var map;
let marker;
update();

function update() {
  var currentDate = new Date();
  var time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  var date = currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear();

  document.getElementById('date').value = date;
  document.getElementById('time').value = time;

  navigator.geolocation.getCurrentPosition(success, failure);
  function success(position) {
    var myLat = position.coords.latitude;
    var myLong = position.coords.longitude;

    position = [];
    position[0] = myLat;
    position[1] = myLong;

    document.getElementById('latitude').value = myLat;
    document.getElementById('longitude').value = myLong;



    var coords = new google.maps.LatLng(myLat, myLong);

    var mapOptions = {
      zoom: 16,
      center: coords,
    }

    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    let marker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      map: map,
      position: coords
    });

    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;

    geocodeLatLng(geocoder, map, infowindow, marker);

    function geocodeLatLng(geocoder, map, infowindow, marker) {
      geocoder.geocode({ 'location': coords }, function (results, status) {
        if (status === 'OK') {
          if (results[0]) {
            infowindow.setContent(results[0].formatted_address);
            infowindow.open(map, marker);
            document.getElementById('location').value = results[0].formatted_address;

            console.log(results[0].formatted_address);

          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });
    }

    google.maps.event.addListener(map, 'click', function (event) {
      var result = [event.latLng.lat(), event.latLng.lng()];
      transition(result);
      myLat = event.latLng.lat();
      myLong = event.latLng.lng();
      console.log(myLat);
      console.log(myLong);
      coords = new google.maps.LatLng(myLat, myLong);
      geocodeLatLng(geocoder, map, infowindow, marker);
      document.getElementById('latitude').value = myLat;
      document.getElementById('longitude').value = myLong;

    });

    var numDeltas = 100;
    var delay = 10; //milliseconds
    var i = 0;
    var deltaLat;
    var deltaLng;

    function transition(result) {
      i = 0;
      deltaLat = (result[0] - position[0]) / numDeltas;
      deltaLng = (result[1] - position[1]) / numDeltas;
      moveMarker();
    }


    function moveMarker() {
      position[0] += deltaLat;
      position[1] += deltaLng;
      var latlng = new google.maps.LatLng(position[0], position[1]);
      marker.setPosition(latlng);
      if (i != numDeltas) {
        i++;
        setTimeout(moveMarker, delay);
      }
    }

  };


  function failure() {
    $('body').innerHTML("<p>Failure</p>");
  }
}


function initialize() {
  var input = document.getElementById('location');
  var autocomplete = new google.maps.places.Autocomplete(input);
  google.maps.event.addListener(autocomplete, 'place_changed', function () {
    var place = autocomplete.getPlace();
    var currentDate = new Date();
    var month = currentDate.getMonth() + 1;
    var date = currentDate.getDate() + "/" + month + "/" + currentDate.getFullYear() + " " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();

    var myLat = place.geometry.location.lat();
    var myLong = place.geometry.location.lng();

    position = [];
    position[0] = myLat;
    position[1] = myLong;

    document.getElementById('latitude').value = myLat;
    document.getElementById('longitude').value = myLong;

    var coords = new google.maps.LatLng(myLat, myLong);

    var mapOptions = {
      zoom: 16,
      center: coords,
    }

    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    marker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      map: map,
      position: coords
    });

    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;

    geocodeLatLng(geocoder, map, infowindow, marker);

    function geocodeLatLng(geocoder, map, infowindow, marker) {
      geocoder.geocode({ 'location': coords }, function infoWindowAndAddress(results, status) {
        if (status === 'OK') {
          if (results[0]) {
            infowindow.setContent(results[0].formatted_address);
            infowindow.open(map, marker);
            document.getElementById('location').value = results[0].formatted_address;

            console.log(results[0].formatted_address);

          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });
    }

    google.maps.event.addListener(map, 'click', function (event) {
      var result = [event.latLng.lat(), event.latLng.lng()];
      transition(result);
      myLat = event.latLng.lat();
      myLong = event.latLng.lng();
      console.log(myLat);
      console.log(myLong);
      coords = new google.maps.LatLng(myLat, myLong);
      geocodeLatLng(geocoder, map, infowindow, marker);
      document.getElementById('latitude').value = myLat;
      document.getElementById('longitude').value = myLong;
    });

    var numDeltas = 100;
    var delay = 10; //milliseconds
    var i = 0;
    var deltaLat;
    var deltaLng;

    function transition(result) {
      i = 0;
      deltaLat = (result[0] - position[0]) / numDeltas;
      deltaLng = (result[1] - position[1]) / numDeltas;
      moveMarker();
    }


    function moveMarker() {
      position[0] += deltaLat;
      position[1] += deltaLng;
      var latlng = new google.maps.LatLng(position[0], position[1]);
      marker.setPosition(latlng);
      if (i != numDeltas) {
        i++;
        setTimeout(moveMarker, delay);
      }
    }
  });
}
google.maps.event.addDomListener(window, 'load', initialize);

/*-------------------*/

            var cloud = 'dfyxx5zdo'; // todo your cloud_name here!
            var preset= 'qsqog8rz'; // todo your upload_preset here!

            document.getElementById("upload").addEventListener("click", function() {
                cloudinary.openUploadWidget({ cloud_name: cloud, upload_preset: preset, multiple: false, resource_type: 'image', folder: 'test', form: 'form', field_name: 'picturecloudinary', thumbnails: '#thumbnail'},
                function(error, result) { console.log(error, result) });

                console.log('i was clicked');
            }, false);

function submitUserForm() {
    var response = grecaptcha.getResponse();
    console.log(response.length);
    if(response.length == 0) {
        document.getElementById('g-recaptcha-error').innerHTML = '<span style="color:red;">This field is required.</span>';
        return false;
        }
        return true;
    }

function verifyCaptcha() {
    console.log("verified");
    document.getElementById('g-recaptcha-error').innerHTML = '';
}