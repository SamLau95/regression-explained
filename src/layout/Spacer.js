import React, { PropTypes } from 'react';

class Spacer extends React.Component {
  static propTypes = {
    amount: PropTypes.number,
  };

  static defaultProps = {
    amount: 50,
  };

  render() {
    return (
      <div style={{ height: this.props.amount }} />
    );
  }
}

export default Spacer;
