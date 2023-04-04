
/* Create express instance */

const app = express();
const port = 3000;


/* Landing route */
app.get("/", (req, res) => {
  res.send("Helooo");
});

// Sample API route
app.get("/ping", (req, res) => {
  res.send("hi");
});


// Run server!
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
