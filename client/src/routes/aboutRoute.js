import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';

import About from '../components/home/about';

const AboutRoute = {
    path: '/about',
    component: About
}

export default AboutRoute;