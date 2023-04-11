/* Import dependencies */
import express from "express";
import mysql from "mysql2/promise";
import DatabaseService from "./services/database.service.mjs";

/* Create express instance */
const app = express();
const port = 3000;

/* Add form data middleware */
app.use(express.urlencoded({ extended: true }));

// Integrate Pug with Express
app.set("view engine", "pug");

// Serve assets from 'static' folder
app.use(express.static("static"));

const db = await DatabaseService.connect();
const { conn } = db;

/* Landing route */
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/countries", async (req, res) => {
  const [rows,fields] = await db.getCountriesWorld();
  return res.render("countries", {rows, fields});
});

// About route
app.get("/about", (req, res) => {
  res.render("about", { title: "Boring about page" });
});

app.get("/cities", async (req, res) => {
  const [rows, fields] = await db.getCities();
  /* Render cities.pug with data passed as plain object */
  return res.render("cities", { rows, fields });
});

app.get('/cities/:id', async (req, res) => {
  const cityId = req.params.id;
  const city = await db.getCity(cityId);
  return res.render('city', { city });
})

/* Update a city by ID */
app.post('/cities/:id', async (req, res) => {
  const cityId = req.params.id;
  const { name } = req.body;
  const sql = `
    UPDATE city
    SET Name = '${name}'
    WHERE ID = '${cityId}';
  `
  await conn.execute(sql);
  return res.redirect(`/cities/${cityId}`);
});

// Run server!
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
