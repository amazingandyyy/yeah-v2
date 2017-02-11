import React, { Component } from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import HomeRoute from './homeRoute';
import AuthRoute from './authRoute';
import DashboardRoute from './dashboardRoute';
import CourseRoute from './courseRoute';
import InternshipRoute from './internshipRoute';
import VolunteerRoute from './volunteerRoute';

import App from '../components/app';
import Home from '../components/home';

import Dashboard from '../components/dashboard';
import Start from '../components/dashboard/start';

const RouteComponent = [
    HomeRoute,
    AuthRoute,
    DashboardRoute,
    CourseRoute,
    InternshipRoute,
    VolunteerRoute
]

export default RouteComponent;