import mongoose from 'mongoose';

// Define the model
const Schema = new mongoose.Schema({
    createAt: {
        type: Number,
        default: Date.now()
    },
    title: String,
    client: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    processes: [{
        processShema
    }]
});

const processShema = new mongoose.Schema({
    interview: {
        time: String,
        finished: {
            type: Boolean,
            default: false
        }
    },
    draft: [roundShema],
});

const roundShema = new mongoose.Schema({
    timestamp: String,
    actionBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    attachment: String,
    confirmed: {
        status: {
            type: String,
            enum: ['Pending', 'Receive', 'Decline']
        },
        timestamp: String,
        actionBy: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    }
});

export default mongoose.model('Task', Schema);