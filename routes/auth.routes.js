const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const bcryptSalt = 10

const { CDNupload } = require('../config/file-upload.config')

const mongoose = require('mongoose')
const User = require('./../models/user.model')

// Log in (GET)
router.get('/', (req, res) => res.render('pages/auth/login'))

// Log in (POST)
router.post('/', (req, res) => {

    const { email, password } = req.body

    User
        .findOne({ email })
        .then(user => {

            if (email.length === 0 || password.length === 0) {
            res.render('pages/auth/login', { errorMessage: 'Please fill all the fields' })
            return
            }

            if (!email) {
                res.render('pages/auth/login', { errorMessage: 'Email not found' })
                return
            }

            if (bcrypt.compareSync(password, user.password) === false) {
                res.render('pages/auth/login', { errorMessage: 'Incorrect password' })
                return
            } 

            req.session.currentUser = user
            res.redirect('/users')
        })
        .catch(err => console.log('error', err))
})

// Sign up (GET)
router.get('/sign-up', (req, res) => res.render('pages/auth/signup'))

// Sign up (POST)
router.post('/sign-up', CDNupload.single('userImage'), (req, res) => {

    const { email, password, name, description, birthDay, favoriteCuisines} = req.body
    const location = {long: 40.4169019, lat: -3.7056721}
    const { path } = req.file
    const userImage = { path }

    User
        .findOne({ email })
        .then(() => {

            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User
                .create({ email, password: hashPass, name, description, birthDay, favoriteCuisines, userImage, location })
                .then(() => res.redirect('/auth'))
                .catch(err => {
                    if (err instanceof mongoose.Error.ValidationError) {
                        console.log(err.errors)
                        res.render('pages/auth/signup', { errorMessage: err.errors })
                    } else {
                        next()
                    }
                })
        })
        .catch(err => console.log('error', err))
})

// LOG OUT (POST)
router.get('/log-out', (req, res) => {
    req.session.destroy((err) => res.redirect("/"));
})



module.exports = router