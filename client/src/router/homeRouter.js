import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Home from './components/home';

const HomeRouter = () => {
    return (
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
        </Route>
    )
}

export default HomeRouter;

