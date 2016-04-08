import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import compression from 'compression';
import mongoose from 'mongoose';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import React from 'react';
import ReactDOM from 'react-dom/server';
import qs from 'query-string';
import { match } from 'react-router';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import createHistory from 'react-router/lib/createMemoryHistory';
import { Provider } from 'react-redux';
import createStore from './stores/createStore';
import ApiClient from './utils/ApiClient';
import assets from './utils/assets';
import getRoutes from './routes';
import config from './configs/server';
import Html from './components/Html';

mongoose.connect(config.mongo.data, (err)=> {
  if (err) {
    console.log('connection error', err);
  } else {
    console.log('connection successful');
  }
});

const server = express();

// view engine setup
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'jade');
server.use(compression());
server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
server.use(cookieParser());
server.use(cors());
server.use(favicon(path.join(__dirname, '/public/images/favicon.ico')));
server.use(config.virtualPath + '/static', express.static(path.join(__dirname, 'public')));
server.use(config.virtualPath + '/static', (req, res) => {
  res.render('error', {status: 404, stack: 'no such file'});
});


server.use((req, res) => {
  const client = new ApiClient(req);
  const history = createHistory(req.originalUrl);
  const store = createStore(history, client);
  // Note that req.url here should be the full URL path from
  // the original request, including the query string.
  match({history, routes: getRoutes(store), location: req.originalUrl}, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error));
      res.render('error', {status: 500, stack: error.message});
    } else if (renderProps) {

      loadOnServer({...renderProps, store, helpers: {client}})
        .then(() => {
          console.log('not complete')
          const component = (
            <Provider store={store} key="provider">
              <ReduxAsyncConnect {...renderProps} />
            </Provider>
          );
          res.status(200);
          global.navigator = {userAgent: req.headers['user-agent']};
          let htmlString = ReactDOM.renderToString(<Html assets={assets} component={component} store={store}/>);
          res.send('<!doctype html>\n' + htmlString);
        })
        .catch((err) => {
          res.render('error', {status: 500, stack: err.message});
        });
    } else {
      res.render('error', {status: 404, stack: 'Not found'});
    }
  });
});

module.exports = server;