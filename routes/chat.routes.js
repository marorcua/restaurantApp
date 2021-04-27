const express = require('express')
const router = express.Router()
var hbs = require('hbs')
const { isLoggedIn } = require('./../middlewares')
hbs.registerHelper('dateFormat', require('handlebars-dateformat'))

const Chat = require('../models/chat.model')

// Chat list page (GET)
router.get('/', isLoggedIn, (req, res) => {

    const senderPromise = Chat.find({firstSender: req.session.currentUser._id}).sort({ updatedAt: -1 }).populate('firstReceiver')
    const receiverPromise = Chat.find({firstReceiver: req.session.currentUser._id}).sort({ updatedAt: -1 }).populate('firstSender')

    Promise.all([senderPromise, receiverPromise])
        .then(results => res.render('pages/chat/chat-list', {sentMessage: results[0], receivedMessage: results[1]}))
        .catch(err => console.log(err))
})

// Create a chat (GET)
router.get('/:id', isLoggedIn, (req, res) => {

    Chat
        .findById(req.params.id)
        .populate('firstReceiver')
        .populate('firstSender')
        .populate('conversation.writer')
        .then(chat => res.render('pages/chat/chat-individual', {chat}))
        .catch(err => console.log('Error:', err))
})

// Create a chat (POST)
router.post('/:id', isLoggedIn, (req, res) => {
    const firstSender = req.session.currentUser._id
    const firstReceiver = req.params.id
    const conversation = []

    Chat
        .findOne(
            { $or: [
                { $and: [{'firstSender':  req.session.currentUser._id}, {'firstReceiver': req.params.id}] },
                { $and: [{'firstReceiver':  req.session.currentUser._id}, {'firstSender': req.params.id}] }
            ]})
        .then(chat => {
            console.log(chat)
            if(chat) {
                res.redirect(`/chat/${chat._id}`)
            } else {
                Chat
                    .create({ firstSender, firstReceiver, conversation})
                    .then(chat => {
                        res.redirect(`/chat/${chat.id}`)
                    })
                    .catch(err => console.log('Error:', err))
            }
        })
})

// Send a message (POST)
router.post('/conversation/:id', isLoggedIn, (req, res) => {
    const { message }  = req.body
    const writer = req.session.currentUser._id
    const dateSent = new Date()

    const messageSent = { message, writer, dateSent}

    Chat
        .findByIdAndUpdate(req.params.id, { $push: { conversation: messageSent }})
        .then(() => res.redirect(`/chat/${req.params.id}`))
        .catch(err => console.log('Error:', err))

})

module.exports = router