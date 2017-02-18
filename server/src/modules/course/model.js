import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import PointSchema from '../schemas/point';

// Define the model
const Schema = new mongoose.Schema({
  title: {
    type: String, 
    required: [true, 'Title is required']
  },
  instructor: {
    type: String
  },
  date: {
    type: String
  },
  time: {
    type: String
  },
  location: Object,
  geometry: PointSchema,
  description: {
    type: String
  },
  tags: [{
    type: String
  }],
  createBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  stories: [{
    participant: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    body: {
      type: String
    },
    createAt: {
      type: Number,
      default: Date.now()
    },
    photos: [{
      type: String
    }]
  }],
  createAt: {
    type: Number,
    default: Date.now()
  },
  participant:[{
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    checkedIn: {
      type: Boolean,
      required: true,
      default: false
    },
    checkedInAt: {
      type: Number
    },
    signedUpAt: {
      type: Number,
      default: Date.now()
    }
  }]
});

export default mongoose.model('Course', Schema);