const methods = require("./methods");
const Layer = require("./layer");

const flatten = Array.prototype.flat;

function Route(path) {
  this.path = path;
  this.stack = [];

  this.methods = {};
}

Route.prototype.dispatch = function (req, res, done) {};

methods.forEach(function(method) {
  Route.prototype[method] = function() {
    const handles = flatten.call(Array.prototype.slice.call(arguments)); // ??????????

    for (handle of handles) {
      if (typeof handle !== "function") {
        const type = toString.call(handle)
        const msg = 'Route.' + method + "() requires a callback function but got a " + type;
        throw new Error(msg);
      }

      const layer = Layer('/', {}, handle);
      layer.method = method;

      this.methods[method] = true;
      this.stack.push(layer)
    }

    return this;
  }
})

module.exports = Route;