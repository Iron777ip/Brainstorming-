
/* Create express instance */
const express = require("express")
const app = express();
const port = 3000;


/* Landing route */
app.get("/", (req, res) => {
  res.render("index");
});

// Sample API route
app.get("/ping", (req, res) => {
  res.send("pong");
});


// Run server!
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
