module.exports = app => {

    // Base URLS
    app.use('/', require('./base.routes.js'))
    app.use('/users', require('./user.routes.js'))
    app.use('/map', require('./map.routes.js'))
    app.use('/api', require('./api.routes.js'))
    app.use('/auth', require('./auth.routes.js'))
    app.use('/places', require('./places.routes.js'))
}