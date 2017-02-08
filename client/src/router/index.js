import React, { Component } from 'react';
import { Router, hashHistory } from 'react-router';

import HomeRouter from './homeRouter';
import AuthRouter from './authRouter';
import DashboardRouter from './dashboardRouter';

const RouterComponent = () => {
    return (
        <Router history={hashHistory}>
            <HomeRouter />
            <AuthRouter />
            <DashboardRouter />
        </Router>
    )
}

export default RouterComponent;