import _ from 'lodash';
import { createActions, handleActions } from 'redux-actions';

import icecream from '../icecream.json';

const COLORS = [
  '#f67088',
  '#d58c31',
  '#a39f31',
  '#4fb031',
  '#34ae90',
  '#36aab5',
  '#3ba3ec',
  '#ba82f4',
  '#f563d3',
];

const linearInitialData = _.sortBy(icecream, (point) => point.liking_texture)
  .map((point, index) => ({
    x: point.liking_texture,
    y: point.overall,
    color: COLORS[index],
    index,
  }));

const initialState = {
  linear: {
    data: linearInitialData,
  },
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
        linear: {
          data: Object.assign(state.linear.data.slice(),
                              { [index]: {...point, color: COLORS[index]} }),
        },
      });
    },
  },
  initialState,
);
