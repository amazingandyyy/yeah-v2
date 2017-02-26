import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import PointSchema from '../schemas/point';

const instructorSchema = new mongoose.Schema({
  email: String,
  previousPosition: {
    affiliation: String,
    position: String
  },
  firstName: String,
  lastName: String,
  currentPosition: {
    affiliation: String,
    position: String
  },
  phone: String,
  linkedinURL: String,
  imageURL: {
    type: String,
    default: ''
  }
})
const courseSchema = new mongoose.Schema({
  title: String,
  tags: [String],
  overview: String,
  startingDate: String,
  hoursPerWeek: Number,
  totalWeeks: Number,
  time: String,
  location: Object,
  locationNotes: String,
  geometry: PointSchema,
  textbook: String,
  syllabus: Boolean,
  heighlights: [{
    title: String,
    description: String
  }],
  takeaways: [String],
  preRequirement: String
})
const statusSchema = new mongoose.Schema({
  participant: [
    {
      userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      },
      checkedIn: {
        type: Boolean,
        default: false
      },
      checkedInAt: Number,
      signedUpAt: {
        type: Number,
        default: Date.now()
      }
    }
  ],
   started: {
     type: Boolean,
     default: false
   }
})
// Define the model
const Schema = new mongoose.Schema({
  course: courseSchema,
  instructor: instructorSchema,
  status: statusSchema,
  createBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  createAt: {
    type: Number,
    default: Date.now()
  }
});

export default mongoose.model('Course', Schema);