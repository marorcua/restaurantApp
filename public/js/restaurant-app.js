
document.getElementById("search").addEventListener("click", (event) => {
    const city = document.querySelector('#city').value
    const radius = document.querySelector('#radius').value
    const rankBy = document.querySelector('#rankBy').value
    const desdencingRadio = document.querySelector('#descending').checked
    const map = document.querySelector('#selectMap').checked

    event.preventDefault()

    dataInput = { city, radius, rankBy, desdencingRadio }


    axios
        .post('/places/info', { dataInput, map })
        .then(response => {
            console.log(response.data);
            let restaurants = response.data
            if (map) {
                (document.querySelector("#displayList")) ? document.querySelector("#displayList").parentNode.removeChild(document.querySelector("#displayList")) : null
                document.getElementById("map").style.display = "block"
                placesInMap(restaurants)
            }
            else {
                createList(restaurants)
                console.log(restaurants);
            }
        })
        .catch(err => console.log(err))
})


function createList(array) {
    console.log(array);
    document.getElementById("map").style.display = "none"
    let newElement = document.createElement("div")
    newElement.id = "displayList"
    newElement.className = "row justify-content-center"

    array.forEach(elm => {
        let block = `<div class="col-md-4">
        <h3>Name: ${elm.name}</h3>
        <button class="like">&#9825</button>
        <p>Price: ${elm.price}</p>
        <p>Rating: ${elm.rating}</p>
        <p>User ratings: ${elm.user_ratings}</p>
        <p>${elm.address}</p>
    </div>
    <div class="col-md-6">
        <img src="${elm.photoSearch}" alt="restaurant-photo">
    </div>`

        let referenceNode = document.querySelector("#radioDom")
        console.log(referenceNode);
        newElement.innerHTML += block
        referenceNode.parentNode.insertBefore(newElement, referenceNode.nextSibling)

    })
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

