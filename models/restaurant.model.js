// Restaurant model development
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
    name: { type: String },
    rating: { type: Number },
    location: {
        lat: { type: Number },
        lng: { type: Number }
    },
    photoSearch: { type: Array },
    user_ratings: { type: Number },
    address: { type: String }

})

restaurantSchema.index({ location: '2dsphere' })

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

module.exports = Restaurant
