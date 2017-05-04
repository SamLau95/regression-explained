/**
 * Renders a LaTeX matrix for a given dataset.
 */

import _ from 'lodash';
import React, { PropTypes } from 'react';

import Katex from './Katex';

function _renderPoint(point, col, degree) {
  const val = point[col];
  return _.range(1, degree + 1)
    .map(deg => _.round(Math.pow(val, deg), 1))
    .map(value => `\\color{${point.color}}{${value}}`)
    .join(' & ');
}

export function matrixMath(data, col, label, degree = 1) {
  const heading = label ? label : col;
  return `\\begin{array}{c}
    ${heading} \\\\
    \\begin{bmatrix}
      ${data.map(p => _renderPoint(p, col, degree)).join('\\\\ \n')}
    \\end{bmatrix}
  \\end{array}`;
}

class DataMatrix extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    col: PropTypes.string.isRequired,

    label: PropTypes.string,
    degree: PropTypes.number,
  };

  static defaultProps = {
    degree: 1,
  };

  render() {
    return (
      <Katex
        math={matrixMath(
          this.props.data,
          this.props.col,
          this.props.label,
          this.props.degree,
        )}
      />
    );
  }
}

export default DataMatrix;
