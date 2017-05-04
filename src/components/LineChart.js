/**
 * Renders one or more curves
 */
import _ from 'lodash';
import React, { PropTypes } from 'react';
import ReactHighcharts from 'react-highcharts';

class LineChart extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    xLabel: PropTypes.string,
    yLabel: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,

    axisBounds: PropTypes.object.isRequired,
    series: PropTypes.array.isRequired,
  };

  _chartSettings() {
    const axisBounds = this.props.axisBounds;

    return {
      chart: {
        width: this.props.width,
        height: this.props.height,
        animation: false,
      },
      credits: { enabled: false },
      title: {
        text: this.props.title,
      },
      xAxis: {
        title: {
          text: this.props.xLabel,
        },
        min: axisBounds.x.min,
        max: axisBounds.x.max,
      },
      yAxis: {
        title: {
          text: this.props.yLabel,
        },
        min: axisBounds.y.min,
        max: axisBounds.y.max,
      },
    };
  }

  _updateChart() {
    return {
      ...this._chartSettings(),
      series: this.props.series,
    };
  }

  render() {
    return (
      <div>
        <ReactHighcharts config={this._updateChart()} />
      </div>
    );
  }
}

export default LineChart;
