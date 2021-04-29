const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: String,
    password: String,
    name: String,
    description: String,
    birthDay: Date,
    userImage: {
        path: String
    },
    favoriteCuisines: [{
        type: String,
    }],
    favoriteRestaurants: [{
        name: { type: String },
        rating: { type: Number },
        location: {
            lat: { type: Number },
            lng: { type: Number }
        },
        photoSearch: { type: Array },
        user_ratings: { type: Number },
        address: { type: String }
    }],
    restaurantAppointments: [{
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
    }],
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    location: {
        lat: {
            type: Number,
        },
        long: {
            type: Number
        }
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User
