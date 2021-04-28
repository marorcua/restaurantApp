getLocation()
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getLocationInfo);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
function getLocationInfo(position) {
    console.log(position.coords.latitude, position.coords.longitude)
    const location = { lat: position.coords.latitude, long: position.coords.longitude }
    console.log(location)
    axios
        .put('/api/user/', { location })
        .then(user => {
            console.log(user)
        })
        .catch(err => console.log(err))
}