const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please write your email'],
        unique: [true, 'This email is already registered'],
        validate: {
            validator: function(email) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            },
            message: props => `${props.value} is not a valid email`
        }
    },
    password: {
        type: String,
        min: [6, 'Please write a longer password'],
        required: [true, 'Please write a password']
    },
    name: {
        type: String,
        max: [15, 'Please write a shorter name'],
        required: [true, 'Please write your name']
    },
    description: {
        type: String,
        max: [300, 'Please write a shorter description'],
        required: [true, 'Please write a description']
    },
    birthDay: {
        type: Date,
        required: [true, 'Please write your date of birth']
    },
    userImage: {
        path: String
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
