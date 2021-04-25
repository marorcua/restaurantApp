// User model development
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: String,
    pwd: String,
    name: String,
    nationality: String,
    birthday: Date,
    profilePicture: {
        type: Schema.Types.ObjectId,
        ref: 'Picture',
    },
    favoriteCuisines: [{
        type: String,
    }],
    favoriteRestaurants: [{
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
      }],
    restaurantAppointments: [{
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
      }],
})

const User = mongoose.model('User', userSchema)

module.exports = User
