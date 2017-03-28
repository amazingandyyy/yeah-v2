import mongoose from 'mongoose';
import PointSchema from '../schemas/point';

// Define the model
const Schema = new mongoose.Schema({
  addedAt: {
    type: Number,
    default: Date.now()
  },
  createAt: String,
  position: String,
  title: String,
  time: String,
  location: {
      address: String,
      coord: {
          lng: String,
          lat: String
      }
  },
  organization: {
      name: String,
      url: String,
      introduction: String
  },
  duties: String,
  takeaways: [ String ],
  prerequisite: String,
  applyMethod: String,
  majors: String,
  interests: String,
  postedBy: {
      name: String,
      email: String
  },
  resource: String
});

export default mongoose.model('Volunteer', Schema);


// title: {
  //   type: String, 
  //   required: [true, 'Title is required']
  // },
  // organization: {
  //   type: String
  // },
  // date: {
  //   type: String
  // },
  // time: {
  //   type: String
  // },
  // location: {
  //   type: Object
  // },
  // geometry: PointSchema,
  // description: {
  //   type: String
  // },
  // tags: [{
  //   type: String
  // }],
  // college: {
  //   type: String
  // },
  // createBy: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'User',
  //   autopopulate: true
  // },
  // stories: [{
  //   participant: {
  //     type: mongoose.Schema.ObjectId,
  //     ref: 'User',
  //     autopopulate: true
  //   },
  //   body: {
  //     type: String
  //   },
  //   createAt: {
  //     type: Number,
  //     default: Date.now()
  //   },
  //   photos: [{
  //     type: String
  //   }]
  // }],
  // createAt: {
  //   type: Number,
  //   default: Date.now()
  // }