/**
 * Renders a scatterplot with a regression line overlaid on top.
 */
import _ from 'lodash';
import React, { PropTypes } from 'react';
import ReactHighcharts from 'react-highcharts';
import HighchartsDraggable from 'highcharts-draggable-points';

HighchartsDraggable(ReactHighcharts.Highcharts);

class RegressionChart extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    xLabel: PropTypes.string,
    yLabel: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    axisBounds: PropTypes.object,

    data: PropTypes.array.isRequired,
    regression: PropTypes.object.isRequired,
    onPointDrop: PropTypes.func.isRequired,
  };

  _axisBounds() {
    if (this.props.axisBounds) return this.props.axisBounds;
    const xs = this.props.data.map(p => p.x);
    const ys = this.props.data.map(p => p.y);
    return {
      x: {
        min: _.min(xs) - 0.5,
        max: _.max(xs) + 0.5,
      },
      y: {
        min: _.min(ys) - 0.5,
        max: _.max(ys) + 0.5,
      },
    };
  }

  _chartSettings() {
    const axisBounds = this._axisBounds();

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
    const data = this.props.data;
    const { min, max } = this._axisBounds().x;

    const regressionPoints = _.range(min, max, 0.05).map(x => [
      x,
      this.props.regression.predict(x),
    ]);

    return {
      ...this._chartSettings(),
      series: [
        {
          type: 'scatter',
          name: 'Observations',
          data: data,
          draggableX: true,
          dragPrecisionX: 0.25,
          draggableY: true,
          dragPrecisionY: 0.5,
          point: {
            events: {
              drop: e => {
                const { index, x, y } = e.target;
                this.props.onPointDrop(index, { x, y });
              },
            },
          },
        },
        {
          type: 'line',
          name: 'Regression',
          data: regressionPoints,
          marker: {
            enabled: false,
          },
          states: {
            hover: {
              lineWidth: 0,
            },
          },
        },
      ],
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

export default RegressionChart;
