import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { load as loadAuth } from './actions/auth';
import {
  App,
  Home,
  Login,
  Dashboard,
  List,
  Post,
  NotFound
} from './containers';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace(null, '/login');
      }
      cb();
    }

    function isAuthLoaded(state) {
      return state.auth && state.auth.loaded;
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path='/' component={App}>

      { /* Routes requiring login */ }


      <IndexRoute component={Home}/>

      { /* Routes */ }
      <Route path='login' component={Login}/>

      <Route path='dashboard' component={Dashboard}/>

      <Route path='create' component={Post}/>

      <Route path='edit/:id' component={Post}/>

      { /* Catch all route */ }
      <Route path='*' component={NotFound} status={404}/>
    </Route>
  );
};
