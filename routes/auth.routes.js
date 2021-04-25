const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const bcrypt = require("bcrypt")
const bcryptSalt = 10

const mongoose = require('mongoose')

const { localUpload } = require('../config/file-upload.config')
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
router.post('/sign-up', localUpload.single('userImage'), (req, res) => {

    const { email, password, name, description, dateOfBirth, favoriteCuisines, userImage } = req.body

    console.log('Objeto file de Multer:', req.file)

    User
        .findOne({ email })
        .then(user => {

            if (user) {
                res.render('pages/auth/signup', { errorMessage: 'User already registered' })
                return
            }

            if (email.length === 0 || password.length === 0 || name.length === 0 || description.length === 0 || dateOfBirth.length === 0 || userImage.length === 0) {
            res.render('pages/auth/signup', { errorMessage: 'Please fill all the fields' })
            return
            }

            if (password.length < 6) {
            res.render('pages/auth/signup', { errorMessage: 'Please use a longer password' })
            return
            }

            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User
                .create({ email, password: hashPass, name, description, dateOfBirth, favoriteCuisines, userImage })
                .then(() => res.redirect('/auth'))
                .catch(err => console.log('error', err))
        })
        .catch(err => console.log('error', err))
})



module.exports = router