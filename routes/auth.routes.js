const express = require('express')
const router = express.Router()

// Log in (GET)
router.get('/', (req, res) => res.render('pages/auth/login'))

// Log in (POST)
router.post('/', (req, res) => {

    const { username, password } = req.body

    User
        .findOne({ username })
        .then(user => {

            if (username.length === 0 || password.length === 0) {
            res.render('pages/auth/login', { errorMessage: 'Please fill all the fields' })
            return
            }

            if (!user) {
                res.render('pages/auth/login', { errorMessage: 'User not found' })
                return
            }

            if (bcrypt.compareSync(password, user.password) === false) {
                res.render('pages/auth/login', { errorMessage: 'Incorrect password' })
                return
            }

            req.session.currentUser = user
            res.redirect('/map')
        })
        .catch(err => console.log('error', err))
})

module.exports = router