const mixin = require('merge-descriptors');
const proto = require("./app");

exports = module.exports = createApplication

function createApplication() {
  const app = function(req, res, next) {
    app.handle(req, res, next);
  };

  mixin(app, proto, false);

  app.init();
  return app;
}

exports.app = proto;