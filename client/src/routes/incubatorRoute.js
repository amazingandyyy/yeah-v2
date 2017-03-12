import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';

import Incubator from '../components/home/incubator';

const IncubatorRoute = {
    path: '/incubator',
    component: Incubator
}

export default IncubatorRoute;