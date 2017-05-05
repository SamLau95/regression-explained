/**
 * Section on polynomial regression.
 */
import _ from 'lodash';
import Flexbox from 'flexbox-react';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { actions } from '../reducers/polynomial';
import DataMatrix from '../components/DataMatrix';
import Equation from '../components/Equation';
import Regression from '../Regression';
import RegressionChart from '../components/RegressionChart';
import Spacer from '../layout/Spacer';

class Polynomial extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    linearReg: PropTypes.object.isRequired,
    polyReg2: PropTypes.object.isRequired,
    polyReg5: PropTypes.object.isRequired,

    dispatch: PropTypes.func.isRequired,
    onPointDrop: PropTypes.func.isRequired,
  };

  render() {
    return (
      <section>
        <h2>Polynomial Regression</h2>
        <p>
          So what if our data don't follow a simple line? Here we plot the
          overall rating against the sweetness of the ice cream. It makes sense
          that people would like sweet ice cream but after a certain point the
          ice cream would be too sweet to enjoy.
        </p>

        <Flexbox justifyContent="space-between">
          <RegressionChart
            title="Linear Regression?..."
            xLabel="Sweetness"
            yLabel="Overall Rating"
            width={400}
            height={400}
            axisBounds={{
              x: { min: 0, max: 15 },
              y: { min: 3.5, max: 7 },
            }}
            data={this.props.data}
            regression={this.props.linearReg}
            onPointDrop={this.props.onPointDrop}
          />
          <DataMatrix data={this.props.data} col={'x'} />
          <DataMatrix data={this.props.data} col={'y'} />
        </Flexbox>

        <Equation
          eqn={this.props.linearReg.equation()}
          xName="Sweet"
          yName="Overall rating"
        />

        <p>
          Clearly, the data don't follow a simple linear pattern. How can we
          address this? Well, instead of fitting a line, let's fit a
          polynomial!
        </p>

        <Flexbox justifyContent="space-between">
          <RegressionChart
            title="Polynomial Regression, degree 2"
            xLabel="Sweetness"
            yLabel="Overall Rating"
            width={400}
            height={400}
            axisBounds={{
              x: { min: 0, max: 15 },
              y: { min: 3.5, max: 7 },
            }}
            data={this.props.data}
            regression={this.props.polyReg2}
            onPointDrop={this.props.onPointDrop}
          />
          <DataMatrix data={this.props.data} col={'x'} />
          <DataMatrix data={this.props.data} col={'y'} />
        </Flexbox>

        <Equation
          eqn={this.props.polyReg2.equation()}
          xName="Sweet"
          yName="Overall rating"
        />

        <p>
          But this begs the question: why not keep increasing the degree of the
          polynomial? Drag the points on any of these charts to see them
          recalculate their regression curves.
        </p>

        <Flexbox justifyContent="space-between">
          <RegressionChart
            title="Polynomial Regression, degree 5"
            xLabel="Sweetness"
            yLabel="Overall Rating"
            width={400}
            height={400}
            axisBounds={{
              x: { min: 0, max: 15 },
              y: { min: 3.5, max: 7 },
            }}
            data={this.props.data}
            regression={this.props.polyReg5}
            onPointDrop={this.props.onPointDrop}
          />
          <DataMatrix data={this.props.data} col={'x'} />
          <DataMatrix data={this.props.data} col={'y'} />
        </Flexbox>
        <Spacer amount={20} />
        <Equation
          eqn={this.props.polyReg5.equation()}
          yName="Overall rating"
        />

        <p>
          When you drag around the points, you'll notice that the degree 5
          polynomial feels pretty unstable; changing a point makes it jump all
          over the place. In this case, it's pretty clear that the degree 2
          polynomial is best. However, that might not always be the case for
          all scenarios. Sometimes a degree 5 polynomial is what we want. How
          can we decide which degree polynomial to use?
        </p>
      </section>
    );
  }
}

const mapStateToProps = state => state.polynomial;
const mapDispatchToProps = dispatch => {
  return {
    onPointDrop: (index, point) =>
      dispatch(actions.polynomial.setDatum(index, point)),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Polynomial);
