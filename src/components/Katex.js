/**
 * Renders math using Katex
 */
import katex from 'katex';
import React, { PropTypes } from 'react';

class Katex extends React.Component {
  static propTypes = {
    math: PropTypes.string.isRequired,
  };

  _renderMath() {
    katex.render(this.props.math, this.el);
  }

  componentDidMount() {
    this._renderMath();
  }

  componentDidUpdate(prevProps, prevState) {
    this._renderMath();
  }

  render() {
    return <div ref={el => this.el = el} />;
  }
}

export default Katex;
