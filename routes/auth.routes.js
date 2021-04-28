const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const bcryptSalt = 10

const { LogInBlocked } = require('./../middlewares')
const { getAge } = require('./../utils')

const { CDNupload } = require('../config/file-upload.config')

const mongoose = require('mongoose')
const User = require('./../models/user.model')

// Log in (GET)
router.get('/', LogInBlocked, (req, res) => res.render('pages/auth/login'))

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
router.get('/sign-up', (req, res) => {
    req.session.destroy()
    res.render('pages/auth/signup')
})

// Sign up (POST)
router.post('/sign-up', CDNupload.single('userImage'), (req, res) => {


    if(req.file == undefined ) {
        res.render('pages/auth/signup', { errorMessage: 'Please upload an image' })
        return
    }

    const { email, password, name, description, birthDay, favoriteCuisines} = req.body
    const location = {lat: 40.4169019, long: -3.7056721}
    const { path } = req.file
    const userImage = { path }
    const userAge = getAge(birthDay)

    if (userAge < 18 ) {
        res.render('pages/auth/signup', { errorMessage: 'You must be 18 years or older to use this app' })
        return
    }

    User
        .findOne({ email })
        .then(user => {
            if (user) {
                res.render('pages/auth/signup', { errorMessage: 'Email already registered' })
                return
            }
            if (password.length === 0) {
                res.render('pages/auth/signup', { errorMessage: 'Please write a password' })
                return
            }
            if (password.length < 6 ) {
                res.render('pages/auth/signup', { errorMessage: 'Please write a longer password' })
                return
            }

            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User
                .create({ email, password: hashPass, name, description, birthDay, favoriteCuisines, userImage, location })
                .then(() => res.redirect('/auth'))
                .catch(err => {
                    if (err instanceof mongoose.Error.ValidationError) {
                        res.render('pages/auth/signup', { errorMongoose: err.errors })
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