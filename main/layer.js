module.exports = Layer;

function Layer(path, options, fn) {
  if (!(this instanceof Layer)) {
    return new Layer(path, options, fn);
  }

  this.handle = fn;
  this.name = fn.name || '<anonymous>';
  this.params = undefined;
  this.path = undefined;
}

Layer.prototype.handle_request = function(req, res, next) {
  const fn = this.handle;

  try {
    fn(req, res, next);
  } catch(err) {
    console.error(err)
  }
}

Layer.prototype.match = function(path) {
  if (
    this.route && this.route.path === path ||
    this.name === "expressInit"
  ) {
    return true;
  }

  return false;
}