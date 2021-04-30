let map
let markersArray = []

function initMap() {

    map = new google.maps.Map(
        document.querySelector('#restaurant-map '),
        { zoom: 16, center: { lat: 40.4183915, lng: -3.7086309 }, styles: mapStyles.restaurant }
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
    const iconUrl = user.userImage.path

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
        scaledSize: new google.maps.Size(40, 40),
    }

    new google.maps.Marker({ position, map, icon })

    const myoverlay = new google.maps.OverlayView();
        myoverlay.draw = function () {
        this.getPanes().markerLayer.id='markerLayer';
        };
        myoverlay.setMap(map);
}

function clearOverlays() {
    for (var i = 0; i < markersArray.length; i++) {
        markersArray[i].setMap(null);
    }
    markersArray.length = 0;
}


function placesInMap(places) {
    clearOverlays()
    places.forEach(elm => {
        const position = elm.location
        const title = elm.name
        const icon = {
            url: '../img/restaurant-icon.png',
            scaledSize: new google.maps.Size(40, 40),
        }
        const marker = new google.maps.Marker({
            title,
            position,
            map,
            icon
        })
        const contentString = `<div class="profiles-box"><h2>${title}</h2>
          <h4><b>Rating: ${elm.rating}</b></h4> 
          <p>Location: ${elm.address}</p></div>`

        const infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        marker.addListener("click", () => {
            infowindow.open(map, marker);
        });
        markersArray.push(marker)
    })
}