import regression from 'regression';

const POLYNOMIAL = 'polynomial';

/**
 * Note that the data has to be in [x, y] format
 */
class Regression {
  constructor(method, data, degree = 5) {
    this.method = method;
    this.degree = degree;

    this.reg = regression(method, data, degree);
  }

  predict(x) {
    if (this.method === POLYNOMIAL) {
      debugger;
      return
    }

    const [slope, intercept] = this.reg.equation;
    return slope * x + intercept;
  }
}

export default Regression;
