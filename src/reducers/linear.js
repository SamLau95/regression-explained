import _ from 'lodash';
import { createActions, handleActions } from 'redux-actions';

import icecream from '../icecream.json';
import colors from '../colors';

import Regression from '../Regression';

const initialData = _.sortBy(
  icecream,
  point => point.liking_texture,
).map((point, index) => ({
  x: point.liking_texture,
  y: point.overall,
  color: colors[index],
  index,
}));

const initialReg = new Regression('linear').fit(initialData);

const initialState = {
  data: initialData,
  reg: initialReg,
};

export const actions = createActions({
  LINEAR: {
    SET_DATUM: (...args) => args,
  },
});

export default handleActions(
  {
    [actions.linear.setDatum]: (state, action) => {
      const [index, point] = action.payload;

      const data = Object.assign(state.data.slice(), {
        [index]: { ...point, color: colors[index] },
      })

      const reg = new Regression('linear').fit(data);

      return Object.assign({}, state, { data, reg });
    },
  },
  initialState,
);
