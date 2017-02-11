import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';
import { AUTH_USER, AUTH_ADMIN } from './actions/types';
import { Router, hashHistory } from 'react-router';
import Routes from './routes';
import './styles/style.scss';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers)
const token = localStorage.getItem('yeah_token');
const isAdmin = localStorage.getItem('isAdmin');

// <Route path="/secret" component= {RequireAuth(Secret)} />
// if we have a token, consider the user to be signed in
if (token && isAdmin=='false') {
  store.dispatch({type: AUTH_USER})
}
if (token && isAdmin=='true') {
  store.dispatch({type: AUTH_ADMIN})
}
ReactDOM.render(
  <Provider store={store}>
    <Router history={ hashHistory } routes={Routes}>
    </Router>
  </Provider>
  , document.getElementById('app'));
