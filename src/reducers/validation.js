import _ from 'lodash';
import { createActions, handleActions } from 'redux-actions';

import icecream from '../icecream.json';
import validation from '../validation.json';
import colors from '../colors';

import Regression from '../Regression';

const initialData = _.sortBy(
  icecream,
  point => point.sweetness,
).map((point, index) => ({
  x: point.sweetness,
  y: point.overall,
  color: colors[index],
  index,
}));

const trainVsValid = [
  { degree: 1, train: 0.32, valid: 0.62 },
  { degree: 2, train: 0.03, valid: 0.49 },
  { degree: 3, train: 0.02, valid: 0.51 },
  { degree: 4, train: 0.02, valid: 0.55 },
  { degree: 5, train: 0.02, valid: 0.61 },
  { degree: 6, train: 0.02, valid: 0.63 },
  { degree: 7, train: 0.02, valid: 0.88 },
  { degree: 8, train: 0.0, valid: 1.31 },
  { degree: 9, train: 0.0, valid: 9.26 },
  { degree: 10, train: 0.0, valid: 2814.47 },
]

const initLinearReg = new Regression('linear').fit(initialData);
const initPolyReg2 = new Regression('polynomial', 2).fit(initialData);
const initPolyReg5 = new Regression('polynomial', 5).fit(initialData);
const initPolyReg10 = new Regression('polynomial', 10).fit(initialData);

const initialState = {
  data: initialData,
  validation: validation,
  trainVsValid: trainVsValid,

  linearReg: initLinearReg,
  polyReg2: initPolyReg2,
  polyReg5: initPolyReg5,
  polyReg10: initPolyReg10,
};

export default handleActions({}, initialState);
