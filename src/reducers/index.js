import { combineReducers } from 'redux';
import auth from './auth';
import error from './error';
import blog from './blog';
import { reducer as form } from 'redux-form';
import { routeReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect} from 'redux-async-connect';

export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  auth,
  form,
  error,
  blog
});
