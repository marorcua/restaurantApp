const express = require('express')
const router = express.Router()

const User = require('./../models/user.model')

// http://localhost:3000/api/user
router.get('/user', (req, res) => {

    User
        .find(req.session.currentUser)
        .then(user => res.json(user))
        .catch(err => console.log('Error:', err))
})


module.exports = router