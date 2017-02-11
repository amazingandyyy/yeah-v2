import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';

const VolunteerRoute = {
    path: '/volunteer',
    childRoutes: [
        {
            path: '/volunteer/:id',
            getComponent(location, cb) {
                System
                .import ('../components/volunteer/detail')
                .then(module => cb(null, module.default))
            }
        }
    ]
}

export default VolunteerRoute;