const Bark = require("./Bark.js");
const app = new Bark();

app.Routing()
  .get("/", (req, res, next) => {
    res.send(req.bla).status(200);
    console.log("it works!\n");
    next(); // Call next to proceed to the next middleware/route
  })
  .get("/test", (req, res) => {
    console.log(req.query);
    console.log("it works!\n");
    res.end(); // End the response here, no need to call next()

  });

app.listen(3000, () => console.log("Server is running!"));
