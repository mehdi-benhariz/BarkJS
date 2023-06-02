
# BarkJS 📝  
BarkJS is a lightweight and fast framework for building web applications in Node.js. It provides a simple and intuitive API for routing and middleware handling.

## Features ✨

- Simple and intuitive routing
- Middleware support
- Query parameter and body parsing
- Fast and lightweight

## Get Started 🚀  
To install BarkJS, use npm:  
```npm
npm install barkjs 
```
Here's a quick example to get you started with BarkJS:

```javascript
const Bark = require("barkjs");
const app = new Bark();

app.Routing()
  .get("/", (req, res, next) => {
    res.send("Hello, BarkJS!").status(200);
    next();
  })
  .get("/test", (req, res) => {
    res.send("Test route").status(200);
  });

app.listen(3000, () => console.log("Server is running!"));
```

