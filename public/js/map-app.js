let map

function initMap() {

  map = new google.maps.Map(
    document.querySelector('#map'),
    { zoom: 16, center: { lat: 40.4183915, lng: -3.7086309 }, styles: mapStyles.custom }
  )
  getCurrentUser()
}

function getCurrentUser() {
    axios
    .get('/api/user')
    .then(res => getUserDatas(res.data))
    .catch(err => console.log('Error:', err))
}

function getUserDatas(user) {
    const iconUrl = user[0].userImage

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(
            pos => drawIcon(pos.coords, iconUrl),
            err => console.log('The user did not allow to access to his position', err)
        )
    } else console.error('YOU DO NOT HAVE ANY GEOLOCATOR')
    
}



function drawIcon(coords, iconUrl) {
    const position = { lat: coords.latitude, lng: coords.longitude }
    map.setCenter(position)

    const icon = {
        url: iconUrl,
        scaledSize: new google.maps.Size(50, 50),
    }

    new google.maps.Marker({ position, map, icon, optimized: false })

    const myoverlay = new google.maps.OverlayView();
     myoverlay.draw = function () {
         this.getPanes().markerLayer.id='markerLayer';
     };
     myoverlay.setMap(map);
}



// 