import _ from 'lodash';
import LinearReg from 'ml-regression-simple-linear';
import React, { PropTypes } from 'react';
import ReactHighcharts from 'react-highcharts';

class RegressionChart extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
  };

  chart() {
    const linearReg = new LinearReg(..._.unzip(this.props.data));
    const linePoints = [
      [
        _.head(this.props.data)[0],
        linearReg.predict(_.head(this.props.data)[0]),
      ],
      [
        _.last(this.props.data)[0],
        linearReg.predict(_.last(this.props.data)[0]),
      ],
    ];

    return {
      title: {
        text: 'Ice Cream Rating vs. Texture Rating',
      },
      xAxis: {
        title: {
          enabled: true,
          text: 'Texture Rating',
        },
      },
      yAxis: {
        title: {
          text: 'Overall Rating',
        },
      },
      series: [
        {
          type: 'scatter',
          name: 'Observations',
          data: this.props.data,
        },
        {
          type: 'line',
          name: 'Regression line',
          data: linePoints,
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
        <ReactHighcharts config={this.chart()} />
      </div>
    );
  }
}

export default RegressionChart;
