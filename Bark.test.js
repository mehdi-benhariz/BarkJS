const Bark = require("./Bark"); 
const http = require("http");

describe("BarkJS API Framework", () => {
  let bark;

  beforeEach(() => {
    bark = new Bark();
  });

  it("should register middleware using the 'use' method", () => {
    const middleware = (req, res, next) => {
      // Middleware logic
    };

    bark.use(middleware);

    expect(bark._stack.length).toBe(1);
    expect(bark._stack[0]).toBe(middleware);
  });

  it("should register routes using the 'Routing' method", () => {
    const routeMiddleware = (req, res, next) => {
      // Route middleware logic
    };

    const routeCallback = (req, res) => {
      // Route callback logic
    };

    bark.Routing().get("/users", routeMiddleware, routeCallback);

    const routeKey = "GET_/users";
    const route = bark._routingMap.get(routeKey);

    expect(route.middleware.length).toBe(1);
    expect(route.middleware[0]).toBe(routeMiddleware);
    expect(route.callback).toBe(routeCallback);
  });

  it("should handle incoming HTTP GET request", (done) => {
    bark.Routing().get("/users", (req, res) => {
      const users = [{ id: 1, name: "Mehdi" }, { id: 2, name: "Foulan" }];
      res.ibaath(users);
    });
    const PORT = 3000;
    bark.listen(PORT||3000, () => {
      // Make an HTTP GET request to the defined route
      http.get(`http://localhost:${PORT}/users`, (response) => {
        let responseData = "";

        response.on("data", (chunk) => {
          responseData += chunk;
        });

        response.on("end", () => {
          const users = JSON.parse(responseData);
          expect(users.length).toBe(2);
          expect(users[0].id).toBe(1);
          expect(users[0].name).toBe("Mehdi");
          expect(users[1].id).toBe(2);
          expect(users[1].name).toBe("Foulan");

          bark._server.close();
          done();
        });
      });
    });
  });

});
