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
    return (
      <Provider store={store}>
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

          <div>
            <h2>Conclusion</h2>

            <p>
              We've just gone through quite a bit of material. We started out
              with what regression is and why it's useful. We then discussed
              linear regression and the least squares cost. Polynomial regression
              came next, and we explored the behavior of varying the degree of
              the polynomial when fitted to the same data. We concluded with a
              discussion of training vs. validation error and why we use
              cross-validation to select our model.
            </p>

            <p>
              I hope this article was helpful to you! Feel free to check out the
              code <a href="https://github.com/SamLau95/regression-explained">
                on Github
              </a>
              {' '}
              and
              {' '}
              <a href="https://github.com/SamLau95/regression-explained/issues/new">
                leave an issue
              </a>
              {' '}
              with any comments or suggestions.
            </p>

            <p>
              This web app was created for the final project of
              {' '}
              <a href="https://people.eecs.berkeley.edu/~jrs/189/">
                UC Berkeley's Machine Learning class, CS289A
              </a>
              . The dataset for this article was taken from
              {' '}
              <a href="http://www.stat.ufl.edu/~winner/datasets.html">
                the great collection of David Winner
              </a>.
            </p>
          </div>
        </main>
      </Provider>
    );
  }
}
