import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import SectionLinear from './SectionLinear';
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
        <h1>Regression, Explained Visually</h1>
        <div className="author">
          <a href="http://www.samlau.me/" rel="author" target="_blank">
            by Sam Lau
          </a>
        </div>

        <SectionLinear />
      </main>
    </Provider>;
  }
}
