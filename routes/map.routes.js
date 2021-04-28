const express = require('express')
const User = require('../models/user.model')
const router = express.Router()
const { isLoggedIn } = require('./../middlewares')

// Endpoints
router.get('/', isLoggedIn, (req, res) => {
    console.log(req.body)

    User
        .find(req.session.currentUser)
        .then(user => res.render('pages/map/index', { user }))
        .catch(err => console.log('Error:', err))
})


module.exports = router