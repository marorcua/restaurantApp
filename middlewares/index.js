module.exports = {
    customMiddleware: (req, res, next) => next(),
    isLoggedIn: (req, res, next) => {
    if (req.session.currentUser) {
        next()
    }
    else {
        res.render('pages/auth/login', { errorMessage: 'Please Log in' })
    }
    },
    LogInBlocked: (req, res, next) => {
    if (req.session.currentUser) {
        res.redirect('/users/')
    }
    else {
        next()
    }
    },
    isLoggedAPI: (req, res, next) => {
        if (req.session.currentUser) {
            next()
        }
        else {
            res.status(402).json({ message: 'Unauthorized' })
        }
    }
}