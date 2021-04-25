// User model development
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: String,
    password: String,
    name: String,
    description: String,
    dateOfBirth: Date,
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
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER'
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User
