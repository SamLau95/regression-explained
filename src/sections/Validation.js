/**
 * Section on using a validation set.
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

class Validation extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,

    dispatch: PropTypes.func.isRequired,
    onPointDrop: PropTypes.func.isRequired,
  };

  render() {
    const data = this.props.data.map(p => [p.x, p.y]);

    const linearReg = new Regression(
      'linear',
    ).fit(data);
    const polyReg2 = new Regression(
      'polynomial',
      2,
    ).fit(data);
    const polyReg5 = new Regression(
      'polynomial',
      5,
    ).fit(data);

    return (
      <section>
        <h2>Using a Validation Set</h2>
        <p>
          How can we choose the best polynomial degree for our data? Let's take
          a look at the training error.
        </p>

        <Flexbox>
          <DataMatrix data={this.props.data} col={'x'} />
          <DataMatrix data={this.props.data} col={'y'} />
        </Flexbox>
        <Spacer amount={20} />
        <Equation
          eqn={linearReg.equation()}
          xName="Sweet"
          yName="Overall rating"
        />

        <Spacer />

        <Flexbox>
          <DataMatrix
            data={this.props.data}
            col={'x'}
            label={'X'}
            degree={2}
          />
          <DataMatrix data={this.props.data} col={'y'} />
        </Flexbox>
        <Spacer amount={20} />
        <Equation
          eqn={polyReg2.equation()}
          xName="Sweet"
          yName="Overall rating"
        />

        <Spacer />

        <Flexbox>
          <DataMatrix
            data={this.props.data}
            col={'x'}
            label={'X'}
            degree={5}
          />
          <DataMatrix data={this.props.data} col={'y'} />
        </Flexbox>
        <Spacer amount={20} />
        <Equation
          eqn={polyReg5.equation()}
          yName="Overall rating"
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(Validation);
