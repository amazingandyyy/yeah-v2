import React, { Component } from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import HomeRoute from './homeRoute';
import AuthRoute from './authRoute';
import DashboardRoute from './dashboardRoute';
import CourseRoute from './courseRoute';
import InternshipRoute from './internshipRoute';
import VolunteerRoute from './volunteerRoute';

const RouteComponent = [
    HomeRoute,
    AuthRoute,
    DashboardRoute,
    CourseRoute,
    InternshipRoute,
    VolunteerRoute
]

export default RouteComponent;