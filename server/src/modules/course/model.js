import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import PointSchema from '../schemas/point';

// Define the model
const Schema = new mongoose.Schema({
  // title: {
  //   type: String, 
  //   required: [true, 'Title is required']
  // },
  // instructor: {
  //   type: String
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
    heighlight1:{
      type: String
    },
    heighlight2:{
      type: String
    },
    heighlight3:{
      type: String
    },
    heighlight4:{
      type: String
    },
    heighlight5:{
      type: String
    },
    heighlight6:{
      type: String
    },
    hoursPerWeek:{
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
      type: String      
    },
    preRequisites:{
      type: String      
    },
    schoolAffiliation:{
      type: String      
    },
    syllabus:{
      type: String      
    },
    takeaway1:{
      type: String      
    },
    takeaway2:{
      type: String      
    },
    takeaway3:{
      type: String      
    },
    takeaway4:{
      type: String      
    },
    takeaway5:{
      type: String      
    },
    textbook:{
      type: String      
    },
    title:{
      type: String      
    },
    weeks:{
      type: String      
    }
});

export default mongoose.model('Course', Schema);