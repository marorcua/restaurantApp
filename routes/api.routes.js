const express = require('express')
const router = express.Router()
const axios = require("axios")

const { isLoggedAPI } = require('./../middlewares')

const User = require('./../models/user.model')

// http://localhost:3000/api/user
router.get('/user', isLoggedAPI, (req, res) => {

    User
        .findById(req.session.currentUser._id)
        .then(user => {
            console.log(user);
            res.json(user)
        })
        .catch(err => console.log('Error:', err))
})

router.put('/user', (req, res) => {
    const { location } = req.body
    User
        .findByIdAndUpdate(req.session.currentUser._id, { location }, { new: true })
        .then(user => {
            res.json(user)
        })
        .catch(err => console.log('Error:', err))
})

// http://localhost:3000/api/users
router.get('/users', isLoggedAPI, (req, res) => {

    User
        .find()
        .then(users => res.json(users))
        .catch(err => console.log('Error:', err))
})

router.post('/places', (req, res) => {
    const { location } = req.session.currentUser
    console.log(req.session.currentUser);

    const { city, radius, rankBy, desdencingRadio } = req.body.dataInput
    const map = req.body.map
    console.log(map);

    let searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?key=${process.env.GOOGLE_API}`


    let newUrl = searchUrl.concat(`&query=restaurants+${city}`)

    if (radius !== "") {
        newUrl = newUrl.concat("&radius=" + radius + "@" + location.lat + "," + location.long)
    } else if (rankBy === "Distance" || rankBy === "Select") {
        newUrl = newUrl.concat("&rankby=" + distance + "&location=" + location.lat + "," + location.long)
    }
    else if (city === "") {
        newUrl = newUrl.concat("&location=" + location.lat + "," + location.long)
    }

    console.log(newUrl)

    axios
        .get(newUrl)
        .then(response => {
            const result = response.data.results
            //console.log(result)

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
            console.log(rankBy)
            if (rankBy === "distance" || rankBy === "select") {
                return results
            } else {
                results.sort((a, b) => {
                    let firstItem = a[rankBy]
                    let secondItem = b[rankBy]

                    if (typeof firstItem === 'number' || firstItem === undefined) {
                        return (desdencingRadio === "ascending") ? firstItem - secondItem : secondItem - firstItem
                    } else {
                        return (desdencingRadio === "ascending") ? firstItem.localeCompare(secondItem) : secondItem.localeCompare(firstItem)
                    }
                })

                return results
            }
        })
        .then(results => res.json(results))
        .catch(err => console.log(err))
})



module.exports = router