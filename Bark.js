const http = require("http");
class Bark {
  constructor() {
    this._server = http.createServer(this._handleRequest.bind(this));
    this._stack = [];
    return this;
  }

  _handleRequest(req, res) {
    let stack = this._stack;
    let i = 0;
    let next = () => {
      if (i < stack.length) stack[i++](req, res, next);
      else res.end("404");
    };
    next();
  }
  use(middleware) {
    if (typeof middleware !== "function")
      throw new Error("Middleware must be a function");

    this._stack.push(middleware);
  }

  listen(port, callback) {
    this._server.listen(port);
    if (callback) callback();
  }
}

module.exports = Bark;
