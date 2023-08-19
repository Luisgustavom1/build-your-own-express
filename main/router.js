const Route = require("./route");
const Layer = require("./layer");

var proto = module.exports = function(options) {
  const opts = options || {};

  function router(req, res, next) {
    router.handle(req, res, next)
  }

  Object.setPrototypeOf(router, proto)

  router.params = {};
  router._params = [];
  router.caseSensitive = opts.caseSensitive;
  router.mergeParams = opts.mergeParams;
  router.strict = opts.strict;
  router.stack = []; 

  return router;
}

proto.route = function(path) {
  const route = new Route(path);
  
  const layer = new Layer(path, {}, route.dispatch.bind(route));

  layer.route = route;

  this.stack.push(layer);

  return route
}

proto.handle = function(req, res, out) {
  const self = this;
  const stack = self.stack;
  let index = 0;
  
  next();

  function next() {
    const path = req.url;

    var layer, match, route;
    while (match !== true && index < stack.length) {
      layer = stack[index++];
      match = matchLayer(layer, path);
      route = layer.route;

      if (match !== true || !route) continue;

      route.stack[0].handle_request(req, res, next);
    }

    if (match) {
      layer.handle_request(req, res, next);
    }
  }
}

proto.use = function(fn) {
  const layer = new Layer("/", {}, fn);

  layer.route = undefined;
  this.stack.push(layer);

  return this;
}

function matchLayer(layer, path) {
  try {
    return layer.match(path);
  } catch (err) {
    return err;
  }
}