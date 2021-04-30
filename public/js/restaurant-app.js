document.getElementById("search").addEventListener("click", (event) => {
    const city = document.querySelector('#city').value
    const radius = document.querySelector('#radius').value
    const rankBy = document.querySelector('#rankBy').value
    const desdencingRadio = document.querySelector('#descending').checked
    const map = document.querySelector('#selectMap').checked

    event.preventDefault()

    dataInput = { city, radius, rankBy, desdencingRadio }


    axios
        .post('/api/places', { dataInput, map })
        .then(response => {
            let restaurants = response.data
            if (map) {
                (document.querySelector("#displayList")) ? document.querySelector("#displayList").parentNode.removeChild(document.querySelector("#displayList")) : null
                document.getElementById("restaurant-map").style.display = "block"
                placesInMap(restaurants)
            }
            else {
                createList(restaurants)
            }
        })
        .catch(err => console.log(err))
})


function createList(array) {
    (document.querySelector("#displayList")) ? document.querySelector("#displayList").parentNode.removeChild(document.querySelector("#displayList")) : null

    document.getElementById("restaurant-map").style.display = "none"
    let newElement = document.createElement("div")
    newElement.id = "displayList"
    newElement.className = "row justify-content-center"

    array.forEach(elm => {
        let block = `<div class="col-md-6 restaurant-list">
        <h3>${elm.name}</h3>
        <button class="like">&#9825</button>
        <p><b>Price:</b> ${elm.price}</p>
        <p><b>Rating:</b> ${elm.rating}</p>
        <p><b>User ratings:</b> ${elm.user_ratings}</p>
        <p>${elm.address}</p>
    </div>
    <div class="col-md-6 restaurant-list">
        <img src="${elm.photoSearch}" alt="restaurant-photo">
    </div><hr>`

        let referenceNode = document.querySelector("#radioDom")
        newElement.innerHTML += block
        referenceNode.parentNode.insertBefore(newElement, referenceNode.nextSibling)
    })
    heartButton(array)
}

const whiteHeart = '\u2661';
const blackHeart = '\u2665';
function heartButton(array) {
    const button = document.querySelectorAll('.like');

    button.forEach((elm, index) => {
        elm.addEventListener('click', event => {
            event.preventDefault()
            toggle(elm)
            let data = array[index]
            axios.post('/places/favorites', { data })
        });

    })

}

function toggle(elm) {
    const like = elm.textContent;
    if (like == whiteHeart) {
        elm.textContent = blackHeart;
    } else {
        elm.textContent = whiteHeart;
    }
}
