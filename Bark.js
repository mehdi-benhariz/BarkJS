const http = require("http");
const { parse: queryParse } = require("querystring");

class Bark {
  constructor() {
    this._server = http.createServer(this._handleRequest.bind(this));
    this._stack = [];
    this._routingMap = new Map();
    return this;
  }
   
  _handleRequest(req, res) {
    let stack = this._stack;
    let i = 0;

    // Parse query
    const queryParams = req.url.split("?")[1];
    req.query = queryParams? queryParse(queryParams) : {};
    
    // Parse body
    let body = "";
    req.on("data", (chunk) => (body += chunk.toString()));
    req.on("end", () => {
      req.body = body ? queryParse(body) : {};

      let next = () => {
        if (i < stack.length) stack[i++](req, res, next);
        else res.end("404");
      };
      next();
    });

  }

  use(middleware) {
    if (typeof middleware !== "function")
      throw new Error("Middleware must be a function 😥");

    this._stack.push(middleware);
  }

  listen(port, callback) {
    this._server.listen(port);
    if (callback) callback();
  }

  Routing() {
    const self = this;
    const methods = ["get", "post", "put", "delete", "patch"];
    
    const tempRoutingHandler = (url, method, ...middleware) => {
      if (typeof url !== "string") {
        throw new Error("URL must be a string 😥 ");
      }
      if (!methods.includes(method)) {
        throw new Error("Method not supported 😥 ");
      }
      self._addRoute(method.toUpperCase(), url, middleware);
      return routingHandler;
    };
    
    const routingHandler = {
      get(url, ...middleware) {
        return tempRoutingHandler(url, "get", ...middleware);
      },
      post(url, ...middleware) {
        return tempRoutingHandler(url, "post", ...middleware);
      },
      put(url, ...middleware) {
        return tempRoutingHandler(url, "put", ...middleware);
      },
      delete(url, ...middleware) {
        return tempRoutingHandler(url, "delete", ...middleware);
      },
      patch(url, ...middleware) {
        return tempRoutingHandler(url, "patch", ...middleware);
      },
    };
    
    return routingHandler;
  }
  

  _addRoute(method, url, middleware) {
    const routeKey = `${method}_${url}`;
    const callback = middleware.pop();

    if (typeof callback !== "function")
      throw new Error("Callback must be a function 😥 ");

    const route = {
      middleware,
      callback,
    };

    this._routingMap.set(routeKey, route);
  }
}

module.exports = Bark;
