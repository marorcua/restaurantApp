module.exports = app => {
    app.locals.siteTitle = 'Restaurant app'
    app.locals.googleApi = process.env.GOOGLE_API
}