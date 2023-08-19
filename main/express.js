const mixin = require("merge-descriptors");
const http = require("node:http");
const proto = require("./app");

exports = module.exports = createApplication;

function createApplication() {
  const app = function (req, res, next) {
    app.handle(req, res, next);
  };

  mixin(app, proto, false);

  const res = Object.create(http.ServerResponse.prototype);

  res.send = function (body) {
    if (typeof body === "object") {
      this.json(body);
    } else if (typeof body === "string") {
      this.setHeader("Content-Type", "text/plain");
      this.end(body, "utf8");
    }

    return this;
  };

  res.json = function (body) {
    this.setHeader("Content-Type", "application/json");
    return this.send(JSON.stringify(body));
  };

  app.response = Object.create(res, {
    app: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: app,
    },
  });

  app.init();
  return app;
}

exports.app = proto;
