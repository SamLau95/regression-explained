import _ from 'lodash';
import { createActions, handleActions } from 'redux-actions';

import icecream from '../icecream.json';
import colors from '../colors';

const initialData = _.sortBy(
  icecream,
  point => point.liking_texture,
).map((point, index) => ({
  x: point.liking_texture,
  y: point.overall,
  color: colors[index],
  index,
}));

const initialState = {
  data: initialData,
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

      return Object.assign({}, state, {
        data: Object.assign(state.data.slice(), {
          [index]: { ...point, color: colors[index] },
        }),
      });
    },
  },
  initialState,
);
