import React, {Component} from 'react';
import {Route, IndexRoute} from 'react-router';

import Catalog from '../components/course/catalog';
// import loginGuard from '../components/auth/loginGuard';

import Banking from '../components/course/banking';
import Webdev from '../components/course/webdev';
import Workshop from '../components/course/workshop';
import Consulting from '../components/course/consulting';

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
          path: '/course/workshop',
          component: Workshop
        }, {
          path: '/course/webdev',
          component: Webdev
        }, {
          path: '/course/consulting',
          component: Consulting
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