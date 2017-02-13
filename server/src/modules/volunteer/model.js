import mongoose from 'mongoose';
import PointSchema from '../schemas/point';

// Define the model
const Schema = new mongoose.Schema({
  title: {
    type: String, 
    required: [true, 'Title is required']
  },
  organization: {
    type: String
  },
  date: {
    type: String
  },
  time: {
    type: String
  },
  location: {
    type: Object
  },
  geometry: PointSchema,
  description: {
    type: String
  },
  tags: [{
    type: String
  }],
  college: {
    type: String
  },
  createBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    autopopulate: true
  },
  stories: [{
    participant: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      autopopulate: true
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
  }
});


export default mongoose.model('Volunteer', Schema);