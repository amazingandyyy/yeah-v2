import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import PointSchema from '../schemas/point';

// Define the model
const Schema = new mongoose.Schema({
  // title: {
  //   type: String, 
  //   required: [true, 'Title is required']
  // },
  // time: {
  //   type: String
  // }，
  // description: {
  //   type: String
  // },
  date: {
    type: String
  },
  location: Object,
  locationDetails: String,
  geometry: PointSchema,
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
  }],
  email:{
    type: String
  },
  companyAffiliation:{
    type: String
  },
  firstName:{
    type: String
  },
  heighlightTitle:[{
    type:String
  }],
  heighlightDescription:[{
    type:String      
  }],
  hoursPerWeek:{
    type: String      
  },
  instructor: {
  type: String
  },  
  lastName:{
    type: String      
  },
  linkedIn:{
    type: String
  },
  overview:{
    type: String
  },
  phoneNumber:{
    type: Number      
  },
  preRequisites:{
    type: String      
  },
  schoolAffiliation:{
    type: String      
  },
  isSyllabusSent:{
    type: Boolean      
  },
  takeaways:[{
    type:String
  }],
  textbook:{
    type: String      
  },
  title:{
    type: String      
  },
  howManyWeeks:{
    type: String      
  }
});

export default mongoose.model('Course', Schema);