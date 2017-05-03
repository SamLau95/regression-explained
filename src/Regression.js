import regression from 'regression';

const POLYNOMIAL = 'polynomial';

/**
 * Note that the data has to be in [x, y] format
 */
class Regression {
  constructor(method, degree = 5) {
    this.method = method;
    this.degree = degree;
  }

  fit(data, degree = 5) {
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

  equation() {
    return this.reg.string;
  }
}

export default Regression;
