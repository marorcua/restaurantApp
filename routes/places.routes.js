const express = require('express')
const router = express.Router()

const axios = require("axios")
const { RSA_NO_PADDING } = require('constants')
const User = require('../models/user.model')
const { findByIdAndDelete } = require('../models/user.model')

// Endpoints
router.get('/', (req, res) => {
    res.render('pages/places/search')
})


router.get('/favorites', (req, res) => {
    const { _id } = req.session.currentUser
    User
        .findById(_id)
        .then(user => {
            console.log(user.favoriteRestaurants)
            const restaurants = user.favoriteRestaurants
            res.render('pages/places/results', { restaurants })
        })
        .catch(err => console.log(err))
})

router.post('/favorites', (req, res) => {
    const { data } = req.body
    const { _id } = req.session.currentUser
    console.log(data);
    const { location, name, rating, photoSearch, user_ratings, address } = data
    console.log(location, name, rating)

    User
        .findByIdAndUpdate(_id,
            { $push: { favoriteRestaurants: { location, name, rating, photoSearch, user_ratings, address } } },
            { new: true })
        .then(user => {
            console.log(user);
        })
        .catch(err => console.log(err))
})

router.get('/favorites/delete/:id', (req, res) => {
    const { _id } = req.session.currentUser
    const { id: restId } = req.params
    console.log(restId);
    User
        .findByIdAndUpdate(_id,
            { $pull: { favoriteRestaurants: { id: restId } } })
        .then(response => res.redirect('/places/favorites'))
        .catch(err => console.log(err))

})


module.exports = router
