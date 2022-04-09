// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => res.send('Hello World!'))
// app.listen(port, () => console.log(`Example app listening on port ${port}!`))
const Bark = require("./Bark.js");
const app = new Bark();
app.listen(3000, () => console.log("Bark listening on port 3000"));
