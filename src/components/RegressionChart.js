import React, { PropTypes } from 'react';
import ReactHighcharts from 'react-highcharts';
import _ from 'lodash';

import icecream from '../icecream.json';

const data = icecream.map((x) => [x.liking_texture, x.overall]);

const chart = {
  chart: {
    type: 'scatter',
  },
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
      name: 'Ice Cream',
      data: data,
    },
  ],
};

class RegressionChart extends React.Component {
  static propTypes = {
    name: PropTypes.string,
  };

  render() {
    return (
      <div>
        <ReactHighcharts config={chart} />
      </div>
    );
  }
}

export default RegressionChart;
