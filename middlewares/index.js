module.exports = {
    customMiddleware: (req, res, next) => next(),
    isLoggedIn: (req, res, next) => {
    if (req.session.currentUser) {
        next()
    }
    else {
        res.render('pages/auth/login', { errorMessage: 'Please Log in' })
    }
    }
}