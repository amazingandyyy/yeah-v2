import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

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
  location: {
    type: Object
  },
  description: {
    type: String
  },
  tags: [{
    type: String
  }],
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

Schema.plugin(autopopulate);

export default mongoose.model('Course', Schema);