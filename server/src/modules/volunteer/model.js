import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

// Define the model
const Schema = new mongoose.Schema({
  title: {
    type: String, 
    required: [true, 'Title is required']
  },
  createBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    autopopulate: true
  },
  createAt: {
    type: Number,
    default: Date.now()
  }
});

Schema.plugin(autopopulate);

export default mongoose.model('Volunteer', Schema);