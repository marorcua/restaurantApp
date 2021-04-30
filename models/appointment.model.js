const mongoose = require('mongoose')
const Schema = mongoose.Schema

const appointmentSchema = new Schema({
    restaurants: [{
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
}, {
    timestamps: true
})

const Appointment = mongoose.model('Appointment', appointmentSchema)

module.exports = Appointment
