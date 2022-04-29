const http = require("http");
const { queryParse, paramParse } = require("./parser.js");
const URLErrorHandler = (url, middleware, cb) => {
  if (typeof url !== "string") throw new Error("URL must be a string");
  if (![Array, "function", "object"].includes(typeof middleware))
    throw new Error("Middleware must be a function or an array of functions");
  if (!["function"].includes(typeof cb))
    throw new Error("CallBack must be a function");
};

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
    //todo remove query params from url if it exists
    let reqUrl = req.url;
    if (req.url.includes("?")) reqUrl = req.url.split("?")[0];
    //remove params from url if it exists

    const reqMethod = req.method;
    const reqCode = `${reqMethod}_${reqUrl}`;
    //add custom data send to the request
    res.send = (data) => res.end(data);
    res.status = (status = 200) =>
      res.writeHead(status, "OK", { "Content-Type": "application/json" });
    //add params to the request if exist
    req.params = {};
    req.params = paramParse(req.url);
    req.bla = "bla bla";
    // reqUrl.split("/").forEach((param, index) => {
    //   if (index === 0) return;
    //   req.params[param] = param;
    // });

    //add query to the request if exist
    req.query = queryParse(req.url);

    //check if the url with the method exists in the routing map
    console.log({ reqCode });
    if (this._routingMap.has(reqCode)) {
      let next = () => {
        if (i < stack.length) stack[i++](req, res, next);
        else res.end("404");
      };
      this._routingMap.get(reqCode).cb(req, res, next);
    }
  }
  // use(middleware) {
  //   if (typeof middleware !== "function")
  //     throw new Error("Middleware must be a function");

  //   this._stack.push(middleware);
  // }
  //handle endpoints with different methods : Bark.Routing().get(url,[middleware] ,callback)
  Routing = () => ({
    get: (...args) => {
      let cb = args.pop();
      let [url, ...middleware] = args;
      URLErrorHandler(url, middleware, cb);
      const code = `GET_${url}`;
      //check if the url with specific method exist in routing map
      if (this._routingMap.has(code))
        throw new Error("this endpoints already exist");
      //adding the callback function
      this._routingMap.set(code, { cb });
      //adding the list of middlewares
    },
    post: (req, res, next) => {
      res.end("POST");
    },
    put: (req, res, next) => {
      res.end("PUT");
    },
    delete: (req, res, next) => {
      res.end("DELETE");
    },
    patch: (req, res, next) => {
      res.end("PATCH");
    },
  });

  listen(port, callback) {
    try {
      this._server.listen(port);
      if (callback) callback();
    } catch (error) {
      cb(`error occured while starting server.`);
    }
  }
}

module.exports = Bark;
