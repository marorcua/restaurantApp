const express = require('express')

const router = express.Router()
const { isLoggedIn } = require('./../middlewares')

const User = require('../models/user.model')

// Restaurant map (GET)
router.get('/map', isLoggedIn, (req, res) => {

    User
        .findById(req.session.currentUser)
        .then(user => res.render('pages/restaurants/restaurant-map', {user}))
        .catch(err => console.log('Error:', err))
})


module.exports = router