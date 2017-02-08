import React, { Component } from 'react';
import { Router, hashHistory } from 'react-router';

import HomeRouter from './homeRouter';
import AuthRouter from './authRouter';
import DashboardRouter from './dashboardRouter';
import TreasureRouter from './treasureRouter';

const RouterComponent = () => {
    return (
        <Router history={ hashHistory }>
            { HomeRouter }
            { AuthRouter }
            { DashboardRouter }
            { TreasureRouter }
        </Router>
    )
}
export default RouterComponent;