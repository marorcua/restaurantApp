const express = require('express')
const router = express.Router()
const https = require('https')
const axios = require("axios")
const { RSA_NO_PADDING } = require('constants')
// Endpoints
router.get('/', (req, res) => {
    res.render('pages/places/search')
})


router.post('/', (req, res) => {
    const { location } = req.session.currentUser

    console.log(req.body.desdencingRadio);

    const { city, radius, rankBy, desdencingRadio } = req.body

    let searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?key=${process.env.GOOGLE_API}`


    let newUrl = searchUrl.concat(`&query=restaurants+${city}`)

    if (radius !== "") {
        newUrl = newUrl.concat("&radius=" + radius + "@" + location.lat + "," + location.long)
        // } else if (rankBy !== "") {
        //     newUrl = newUrl.concat("&rankby=" + rankBy + "&location=" + location.lat + "," + location.long)
    }
    else if (city === "") {
        newUrl = newUrl.concat("&location=" + location.lat + "," + location.long)
    }

    console.log(newUrl)

    axios
        .get(newUrl)
        .then(response => {
            const result = response.data.results

            return results = result.map(value => {
                const rating = value.rating
                const name = value.name
                const address = value.formatted_address
                const price = value.price_level
                const location = value.geometry.location //{lat,long}
                const user_ratings = value.user_ratings_total
                const photoSearch = (value.photos === undefined) ? null : value.photos.map(elm => {
                    const photoRef = elm.photo_reference
                    const searchPhoto = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&sensor=false&key=${process.env.GOOGLE_API}`
                    return searchPhoto
                })
                return { rating, name, address, price, location, user_ratings, photoSearch }
            })
        })
        .then(results => {

            return results.sort((a, b) => {
                let firstItem = a[rankBy]
                let secondItem = b[rankBy]
                console.log(typeof a.price);
                //return b[rankBy] - a[rankBy]
                if (typeof firstItem === 'number' || firstItem === undefined) {
                    if (desdencingRadio === "ascending") {
                        return firstItem - secondItem
                    } else {
                        return secondItem - firstItem
                    }
                } else {
                    if (desdencingRadio === "ascending") {
                        return firstItem.localeCompare(secondItem)
                    } else {
                        return secondItem.localeCompare(firstItem)
                    }
                }
            })
        })
        .then(results => {
            //console.log(results);
            res.json(results)
        })
})


module.exports = router
