const express = require('express')
const User = require('../models/user.model')
const router = express.Router()

// Endpoints
router.get('/', (req, res) => {

    User
        .find(req.session.currentUser)
        .then(user => res.render('pages/map/index', {user}))
        .catch(err => console.log('Error:', err))
})


module.exports = router