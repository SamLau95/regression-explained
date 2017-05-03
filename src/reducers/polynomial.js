import _ from 'lodash';
import { createActions, handleActions } from 'redux-actions';

import icecream from '../icecream.json';
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

const initLinearReg = new Regression('linear').fit(
  initialData.map(p => [p.x, p.y]),
);
const initPolyReg2 = new Regression('polynomial', 2).fit(
  initialData.map(p => [p.x, p.y]),
);
const initPolyReg5 = new Regression('polynomial', 5).fit(
  initialData.map(p => [p.x, p.y]),
);

const initialState = {
  data: initialData,
  linearReg: initLinearReg,
  polyReg2: initPolyReg2,
  polyReg5: initPolyReg5,
};

export const actions = createActions({
  POLYNOMIAL: {
    SET_DATUM: (...args) => args,
  },
});

export default handleActions(
  {
    [actions.polynomial.setDatum]: (state, action) => {
      const [index, point] = action.payload;

      const data = Object.assign(state.data.slice(), {
        [index]: { ...point, color: colors[index] },
      });

      const linearReg = new Regression('linear').fit(data);
      const polyReg2 = new Regression('polynomial', 2).fit(data);
      const polyReg5 = new Regression('polynomial', 5).fit(data);

      return Object.assign({}, state, { data, linearReg, polyReg2, polyReg5 });
    },
  },
  initialState,
);
