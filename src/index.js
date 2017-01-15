import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import './styles/style.scss';
import App from './components/app';
import Home from './components/home';
import Hack from './components/hack';
import Secret from './components/secret';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout'
import RequireAuth from './components/auth/require_auth';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers)
const token = localStorage.getItem('token');

// if we have a token, consider the user to be signed in
if (token) {
  store.dispatch({type: AUTH_USER})
}
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component= {App}>
        <IndexRoute component= {Hack} />
        <Route path="/hack" component= {Hack} />
        <Route path="/secret" component= {RequireAuth(Secret)} />
        <Route path="/signin" component= {Signin} />
        <Route path="/signup" component= {Signup} />
        <Route path="/signout" component= {Signout} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('app'));
