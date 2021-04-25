module.exports = app => {

    // Base URLS
    // app.use('/', require('./base.routes.js'))
    app.use('/users', require('./user.routes.js'))
    // app.use('/restaurant', require('./restaurant.routes.js'))
    app.use('/auth', require('./auth.routes.js'))

}