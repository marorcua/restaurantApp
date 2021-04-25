// User model development
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: String,
    password: String,
    name: String,
    nationality: String,
    birthday: Date,
    userImage: String,
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
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User
