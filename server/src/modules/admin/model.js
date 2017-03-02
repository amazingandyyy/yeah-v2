import mongoose from 'mongoose';

// Define the model
const Schema = new mongoose.Schema({
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            unique: true
        },
        createAt: {
            type: Number,
            default: Date.now()
        }
    });

export default mongoose.model('Admin', Schema);