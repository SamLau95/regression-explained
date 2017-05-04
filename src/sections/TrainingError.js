/**
 * Section on using a validation set.
 */
import _ from 'lodash';
import Flexbox from 'flexbox-react';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { actions } from '../reducers/trainingError';
import { matrixMath } from '../components/DataMatrix';
import Equation from '../components/Equation';
import Katex from '../components/Katex';
import Regression from '../Regression';
import RegressionChart from '../components/RegressionChart';
import Spacer from '../layout/Spacer';

class TrainingError extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    linearReg: PropTypes.object.isRequired,
    polyReg2: PropTypes.object.isRequired,
    polyReg5: PropTypes.object.isRequired,
    polyReg10: PropTypes.object.isRequired,

    dispatch: PropTypes.func.isRequired,
    onPointDrop: PropTypes.func.isRequired,
  };

  render() {
    const clfs = {
      linear: this.props.linearReg,
      poly2: this.props.polyReg2,
      poly5: this.props.polyReg5,
      poly10: this.props.polyReg10,
    };

    const predictions = _.mapValues(clfs, clf =>
      this.props.data.map(p => ({
        yHat: clf.predict(p.x),
        color: p.color,
      })),
    );

    const costs = _.mapValues(clfs, (clf, type) =>
      clf.cost(predictions[type]),
    );

    const yVec = matrixMath(this.props.data, 'y');
    const matrixMaths = _.mapValues(predictions, pred =>
      matrixMath(pred, 'yHat', '\\hat{y}'),
    );

    const costMaths = _.mapValues(matrixMaths, (math, type) => `J =
      \\frac{1}{n} \\sum
      \\left(${yVec} - ${math} \\right)^2
      = ${costs[type]}
    `)

    return (
      <section>
        <h2>Error, Error on the Wall...</h2>
        <p>
          Perhaps the curve that has the least cost will give us the best
          results. Recall that we are still using the cost function we defined
          earlier:
        </p>

        <Katex math={'J = \\frac{1}{n} \\sum_i (y_i - \\hat{y}_i)^2'} />

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
            regression={this.props.linearReg}
            onPointDrop={this.props.onPointDrop}
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
            regression={this.props.polyReg2}
            onPointDrop={this.props.onPointDrop}
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
            regression={this.props.polyReg5}
            onPointDrop={this.props.onPointDrop}
          />
          <Katex math={costMaths.poly5} />
        </Flexbox>

        <p>
          Try tweaking the points to see if changing the points makes one type
          of regression better than another. You'll see that the degree 5
          polynomial consistently has the least error even though our intuition
          says it's not a great fit! Why is that the case?
        </p>

        <p>
          It turns out that as we increase the degree of our polynomial, we get
          lower and lower cost because the curve can wiggle through more
          points. In fact, if no two points share the same x-value and we use a
          degree 10 polynomial our error is always 0 because the curve can just
          wiggle through every single point!
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
            regression={this.props.polyReg10}
            onPointDrop={this.props.onPointDrop}
          />
          <Katex math={costMaths.poly10} />
        </Flexbox>

        <p>
          A degree 10 polynomial is clearly not great because just a small
          change in our data collection results in completely different
          predictions: this model lacks <em>robustness</em>. However, it always
          has the best error. How else can we figure out which type of
          regression is best?
        </p>
      </section>
    );
  }
}

const mapStateToProps = state => state.trainingError;
const mapDispatchToProps = dispatch => {
  return {
    onPointDrop: (index, point) =>
      dispatch(actions.trainingError.setDatum(index, point)),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrainingError);
