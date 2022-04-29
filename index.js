// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => res.send('Hello World!'))
// app.listen(port, () => console.log(`Example app listening on port ${port}!`))
const Bark = require("./Bark.js");
const app = new Bark();
app.Routing().get("/", (req, res) => {
  res.send(req.bla).status(200);
  console.log("it works!\n");
  // res.end(`${req.query.mehdi}`);
});
app.Routing().get("/test", (req, res) => {
  console.log(req.query);
  console.log("it works!\n");
});
app.listen(3000, () => console.log("server is running!"));
