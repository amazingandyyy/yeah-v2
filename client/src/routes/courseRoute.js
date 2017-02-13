import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';

const CourseRoute = {
    path: '/course',
    childRoutes: [
        {
            path: '/course/:id',
            getComponent(location, cb) {
                System.import ('../components/course/detail')
                .then(module => cb(null, module.default))
            }
        }
    ]
}

export default CourseRoute;