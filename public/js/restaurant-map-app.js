let map
let markersArray = []

function clearOverlays() {
    for (var i = 0; i < markersArray.length; i++) {
        markersArray[i].setMap(null);
    }
    markersArray.length = 0;
}


function placesInMap(places) {
    clearOverlays()
    // marker.setMap(null)
    places.forEach(elm => {
        const position = elm.location
        const title = elm.name
        const marker = new google.maps.Marker({
            title,
            position,
            map,
            icon: {
                path:
                    "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
                fillColor: "blue",
                fillOpacity: 0.6,
                scale: 2,
            }

        })
        const contentString = `<h3>Name: ${title}</h3>
          <h4><b>Rating: ${elm.rating}</b></h4> 
          <p>Location: ${elm.address}</p>`

        const infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        marker.addListener("click", () => {
            infowindow.open(map, marker);
        });
        markersArray.push(marker)

    })

    map.setCenter(getUserPosition())
}


function initMap() {

    map = new google.maps.Map(
        document.querySelector('#map'),
        { zoom: 16, center: { lat: 40.4183915, lng: -3.7086309 }, styles: mapStyles.restaurant }
    )
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
