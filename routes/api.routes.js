const express = require('express')
const router = express.Router()

const User = require('./../models/user.model')

// http://localhost:3000/api/user
router.get('/user', (req, res) => {

    User
        .findById(req.session.currentUser)
        .then(user => res.json(user))
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
router.get('/users', (req, res) => {

    User
        .find()
        .then(users => res.json(users))
        .catch(err => console.log('Error:', err))
})

module.exports = router