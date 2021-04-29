let map

function initMap() {

  map = new google.maps.Map(
    document.querySelector('#map'),
    { zoom: 16, center: { lat: 40.4183915, lng: -3.7086309 }, styles: mapStyles.users }
  )
  getUserPosition()
  getApiPlaces()
}

function getUserPosition() {
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(
            pos => {
                const position = { lat: pos.coords.latitude, lng: pos.coords.longitude }
                map.setCenter(position)
            },
            err => console.log('The user did not allow to access to his position', err)
        )
    } else console.error('YOU DO NOT HAVE ANY GEOLOCATOR')
}

function getApiPlaces() {

  axios
    .get('/api/users')
    .then(res => placesInMap(res.data))
    .catch(err => console.log('Error:', err))
}

function placesInMap(places) {

  places.forEach(elm => {

    const position = { lat: elm.location.lat, lng: elm.location.long }
    const label = elm.name
    const icon = {
      url: elm.userImage.path,
      labelOrigin: new google.maps.Point(25, -15),
      scaledSize: new google.maps.Size(50, 50),
    }
    var marker = new google.maps.Marker({ position, label, map, icon})
    
    const contentString =
    `<div class="profiles-box"><h2>${elm.name}</h2>${elm.description}<br><br><a href="/users/${elm._id}">Visit ${elm.name}'s profile</a></div>`
    
    const infowindow = new google.maps.InfoWindow({
    content: contentString,
    });

    marker.addListener('click', function() {
          map.setCenter(marker.getPosition());
          infowindow.open(map, marker)
        });

    const myoverlay = new google.maps.OverlayView();
     myoverlay.draw = function () {
         this.getPanes().markerLayer.id='markerLayer';
     };
     myoverlay.setMap(map);
  })
}