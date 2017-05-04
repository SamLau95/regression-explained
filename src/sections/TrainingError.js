/**
 * Section on using a validation set.
 */
import _ from 'lodash';
import Flexbox from 'flexbox-react';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { actions } from '../reducers/trainingError';
import DataMatrix, { matrixMath } from '../components/DataMatrix';
import Equation from '../components/Equation';
import Katex from '../components/Katex';
import Regression from '../Regression';
import RegressionChart from '../components/RegressionChart';
import Spacer from '../layout/Spacer';

function _leastSquaresCost(data, predictions) {
  const sumErrs = _.zip(data, predictions)
    .map(([point, prediction]) => Math.pow(point.y - prediction.yHat, 2))
    .reduce((val, err) => val + err);
  return sumErrs / data.length;
}

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
    const linearPred = this.props.data.map(p => ({
      yHat: this.props.linearReg.predict(p.x),
      color: p.color,
    }));
    const poly2Pred = this.props.data.map(p => ({
      yHat: this.props.polyReg2.predict(p.x),
      color: p.color,
    }));
    const poly5Pred = this.props.data.map(p => ({
      yHat: this.props.polyReg5.predict(p.x),
      color: p.color,
    }));
    const poly10Pred = this.props.data.map(p => ({
      yHat: this.props.polyReg10.predict(p.x),
      color: p.color,
    }));

    const linCost = _.round(_leastSquaresCost(this.props.data, linearPred), 2);
    const poly2Cost = _.round(
      _leastSquaresCost(this.props.data, poly2Pred),
      2,
    );
    const poly5Cost = _.round(
      _leastSquaresCost(this.props.data, poly5Pred),
      2,
    );
    const poly10Cost = _.round(
      _leastSquaresCost(this.props.data, poly10Pred),
      2,
    );

    const linYHat = matrixMath(linearPred, 'yHat', '\\hat{y}');
    const poly2YHat = matrixMath(poly2Pred, 'yHat', '\\hat{y}');
    const poly5YHat = matrixMath(poly5Pred, 'yHat', '\\hat{y}');
    const poly10YHat = matrixMath(poly10Pred, 'yHat', '\\hat{y}');

    const yVec = matrixMath(this.props.data, 'y');
    const linCostMath = `J =
    \\frac{1}{n} \\sum
    \\left(${yVec} - ${linYHat} \\right)^2
    = ${linCost}
    `;
    const poly2CostMath = `J =
    \\frac{1}{n} \\sum
    \\left(${yVec} - ${poly2YHat} \\right)^2
    = ${poly2Cost}
    `;
    const poly5CostMath = `J =
    \\frac{1}{n} \\sum
    \\left(${yVec} - ${poly5YHat} \\right)^2
    = ${poly5Cost}
    `;
    const poly10CostMath = `J =
    \\frac{1}{n} \\sum
    \\left(${yVec} - ${poly10YHat} \\right)^2
    = ${poly10Cost}
    `;

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
          <Katex math={linCostMath} />
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
          <Katex math={poly2CostMath} />
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
          <Katex math={poly5CostMath} />
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
          <Katex math={poly10CostMath} />
        </Flexbox>

        <p>
          A degree 10 polynomial is clearly not great because just a small
          change in our data collection results in completely different
          predictions. However, it always has the best error. How else can we
          figure out which type of regression is best?
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
