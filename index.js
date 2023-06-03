const Bark = require("./Bark.js");
const app = new Bark();

app.Routing()
  .get("/test", (req, res) => {
    console.log(req.query);
    console.log("it works!\n");
    res.end();

  }).post("/test", (req, res) => {
    console.log(req.body);
    console.log("Post works!\n");
    res.end();
  }).get("/" , (req,res)=>{
    res.ibaath("get")
  })

app.listen(3000, () => console.log("Server is running!"));
