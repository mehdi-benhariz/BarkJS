const Bark = require("./Bark");
const http = require("http");

// Mock request and response objects for testing
const createMockRequest = (url, method, data) => {
  return http.IncomingMessage({
    url: url,
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    on: jest.fn(),
  });
};

const createMockResponse = () => {
  const res = http.ServerResponse();
  res.setHeader = jest.fn();
  res.end = jest.fn();
  return res;
};

describe("Bark Framework", () => {
  let bark;

  beforeEach(() => {
    bark = new Bark();
  });

  describe("Routing", () => {
    it("should handle GET request", () => {
      const req = createMockRequest("/", "GET");
      const res = createMockResponse();

      bark.Routing().get("/", (req, res) => {
        res.end("Hello, GET!");
      });

      bark._handleRequest(req, res);

      expect(res.end).toHaveBeenCalledWith("Hello, GET!");
    });

    it("should handle POST request", () => {
      const req = createMockRequest("/", "POST");
      req.body = { name: "John" };
      const res = createMockResponse();

      bark.Routing().post("/", (req, res) => {
        res.end(`Hello, ${req.body.name}!`);
      });

      bark._handleRequest(req, res);

      expect(res.end).toHaveBeenCalledWith("Hello, John!");
    });

    it("should handle custom middleware", () => {
      const req = createMockRequest("/", "GET");
      const res = createMockResponse();

      const customMiddleware = (req, res, next) => {
        req.customProperty = "Custom Value";
        next();
      };

      bark.use(customMiddleware);

      bark.Routing().get("/", (req, res) => {
        res.end(req.customProperty);
      });

      bark._handleRequest(req, res);

      expect(res.end).toHaveBeenCalledWith("Custom Value");
    });

    it("should handle 404 not found", () => {
      const req = createMockRequest("/unknown", "GET");
      const res = createMockResponse();

      bark._handleRequest(req, res);

      expect(res.end).toHaveBeenCalledWith("404");
    });
  });
});
