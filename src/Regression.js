import _ from 'lodash';
import regression from 'regression';

const POLYNOMIAL = 'polynomial';

/**
 * Note that the data has to be in [x, y] format
 */
class Regression {
  constructor(method, degree = 1) {
    this.method = method;
    this.degree = degree;
  }

  fit(data) {
    this.data = data;
    this.reg = regression(this.method, data.map(p => [p.x, p.y]), this.degree);
    return this;
  }

  predict(x) {
    if (this.method === POLYNOMIAL) {
      return this.reg.equation.reduce(
        (sum, coef, degree) => sum + coef * Math.pow(x, degree),
      );
    }

    const [slope, intercept] = this.reg.equation;
    return slope * x + intercept;
  }

  coef() {
    return this.reg.equation.map(n => _.round(n, 2));
  }

  equation() {
    return this.reg.string;
  }

  // Allow passing in predictions to save computation
  cost(predictions = null, round = true) {
    let preds = predictions;

    if (!preds) {
      preds = this.data.map(p => ({
        yHat: this.reg.predict(p.x),
      }));
    }

    const sumErrs = _.zip(this.data, preds)
      .map(([point, pred]) => Math.pow(point.y - pred.yHat, 2))
      .reduce((val, err) => val + err);

    return _.round(sumErrs / this.data.length, 2);
  }
}

export default Regression;
