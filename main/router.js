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
  const layer = stack[0];
  const route = layer.route;
  route.stack[0].handle_request(req, res);
}