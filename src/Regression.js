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
    this.reg = regression(this.method, data, this.degree);
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
}

export default Regression;
