// Initialize env variable
require('dotenv').config();

// import packages
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import config from './config';
import cors from 'cors';
import path from 'path';

let MONGOURI= config.mongo_uri;;
let MONGOLOG= config.mongo_log;

// MongoDB Setup
if (!config.jwt_secret || !process.env.JWT_SECRET) {
  console.error('No jwt secret. MongoDB is not connected');
} else {
  mongoose
    .connect(MONGOURI, err => {
      console.log(err || `DB Connected to ${MONGOLOG}`);
    });
  mongoose.Promise = global.Promise;
}

// Execute express and setting up the server
const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Import routes
import api from './api';
// API starts from here
app.use('/api', api);

// Run React front-end files(start from index.html)
if (config.enviroment !== 'production') {
    const webpackMiddleware = require('webpack-dev-middleware');
    const webpack = require('webpack');
    const webpackConfig = require('../../webpack.config.js');

    app.use(webpackMiddleware(webpack(webpackConfig)));
} else {
    app.use(express.static('./client/dist'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/dist', 'index.html'))
    })
}

app.use((err, req, res, next) => {
  res.status(422).send({ errors: err.message });
});

app.listen(process.env.PORT || 8000, err => console.log(err || `Listening on ${process.env.PORT || 'PORT: 8000' }`));