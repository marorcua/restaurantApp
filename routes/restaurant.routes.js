const express = require('express')
const User = require('../models/user.model')
const router = express.Router()
const { isLoggedIn } = require('./../middlewares')

// Endpoints
router.get('/map', isLoggedIn, (req, res) => {

    User
        .findById(req.session.currentUser)
        .then(user => res.render('pages/restaurants/restaurant-map', {user}))
        .catch(err => console.log('Error:', err))
})


module.exports = router