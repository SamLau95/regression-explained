/**
 * Section on polynomial regression.
 */
import _ from 'lodash';
import Flexbox from 'flexbox-react';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import DataMatrix from '../components/DataMatrix';
import RegressionChart from '../components/RegressionChart';
import { actions } from '../reducers/polynomial';

class Polynomial extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,

    dispatch: PropTypes.func.isRequired,
    onPointDrop: PropTypes.func.isRequired,
  };

  render() {
    return (
      <section>
        <h2>Polynomial Regression</h2>
        <p>
          What if our data have a nonlinear pattern?
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
            onPointDrop={this.props.onPointDrop}
          />
          <DataMatrix data={this.props.data} col={'x'} />
          <DataMatrix data={this.props.data} col={'y'} />
        </Flexbox>
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
