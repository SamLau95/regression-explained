/**
 * Renders a LaTeX matrix for a given dataset.
 */

import _ from 'lodash';
import React, { PropTypes } from 'react';

import Katex from './Katex';

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

  _renderPoint(point) {
    const val = point[this.props.col];
    return _.range(1, this.props.degree + 1)
      .map((deg) => _.round(Math.pow(val, deg), 1))
      .map((value) => `\\color{${point.color}}{${value}}`)
      .join(' & ');
  }

  render() {
    const label = this.props.label ? this.props.label : this.props.col;
    const matrix = `\\begin{array}{c}
      ${label} \\\\
      \\begin{bmatrix}
        ${this.props.data
          .map((p) => this._renderPoint(p))
          .join('\\\\')
        }
      \\end{bmatrix}
    \\end{array}`

    return <Katex math={matrix} />
  }
}

export default DataMatrix;
