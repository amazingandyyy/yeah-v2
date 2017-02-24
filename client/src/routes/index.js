import React, { Component } from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import HomeRoute from './homeRoute';
import AuthRoute from './authRoute';
import DashboardRoute from './dashboardRoute';
import CourseRoute from './courseRoute';
import InternshipRoute from './internshipRoute';
import VolunteerRoute from './volunteerRoute';
import Course from '../components/course';
import Banking from '../components/course/banking';
import Start from '../components/dashboard/start';

import loginGuard from '../components/auth/loginGuard';

const RouteComponent = [
    HomeRoute,
    AuthRoute,
    DashboardRoute,
    CourseRoute
]

export default RouteComponent;