const express = require('express')
const User = require('../models/user.model')
const router = express.Router()
const { isAdmin, isCurrentUser, isNotCurrentUser, getAge } = require('./../utils')
const { isLoggedIn } = require('./../middlewares')
const { CDNupload } = require('../config/file-upload.config')


// Welcome page (GET)
router.get('/', isLoggedIn, (req, res) => {

        User
        .find(req.session.currentUser)
        .then(user => res.render('pages/users/index', {user}))
        .catch(err => console.log('Error:', err))
    
})

// Endpoints
router.get('/list', isLoggedIn, (req, res) => {

    User
        .find()
        .sort({ createdAt: -1 })
        .then(users => {
            res.render('pages/users/user-list', { users })
        })
        .catch(err => console.log(err))
})

router.get('/:id', isLoggedIn, (req, res) => {


    User
        .findById(req.params.id)
        .then(user => {
            let userAge = getAge(user.birthDay)
            console.log(userAge)
            res.render('pages/users/profile', { user, userAge, isCurrentUser: isCurrentUser(req.params.id, req.session.currentUser), isNotCurrentUser: isNotCurrentUser(req.params.id, req.session.currentUser), isAdmin: isAdmin(req.session.currentUser) })
        })
        .catch(err => console.log(err))
})

router.get('/edit/:id', isLoggedIn, (req, res) => {

    User
        .findById(req.params.id)
        .then(user => {
            res.render('pages/users/edit-profile', user)
        })
        .catch(err => console.log(err))
})

router.post('/edit/:id', CDNupload.single('userImage'), isLoggedIn, (req, res) => {

    const { email, name, description, birthDay, favoriteCuisines }  = req.body
    const { path } = req.file
    const userImage = { path }

    if (email.length === 0 || name.length === 0 || description.length === 0 || birthDay.length === 0 || userImage.length === 0) {
    res.render('pages/auth/signup', { errorMessage: 'Please fill all the fields' })
    return
    }

    User
        .findByIdAndUpdate(req.params.id, { email, name, description, birthDay, favoriteCuisines, userImage })
        .then(user => res.redirect(`/users/${user._id}`))
        .catch(err => console.log(err))
})

router.get('/delete/:id', isLoggedIn, (req, res) => {
    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.render('pages/index'))
        .catch(err => console.log(err))

})

module.exports = router