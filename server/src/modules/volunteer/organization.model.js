const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

// Define the model
const Schema = new mongoose.Schema({
    orgName: {
        type: String,
        require: true
    },
    ownerships: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],
    authorized: {
        type: Boolean,
        default: false
    },
    createAt: {
        type: Number,
        default: Date.now()
    },
    events: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Event'
    }]
})

// Create the model class
module.exports = mongoose.model('Organization', Schema);