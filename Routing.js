var routingMap = new Map();
const handleEndPoint = (req, res, next) => {
  let { url, method } = req.url;
  let route = routingMap[url];
  if (route && route[method]) route[method](req, res, next);
  else next();
};

exports.Routing = (url, ...other) => {
  return {
    get: (req, res, next) => {
      res.end("GET");
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
  };
};
