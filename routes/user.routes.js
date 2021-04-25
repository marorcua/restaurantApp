const express = require('express')
const User = require('../models/user.model')
const router = express.Router()
const { isAdmin, isCurrentUser } = require('./../utils')

// Welcome page (GET)
router.get('/', (req, res) => {

        User
        .find(req.session.currentUser)
        .then(user => res.render('pages/users/index', {user}))
        .catch(err => console.log('Error:', err))
    
})

// Endpoints
router.get('/list', (req, res) => {

    User
        .find()
        .sort({ createdAt: -1 })
        .then(users => {
            res.render('pages/users/user-list', { users })
        })
        .catch(err => console.log(err))
})

router.get('/:id', (req, res) => {

    const { id } = req.params
    const profileId = id
    User
        .findById(id)
        .then(user => {
            console.log(id)
            console.log(req.session.currentUser._id)
            console.log(isCurrenUser(id, req.session.currentUser))
            res.render('pages/users/profile', { user, isCurrenUser: isCurrenUser(id, req.session.currentUser), isAdmin: isAdmin(req.session.currentUser) })
        })
        .catch(err => console.log(err))
})

router.get('/edit-profile/:id', (req, res) => {

    const { id } = req.params

    User
        .findById(id)
        .then(user => {
            console.log(user)
            res.render('pages/users/edit-profile', user)
        })
        .catch(err => console.log(err))
})

router.post('/edit-profile/:id', (req, res) => {
    console.log('hola');
    const { id } = req.params
    const { email, name, nationality, birthday, favoriteCuisines, userImage } = req.body

    console.log(id)
    console.log(req.body)

    User
        .findByIdAndUpdate(id, { email, name, nationality, birthday, favoriteCuisines, userImage })
        .then(user => {
            console.log(user)
            res.redirect(`/users/profile/${id}`)
        })
        .catch(err => console.log(err))
})

router.get('/delete/:id', (req, res) => {
    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.render('pages/index'))
        .catch(err => console.log(err))

})

module.exports = router