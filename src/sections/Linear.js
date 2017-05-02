/**
 * Section on linear regression.
 */
import _ from 'lodash';
import Flexbox from 'flexbox-react';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import DataMatrix from '../components/DataMatrix';
import Regression from '../Regression';
import RegressionChart from '../components/RegressionChart';
import { actions } from '../reducers/linear';

class Linear extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,

    dispatch: PropTypes.func.isRequired,
    onPointDrop: PropTypes.func.isRequired,
  };

  render() {
    const linearReg = new Regression(
      'linear',
      this.props.data.map(p => [p.x, p.y]),
    );

    return (
      <section>
        <h2>What is regression?</h2>
        <p>
          In this tutorial, we're going to learn about regression, one of the
          the most important concepts in machine learning. TODO(sam): Finish
          this.
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
            regression={linearReg}
            onPointDrop={this.props.onPointDrop}
          />
          <DataMatrix data={this.props.data} col={'x'} />
          <DataMatrix data={this.props.data} col={'y'} />
        </Flexbox>
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
