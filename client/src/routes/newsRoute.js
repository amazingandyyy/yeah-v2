import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';

import News from '../components/home/news';

const IncubatorRoute = {
    path: '/news',
    component: News
}

export default IncubatorRoute;