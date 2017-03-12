import React, { Component } from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import HomeRoute from './homeRoute';
import AuthRoute from './authRoute';
import DashboardRoute from './dashboardRoute';
import CourseRoute from './courseRoute';
import AboutRoute from './aboutRoute';
import IncubatorRoute from './incubatorRoute';
import AcceleratorRoute from './acceleratorRoute';

const RouteComponent = [
    HomeRoute,
    AuthRoute,
    DashboardRoute,
    CourseRoute,
    AboutRoute,
    IncubatorRoute,
    AcceleratorRoute
]

export default RouteComponent;