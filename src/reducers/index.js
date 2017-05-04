import { combineReducers } from 'redux';
import linear from './linear';
import polynomial from './polynomial';
import trainingError from './trainingError';

export default combineReducers({
  linear,
  polynomial,
  trainingError,
});
