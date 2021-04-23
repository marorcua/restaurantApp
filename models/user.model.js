// User model development
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: String,
    pwd: String,
    nationality: String,
    birthday: Date,
    pictureUrl: String
})

const User = mongoose.model('User', userSchema)

module.exports = User
