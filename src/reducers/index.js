import { combineReducers } from 'redux';
import linear from './linear';
import polynomial from './polynomial';

export default combineReducers({
  linear,
  polynomial,
});
