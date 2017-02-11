import React, { Component } from 'react';
import { Router, hashHistory } from 'react-router';

import HomeRouter from './homeRouter';
import AuthRouter from './authRouter';
import DashboardRouter from './dashboardRouter';
import TreasureRouter from './treasureRouter';

import App from '../components/app';
import Home from '../components/home';

import Dashboard from '../components/dashboard';
import Start from '../components/dashboard/start';

const RouterComponent = [
    HomeRouter,
    DashboardRouter
]

export default RouterComponent;

// { AuthRouter }
// { DashboardRouter }
// { TreasureRouter }