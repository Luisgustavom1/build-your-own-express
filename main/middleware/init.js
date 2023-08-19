exports.init = function(app) {
  return function expressInit(req, res, next) {
    Object.setPrototypeOf(res, app.response)
    next();
  }
}