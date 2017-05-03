import _ from 'lodash';
import { createActions, handleActions } from 'redux-actions';

import icecream from '../icecream.json';
import colors from '../colors';

const initialData = _.sortBy(
  icecream,
  point => point.sweetness,
).map((point, index) => ({
  x: point.sweetness,
  y: point.overall,
  color: colors[index],
  index,
}));

const initialState = {
  data: initialData,
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

      return Object.assign({}, state, {
        data: Object.assign(state.data.slice(), {
          [index]: { ...point, color: colors[index] },
        }),
      });
    },
  },
  initialState,
);
