import express from 'express';
import path from 'path';

const app = express();

app.get('/api', (req, res) => res.send({message: 'api work!'}));

if (process.env.NODE_ENV !== 'production') {
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

app.listen(process.env.PORT || 3050, () => console.log('Listening on PORT:3050'));