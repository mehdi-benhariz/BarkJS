const Bark = require("./Bark"); // Update the path to match the location of the Bark file

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

});
