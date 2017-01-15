const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const autopopulate = require('mongoose-autopopulate');

// Define the model
const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    ownership: {
        type: mongoose.Schema.ObjectId,
        ref: 'Organization',
        default: null
    },
    time: {
        start: String,
        end: String
    },
    createAt: {
        type: Number,
        default: Date.now()
    },
})
Schema.plugin(autopopulate);

// Create the model class
module.exports = mongoose.model('Event', Schema);