const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatSchema = new Schema({
    conversation: [{
        message: String,
        writer: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        dateSent: Date
    }],
    firstSender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    firstReceiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true
})

const Chat = mongoose.model('Message', chatSchema)

module.exports = Chat