import React, {Component} from 'react';
import {Route, IndexRoute} from 'react-router';

import Catalog from '../components/course/catalog';
import { publicWrapper } from './wrappers';

import Banking from '../components/course/banking';
import Webdev from '../components/course/webdev';
import Workshop from '../components/course/workshop';
import Consulting from '../components/course/consulting';
import Datasci from '../components/course/datasci';

const CourseRoute = () => {
  return {
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
            getComponent(location, cb) {
              System
                .import ('../components/course/catalog')
                .then(module => {
                  return cb(null, publicWrapper(module.default, 'fixed'))
                })
            }
          }, {
            path: '/course/banking',
            getComponent(location, cb) {
              System
                .import ('../components/course/banking')
                .then(module => {
                  return cb(null, publicWrapper(module.default, 'inverse'))
                })
            }
          }, {
            path: '/course/workshop',
            getComponent(location, cb) {
              System
                .import ('../components/course/workshop')
                .then(module => {
                  return cb(null, publicWrapper(module.default, 'inverse'))
                })
            }
          }, {
            path: '/course/webdev',
            getComponent(location, cb) {
              System
                .import ('../components/course/webdev')
                .then(module => {
                  return cb(null, publicWrapper(module.default, 'inverse'))
                })
            }
          },{
            path: '/course/datasci',
            getComponent(location, cb) {
              System
                .import ('../components/course/datasci')
                .then(module => {
                  return cb(null, publicWrapper(module.default, 'inverse'))
                })
            }
          }, {
            path: '/course/consulting',
            getComponent(location, cb) {
              System
                .import ('../components/course/consulting')
                .then(module => {
                  return cb(null, publicWrapper(module.default, 'inverse'))
                })
            }
          }, {
            path: '/course/:id',
            getComponent(location, cb) {
              System
                .import ('../components/course/general')
                .then(module => cb(null, publicWrapper(module.default, 'inverse')))
            }
          }
    ]
  }
}

export default CourseRoute;