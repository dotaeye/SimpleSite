import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { ReduxAsyncConnect } from 'redux-async-connect';
import getRoutes from './routes'
import createStore from './stores/createStore'
import ApiClient from './utils/ApiClient';
import useScroll from 'scroll-behavior/lib/useStandardScroll';


const client = new ApiClient();
const history = useScroll(() => browserHistory)();

const store = createStore(history, client, window.__data);

const component = (
  <Router render={(props) =>
        <ReduxAsyncConnect {...props} helpers={{client}} filter={item => !item.deferred} />
      } history={history}>
    {getRoutes(store)}
  </Router>
);

ReactDOM.render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  document.getElementById('main')
);
