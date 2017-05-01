/**
 * Renders a LaTeX matrix for a given dataset.
 */

import _ from 'lodash';
import katex from 'katex';
import React, { PropTypes } from 'react';

class DataMatrix extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    col: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
  }

  _renderPoint(point) {
    if (point.color) {
      return `\\color{${point.color}}{${point[this.props.col]}}`;
    } else {
      return point[this.props.col];
    }
  }

  _renderMatrix() {
    let matrix = `\\begin{array}{c}
      ${this.props.col} \\\\
      \\begin{bmatrix}
        ${this.props.data
          .map((p) => this._renderPoint(p))
          .join('\\\\')
        }
      \\end{bmatrix}
    \\end{array}`

    katex.render(matrix, this.el);
  }

  componentDidMount() {
    this._renderMatrix();
  }

  componentDidUpdate(prevProps, prevState) {
    this._renderMatrix();
  }

  render() {
    return (
      <div ref={el => this.el = el} />
    );
  }
}

export default DataMatrix;
