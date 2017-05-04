/**
 * Section on linear regression.
 */
import _ from 'lodash';
import Flexbox from 'flexbox-react';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import DataMatrix from '../components/DataMatrix';
import Equation from '../components/Equation';
import Katex from '../components/Katex';
import Regression from '../Regression';
import RegressionChart from '../components/RegressionChart';
import { actions } from '../reducers/linear';

class Linear extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    reg: PropTypes.object.isRequired,

    dispatch: PropTypes.func.isRequired,
    onPointDrop: PropTypes.func.isRequired,
  };

  render() {
    const firstPoint = this.props.data[0];
    const [slope, intercept] = this.props.reg.coef();

    const interceptEqn = `${intercept > 0 ? '+' : ''} ${intercept}`;

    const samplePredictEqn = `
      \\text{Predicted Rating}
      = ${slope} \\cdot 5.0 ${interceptEqn}
      = ${_.round(slope * 5.0 + intercept, 2)}
    `;

    const firstPrediction = _.round(this.props.reg.predict(firstPoint.x), 2);
    const firstPredictionEqn = `
      \\text{Predicted Rating} =
      ${slope} \\cdot \\color{${firstPoint.color}}{${firstPoint.x}}
      ${interceptEqn}
      = ${firstPrediction}`;

    const firstError = _.round(Math.pow(firstPrediction - firstPoint.y, 2), 2);
    const firstErrorEqn = `
      e = (\\hat{y} - y)^2
      = (${firstPrediction} - ${firstPoint.y})^2
      = ${firstError}`;

    const costEqn = `
      J(a, b) = \\frac{1}{n} \\sum_i (y_i - \\hat{y}_i)^2
      = \\frac{1}{n} \\sum_i (y_i - (ax_i + b))^2
    `;

    return (
      <section>
        <h2>What is regression?</h2>
        <p>
          In this tutorial, we're going to learn about regression, one of the
          the most important concepts in machine learning. Simply stated,
          regression allows us to take some data and make predictions for
          future data.
        </p>

        <p>
          Let's suppose we want to figure out whether a new ice cream flavor
          will be popular. Here, we have some data on past ice cream flavors.
          Each point is a flavor. The x-axis shows how highly the ice cream
          texture was rated. The y-axis shows how the highly the flavor was
          rated overall.
        </p>

        <p>
          It's pretty obvious that the higher the texture rating, the higher
          the overall rating. We want to fit a line to the data to show that.
          Regression chooses the best line for us. Try dragging the points
          around and see how the regression line changes!
        </p>

        <Flexbox justifyContent="space-between">
          <RegressionChart
            title="Simple Linear Regression"
            xLabel="Texture Rating"
            yLabel="Overall Rating"
            width={400}
            height={400}
            axisBounds={{
              x: { min: 4, max: 7.5 },
              y: { min: 3.5, max: 7 },
            }}
            data={this.props.data}
            regression={this.props.reg}
            onPointDrop={this.props.onPointDrop}
          />
          <DataMatrix data={this.props.data} col="x" />
          <DataMatrix data={this.props.data} col="y" />
        </Flexbox>

        <Equation
          eqn={this.props.reg.equation()}
          xName="Texture"
          yName="Predicted rating"
        />

        <p>
          That equation above is our <em>regression line</em>. We can use it to
          make predictions for data we haven't seen before. For example, if I
          gave you a ice cream that someone rated a
          {' '} <Katex math="5.0" inline /> for texture, you would say, "I
          predict that the overall rating for this ice cream is:"
        </p>

        <Katex math={samplePredictEqn} />

        <p>
          How do we find that regression line? Here's the basic idea. The best
          line is the one that goes as close to the points as possible. How far
          away is the line from our first data point? Well, our prediction for
          the first data point is:
        </p>

        <Katex math={firstPredictionEqn} />

        <p>
          Let's call our prediction <Katex math="\hat{y}" inline />, so we have
          the prediction
          {' '}
          <Katex math={`\\hat{y} = ${firstPrediction}`} inline /> {' '}
          and the actual value <Katex math={`y = ${firstPoint.y}`} inline />.
        </p>

        <p>
          Then, let's define the error <Katex math={firstErrorEqn} inline />.
          This gives us a way to measure how far off the line is from the first
          point. The higher the error, the further away the line is from the
          point. Notice that we take the square of the difference so that the
          error is always non-negative. So, to measure how well our line is
          doing, we can just find the mean error which we'll call the
          <em> cost</em>:
        </p>

        <Katex math={costEqn} />

        <p>
          That scary-looking equation just means: "For every choice of slope
          and intercept, I'm going to have some cost". So, we can try a bunch
          of slopes and intercepts until we find the combination that have the
          least cost. That's essentially what regression does, using an
          algorithm called
          {' '}
          <a href="https://spin.atomicobject.com/2014/06/24/gradient-descent-linear-regression/">
            gradient descent
          </a>
          .
        </p>
      </section>
    );
  }
}

const mapStateToProps = state => state.linear;
const mapDispatchToProps = dispatch => {
  return {
    onPointDrop: (index, point) =>
      dispatch(actions.linear.setDatum(index, point)),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Linear);
