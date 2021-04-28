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

    // let location = { lat, long }
    console.log(location)
    axios
        .put('/api/user/', { location })
        .then(user => {
            console.log(user)
        })
        .catch(err => console.log(err))
}

const whiteHeart = '\u2661';
const blackHeart = '\u2665';
const button = document.querySelectorAll('.like');
console.log(button);
button.forEach(elm => {
    elm.addEventListener('click', toggle);

    function toggle() {
        const like = elm.textContent;
        if (like == whiteHeart) {
            elm.textContent = blackHeart;
        } else {
            elm.textContent = whiteHeart;
        }
    }
})

