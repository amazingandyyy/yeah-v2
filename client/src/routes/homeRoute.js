import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../components/app';
import Home from '../components/home';

const HomeRoute = {
    path: '/',
    component: App,
    indexRoute: { component: Home }
}

export default HomeRoute;