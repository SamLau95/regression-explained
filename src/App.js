import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import Linear from './sections/Linear';
import Polynomial from './sections/Polynomial';
import TrainingError from './sections/TrainingError';
import Validation from './sections/Validation';

import reducer from './reducers/index';

const store = createStore(reducer, composeWithDevTools());
if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers/index', () => {
    const nextRootReducer = require('./reducers/index');
    store.replaceReducer(nextRootReducer);
  });
}

export default class App extends Component {
  render() {
    return <Provider store={store}>
      <main>
        <div className="masthead">
          <h1 className="masthead__title">Regression, Explained Visually</h1>
          <div className="masthead__author">
            <a href="http://www.samlau.me/" rel="author" target="_blank">
              by Sam Lau
            </a>
          </div>
        </div>

        <Linear />
        <Polynomial />
        <TrainingError />
        <Validation />
      </main>
    </Provider>;
  }
}
