const express = require('express')
const router = express.Router()
var mongoose = require('mongoose');

const axios = require("axios")
const { RSA_NO_PADDING } = require('constants')
const User = require('../models/user.model')
const Restaurant = require('../models/restaurant.model')
const { isLoggedIn } = require('./../middlewares')
const Appointment = require('../models/appointment.model')

// Endpoints
router.get('/', isLoggedIn, (req, res) => {
    res.render('pages/places/search')
})


router.get('/favorites', isLoggedIn, (req, res) => {
    const { _id } = req.session.currentUser
    console.log(req.session.currentUser)
    User
        .findById(_id)
        .populate('favoriteRestaurants')
        .then(user => {
            const restaurants = user.favoriteRestaurants
            res.render('pages/places/results', { restaurants })
        })
        .catch(err => console.log(err))
})

router.post('/favorites', isLoggedIn, (req, res) => {
    const { data } = req.body
    const { _id } = req.session.currentUser
    console.log(req.session.currentUser);
    const { location, name, rating, photoSearch, user_ratings, address } = data
    console.log(location, name, rating)

    Restaurant
        .findOne({ name })
        .then(restaurant => {
            if (restaurant) {
                //res.render('pages/auth/signup', { errorMessage: 'Email already registered' })
                return restaurant
            }
            return Restaurant
                .create({ location, name, rating, photoSearch, user_ratings, address })
                .then(response => {
                    return response
                }).catch(err => console.log(err))

        })
        .then(response => {
            const { _id } = req.session.currentUser
            console.log('the rseponse is ', typeof req.session.currentUser.favoriteRestaurants[0], _id);
            let restaurantId = response._id
            restaurantId = mongoose.Types.ObjectId(restaurantId).toString()
            console.log(restaurantId, typeof restaurantId);
            return User
                .find({ _id: req.session.currentUser._id, 'favoriteRestaurants': restaurantId })
                .then(user => {
                    console.log('the user found is', user)
                    return (user.length > 0) ? null : User.findByIdAndUpdate(req.session.currentUser._id, { $push: { favoriteRestaurants: restaurantId } })
                })
                .then(response => {
                    return console.log(response)
                })
                .catch(err => console.log(err))
        })
        .then(user => {
            console.log(user)

        })

        .catch(err => console.log(err))
})
router.get('/join', isLoggedIn, (req, res) => {
    const { _id } = req.session.currentUser
    Appointment
        .find()
        .populate('restaurants')
        .populate('user')
        .then(appointments => {
            console.log(appointments);
            let restaurants = appointments.map(elm => elm.restaurants[0])
            let user = appointments.map(elm => elm.user)
            let appointmentId = appointments.map(elm => elm.id)
            res.render('pages/places/appointments', { appointments })
        })
        .catch(err => console.log(err))
})

router.get('/join/:id', isLoggedIn, (req, res) => {
    const { _id } = req.session.currentUser
    const { id: restId } = req.params

    Appointment
        .create({ restaurants: restId, user: _id })
        .then(() => {
            res.redirect('/places/join')
        })
        .catch(err => console.log(err))
})


router.get('/favorites/delete/:id', isLoggedIn, (req, res) => {
    const { _id } = req.session.currentUser
    const { id: restId } = req.params
    console.log(restId);

    User
        .findByIdAndUpdate(_id,
            { $pull: { 'favoriteRestaurants': restId } })
        .then(response => {
            console.log(response)
            res.redirect('/places/favorites')
        })
        .catch(err => console.log(err))

})

router.get('/appointment/delete/:id', isLoggedIn, (req, res) => {
    const { _id } = req.session.currentUser
    const { id: appointmentId } = req.params

    Appointment
        .findByIdAndDelete(appointmentId)
        .then(response => {
            console.log(response)
            res.redirect('/places/join')
        })
        .catch(err => console.log(err))

})


module.exports = router
