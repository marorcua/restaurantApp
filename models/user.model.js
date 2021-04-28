const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please write your email']
    },
    password: String,
    name: {
        type: String,
        required: [true, 'Please write your name']
    },
    description: {
        type: String,
        required: [true, 'Please write a description']
    },
    birthDay: {
        type: String,
        required: [true, 'Please indicate your date of birth']
    },
    userImage: {
        path: String
    },
    favoriteCuisines: [{type: String}],
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
