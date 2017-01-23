var timeStamp = new Date().getTime();

// Initialize env variable
require('dotenv').config();

// import packages
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import config, {settingIsGood} from './config';
import cors from 'cors';
import path from 'path';
// Import routes
import api from './api';

if (settingIsGood) {
  console.log(`\------------------------ start node server (${timeStamp}) ------------------------`);
  let MONGOURI = config.mongo_uri;
  // MongoDB Setup
  if (!process.env.JWT_SECRET) {
    console.error('->No jwt secret. MongoDB is not connected!');
  } else {
    mongoose.connect(MONGOURI, err => {
      console.log(err || `->MongoDB Connected to ${config.mongo_log} \n->Webpack is loading... `);
    });
    mongoose.Promise = global.Promise;
  }

  // Execute express and setting up the server
  const app = express();
  app.use(cors());
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));

  // API starts from here
  app.use('/api', api);

  // Run React front-end files(start from index.html)
  if (process.env.NODE_ENV !== 'production') {
    app.use(express.static('./client/dist'));
    app.get('*', (req, res) => {
      const indexPath = path.join(__dirname, '../../client/dist', 'index.html');
      res.sendFile(indexPath);
    })
  } else {
    const webpackMiddleware = require('webpack-dev-middleware');
    const webpack = require('webpack');
    const webpackConfig = require('../../webpack.config.js');
    app.use(webpackMiddleware(webpack(webpackConfig)));
  }

  app.use((err, req, res, next) => {
    console.log(err.message)
    res
      .status(422)
      .send({errors: err.message});
  });

  app.listen(process.env.PORT || 8000, err => console.log(err || `->Listening on ${process.env.PORT || 'PORT: 8000'}`));
} else {
    console.log(`\------------------------ complete config setting to start the server ------------------------`);
}