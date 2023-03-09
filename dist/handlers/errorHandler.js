'use strict';

exports.catchErrors = function (fn) {
  return function (req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

exports.developmentErrors = function (err, req, res, next) {
  err.stack = err.stack || '';
  var errorDetails = {
    message: err.message,
    status: err.status,
    stackHighlighted: err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>')
  };
  res.status(err.status || 500);
  res.format({
    // Based on the `Accept` http header
    'text/html': function textHtml() {
      res.json(errorDetails);
    }, // Form Submit, Reload the page
    'application/json': function applicationJson() {
      return res.json(errorDetails);
    } // Ajax call, send JSON back
  });
};

exports.productionErrors = function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
};

/*
Not Found Error Handler
If we hit a route that is not found, we mark it as 404 and pass it along to the next error handler to display
*/
exports.notFound = function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
};
//# sourceMappingURL=errorHandler.js.map