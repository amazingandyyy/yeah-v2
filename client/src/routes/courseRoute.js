import React, {Component} from 'react';
import {Route, IndexRoute} from 'react-router';

import Course from '../components/course';
import Catalog from '../components/course/catalog';
import Banking from '../components/course/banking';
import loginGuard from '../components/auth/loginGuard';

const CourseRoute = {
  path: '/course',
  getComponent(location, cb) {
    System
      .import ('../components/course')
      .then(module => cb(null, module.default))
  },
  indexRoute: {
    component: Catalog
  },
  childRoutes: [
        {
          path: '/course/catalog',
          component: Catalog
        }, {
          path: '/course/banking',
          component: Banking
        }, {
          path: '/course/:id',
          getComponent(location, cb) {
            System
              .import ('../components/course/general')
              .then(module => cb(null, module.default))
          }
        }
  ]
}

export default CourseRoute;