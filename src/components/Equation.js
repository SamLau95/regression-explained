import katex from 'katex';
import React, { PropTypes } from 'react';

const TO_REPLACE_X = new RegExp('x', 'g');
const TO_REPLACE_Y = 'y';

// I hate this game
const TO_REPLACE_PLUS_MINUS = new RegExp('\\+ \\-', 'g');

class Equation extends React.Component {
  static propTypes = {
    eqn: PropTypes.string.isRequired,

    xName: PropTypes.string,
    yName: PropTypes.string,
  };

  _renderEqn() {
    let eqn = this.props.eqn.replace(TO_REPLACE_PLUS_MINUS, '-');

    // This is clearly buggy but whatever...
    if (this.props.xName) {
      eqn = eqn.replace(TO_REPLACE_X, `\\cdot \\text{${this.props.xName}}`)
    }
    if (this.props.yName) {
      eqn = eqn.replace(TO_REPLACE_Y, `\\text{${this.props.yName}}`)
    }

    katex.render(eqn, this.el);
  }

  componentDidMount() {
    this._renderEqn();
  }

  componentDidUpdate(prevProps, prevState) {
    this._renderEqn();
  }

  render() {
    return <div ref={el => this.el = el} />;
  }
}

export default Equation;
