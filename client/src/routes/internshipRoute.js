import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';

const InternshipRoute = {
    path: '/internship',
    childRoutes: [
        {
            path: '/internship/:id',
            getComponent(location, cb) {
                System.import ('../components/internship/detail')
                .then(module => cb(null, module.default))
            }
        }
    ]
}

export default InternshipRoute;