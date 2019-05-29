var map;
var position = [-26.0324, 28.0742];


function createMap() {
  var latlng = new google.maps.LatLng(position[0], position[1]);
  var diff = 0.0033;
  
  var options = {
    center: latlng,
    mapTypeId: 'terrain',
    zoom: 14
  };

  
  
  
  map = new google.maps.Map(document.getElementById('map'), options);
  
  var polygonCoordinates = [
    { lat: position[0] - diff, lng: position[1] - diff },
    { lat: position[0] + diff, lng: position[1] - diff },
    { lat: position[0] + diff, lng: position[1] + diff },
    { lat: position[0] - diff, lng: position[1] + diff },
  ];

  
  
  //==============AJAX POST REQUEST==========================
  
  
  function postRequest(){
    
    const toSend = {
      "message": "This is a test from AJAX POST REQUEST!!",
      "contacts": [
        {
         "id": 2,
         "userId": "mdamba",
         "emailAddress":"mabuda19@gmail.com",
         "phoneNumber": "+27799470795",
         "acknowledge": false
        }
      ]
    };
    
    const jsonString = JSON.stringify(toSend);
    console.log(jsonString);
    const xhr = new XMLHttpRequest();
    
    xhr.open("POST", "https://multi-notification-engine.herokuapp.com/multi-channel-alert/");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(jsonString);
    
  }  
  
  
  //==============AJAX POST REQUEST==========================
  
  
  var polygon = new google.maps.Polygon({
    map: map,
    paths: polygonCoordinates,
    strokeColor: 'blue',
    fillColor: 'blue',
    fillOpacity: 0.4,
    draggable: true,
    editable: true
  });
  
  var marker = new google.maps.Marker({
    position: latlng,
    map: map,
   // icon: 'pistol.png',
    draggable: true,
    editable: true,
    title: "9 mm pistol"
    //   title: "Latitude:"+position[0]+" | Longitude:"+position[1]
  });



 /* 
 google.maps.event.addListener(map, 'click', function(event) {
   var result = [event.latLng.lat(), event.latLng.lng()];
   transition(result);
  });
  */ 
  
  
  
  google.maps.event.addListener( marker, "dragend", function ( event ) {
    var lat, long;
    var InsideOrOutside;
    google.maps.geometry.poly.containsLocation(event.latLng, polygon) ? InsideOrOutside = 1 :  InsideOrOutside = 0;
    
    console.log( 'i am dragged' );
    lat = marker.getPosition().lat();
    long = marker.getPosition().lng();
    console.log( 'Lat: '+lat );
    console.log( 'Long: '+long );

    if (InsideOrOutside == 0){
      postRequest();
      console.log("The asset is OUTSIDE the polygon");
    }
    else {
      console.log("The asset is inside the polygon");
    }
  });
  
  
  
  google.maps.event.addListener(polygon.getPath(), 'set_at', function () {
    logArray(polygon.getPath());
  });
  google.maps.event.addListener(polygon.getPath(), 'insert_at', function () {
    logArray(polygon.getPath());
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
    //  moveMarker();
  }


  /*  
  function moveMarker() {
    position[0] += deltaLat;
    position[1] += deltaLng;
    var latlng = new google.maps.LatLng(position[0], position[1]);
    marker.setTitle("Latitude:" + position[0] + " | Longitude:" + position[1]);
    marker.setPosition(latlng);
    if (i != numDeltas) {
      i++;
      setTimeout(moveMarker, delay);
    }
  }
  */ 
  function logArray(array) {
    var vertices = [];
    
    for (var i = 0; i < array.getLength(); i++) {
      vertices.push({
        lat: array.getAt(i).lat(),
        lng: array.getAt(i).lng()
      });
    }
  //  console.log(vertices);
  }
}






