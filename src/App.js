import React, { Component } from 'react';

import RegressionChart from './components/RegressionChart';

export default class App extends Component {
  render() {
    return <main>
      <h1>Regression, Explained Visually</h1>
      <div className="author">
        <a href="http://www.samlau.me/" rel="author" target="_blank">
          by Sam Lau
        </a>
      </div>

      <section>
        <h2>What is regression?</h2>
        <p>
          In this tutorial, we're going to learn about regression, one of the
          the most important concepts in machine learning. TODO(sam): Finish
          this.
        </p>

        <RegressionChart />
      </section>
    </main>;
  }
}
