/**
 * Section on polynomial regression.
 */
import _ from 'lodash';
import Flexbox from 'flexbox-react';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { actions } from '../reducers/polynomial';
import { matrixMath } from '../components/DataMatrix';
import Equation from '../components/Equation';
import Katex from '../components/Katex';
import LineChart from '../components/LineChart';
import Regression from '../Regression';
import RegressionChart from '../components/RegressionChart';
import Spacer from '../layout/Spacer';

class Validation extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    validation: PropTypes.array.isRequired,
    trainVsValid: PropTypes.array.isRequired,

    linearReg: PropTypes.object.isRequired,
    polyReg2: PropTypes.object.isRequired,
    polyReg5: PropTypes.object.isRequired,
    polyReg10: PropTypes.object.isRequired,
  };

  render() {
    const clfs = {
      linear: this.props.linearReg,
      poly2: this.props.polyReg2,
      poly5: this.props.polyReg5,
      poly10: this.props.polyReg10,
    };

    const predictions = _.mapValues(clfs, clf =>
      this.props.validation.map(p => ({
        yHat: clf.predict(p.x),
        color: '#333333',
      })),
    );

    const costs = _.mapValues(clfs, (clf, type) =>
      clf.cost(predictions[type]),
    );

    const yVec = matrixMath(this.props.validation, 'y');
    const matrixMaths = _.mapValues(predictions, pred =>
      matrixMath(pred, 'yHat', '\\hat{y}'),
    );

    const costMaths = _.mapValues(
      matrixMaths,
      (math, type) =>
        `J =
      \\frac{1}{n} \\sum
      \\left(${yVec} - ${math} \\right)^2
      = ${costs[type]}
    `,
    );

    const trainingLine = this.props.trainVsValid.map(p => [p.degree, p.train]);
    const validLine = this.props.trainVsValid.map(p => [p.degree, p.valid]);

    return (
      <section>
        <h2>Cross-Validation</h2>
        <p>
          In the previous section, we calculated the regression curve's error
          on the same data that it was trained on. This is known as the
          {' '} <em>training error</em>. We also noticed that the training
          error almost always goes down as the degree of the polynomial
          increases because the curve can wiggle through more points.
        </p>

        <p>
          To combat this, we typically separate out some data that we don't
          train the model on. This allows us to get a more accurate picture of
          how well the model actually does. Intuitively, this makes sense
          because we want to evaluate how well the model does on data it hasn't
          seen before rather than data it has. We call this held-out data the
          {' '} <em>validation set</em>.
        </p>

        <p>
          In this section you won't get to move around the points. The colored points are the training data,
          as usual. This time, we've added in some black points that are our
          validation set. You can click the labels right below the plots to
          toggle on/off the training / validation data. We also evaluate the
          {' '} <em>validation error</em>, the error on the validation set,
          instead of the training error.
        </p>

        <p>For linear regression:</p>

        <Flexbox>
          <RegressionChart
            title="Linear"
            xLabel="Sweetness"
            yLabel="Overall Rating"
            width={300}
            height={300}
            axisBounds={{
              x: { min: 0, max: 15 },
              y: { min: 3.5, max: 7 },
            }}
            data={this.props.data}
            validation={this.props.validation}
            regression={this.props.linearReg}
            dragEnabled={false}
          />
          <Katex math={costMaths.linear} />
        </Flexbox>

        <p>For polynomial regression with degree 2:</p>

        <Flexbox>
          <RegressionChart
            title="Polynomial degree 2"
            xLabel="Sweetness"
            yLabel="Overall Rating"
            width={300}
            height={300}
            axisBounds={{
              x: { min: 0, max: 15 },
              y: { min: 3.5, max: 7 },
            }}
            data={this.props.data}
            validation={this.props.validation}
            regression={this.props.polyReg2}
            dragEnabled={false}
          />
          <Katex math={costMaths.poly2} />
        </Flexbox>

        <p>For polynomial regression with degree 5:</p>

        <Flexbox>
          <RegressionChart
            title="Polynomial degree 5"
            xLabel="Sweetness"
            yLabel="Overall Rating"
            width={300}
            height={300}
            axisBounds={{
              x: { min: 0, max: 15 },
              y: { min: 3.5, max: 7 },
            }}
            data={this.props.data}
            validation={this.props.validation}
            regression={this.props.polyReg5}
            dragEnabled={false}
          />
          <Katex math={costMaths.poly5} />
        </Flexbox>

        <p>
          Cool! We now see that the lowest validation error does indeed
          correspond to the polynomial with degree 2. This lets us say with
          more confidence that the degree 2 polynomial is a better fit for our
          data.
        </p>

        <p>
          Just to make sure, here's the degree 10 polynomial's validation
          error.
        </p>

        <Flexbox>
          <RegressionChart
            title="Polynomial degree 10"
            xLabel="Sweetness"
            yLabel="Overall Rating"
            width={300}
            height={300}
            axisBounds={{
              x: { min: 0, max: 15 },
              y: { min: 3.5, max: 7 },
            }}
            data={this.props.data}
            validation={this.props.validation}
            regression={this.props.polyReg10}
            dragEnabled={false}
          />
          <Katex math={costMaths.poly10} />
        </Flexbox>

        <p>
          That's a huge validation error! This is a clear sign that a degree 10
          polynomial <em>overfits</em> our training data. Intuitively, this
          means that it tries to fit the random deviations in our data (by
          wiggling like crazy) instead of the actual underlying curve.
        </p>

        <p>
          In fact, this is a common pattern in machine learning. As our model
          gets more complex (eg. increasing the degree of the polynomial), the
          training error goes
          {' '}
          <em>down</em>
          {' '}
          while the validation error goes
          {' '}
          <em>down and then up</em>
          . The validation error goes down at first because a more
          complicated model can fit more complicated patterns in the data.
          It then increases because the model gets too complicated and starts
          overfitting.
        </p>

        <p>
          We've fitted polynomials up to degree 10. Then, we plot the training
          and validation errors at each degree to show this trend:
        </p>

        <Flexbox justifyContent="space-around">
          <LineChart
            title="Train and Validation Error vs. Degree"
            xLabel="Degree"
            yLabel="Error"
            width={400}
            height={400}

            axisBounds={{
              x: { min: 0, max: 11 },
              y: { min: 0, max: 1 },
            }}
            series={[
              {
                type: 'line',
                name: 'Training',
                data: trainingLine,
              },
              {
                type: 'line',
                name: 'Validation',
                data: validLine,
              }
            ]}
          />
        </Flexbox>

        <p>
          Looks like degree 2 is still our best bet! The process of using the
          validation set to choose a model is called <em>cross-validation</em>.
          Cross-validation is almost always used to pick models whether we're
          using regression or not, so it's an important term to know.
        </p>
      </section>
    );
  }
}

const mapStateToProps = state => state.validation;

export default connect(mapStateToProps)(Validation);
