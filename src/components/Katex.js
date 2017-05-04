/**
 * Renders math using Katex
 */
import katex from 'katex';
import React, { PropTypes } from 'react';

class Katex extends React.Component {
  static propTypes = {
    math: PropTypes.string.isRequired,

    inline: PropTypes.bool,
  };

  static defaultProps = {
    inline: false,
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
    return this.props.inline ?
      <span ref={el => this.el = el} /> :
      <div ref={el => this.el = el} />;
  }
}

export default Katex;
