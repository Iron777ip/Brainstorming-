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

app.get("/country/:code", async (req, res) => {
  const code = req.params.code;
  const [rows,fields] = await db.getCountry(code);
  return res.render("countries", {rows, fields});
});

app.get("/countries/world", async (req, res) => {
  const [rows,fields] = await db.getCountriesWorld();
  return res.render("countries", {rows, fields});
});

app.get("/countries/continents", async (req, res) => {
  const [rows, fields] = await db.getContinents();
  return res.render("countriesContinents", {rows, fields});
});

app.get("/countries/regions", async (req, res) => {
  const [rows, fields] = await db.getRegions();
  return res.render("countriesRegions", {rows, fields});
});

app.get("/countries/continents/:name", async (req, res) => {
  const continentName = req.params.name;
  const [rows, fields] = await db.getCountriesContinent(continentName);
  return res.render("countries", {rows, fields});
});

app.get("/countries/regions/:name", async (req, res) => {
  const regionName = req.params.name;
  const [rows, fields] = await db.getCountriesRegion(regionName);
  return res.render("countries", {rows, fields});
});

app.get("/countries/world/:limit", async (req, res) => {
  const continentName = req.params.name;
  const limit = req.params.limit;
  const [rows, fields] = await db.getCountriesWorldLimit(limit);
  return res.render("countries", {rows, fields});
});

app.get("/countries/continents/:name/:limit", async (req, res) => {
  const continentName = req.params.name;
  const limit = req.params.limit;
  const [rows, fields] = await db.getCountriesContinentLimit(continentName, limit);
  return res.render("countries", {rows, fields});
});

app.get("/countries/regions/:name/:limit", async (req, res) => {
  const regionName = req.params.name;
  const limit = req.params.limit;
  const [rows, fields] = await db.getCountriesRegionLimit(regionName, limit);
  return res.render("countries", {rows, fields});
});

// Capital_cities route
app.get("/capitalCity/:code", async (req, res) => {
  const code = req.params.code;
  const [rows,fields] = await db.getCountry(code);
  return res.render("capitalCities", {rows, fields});
});

app.get("/capitalCities/world", async (req, res) => {
  const [rows,fields] = await db.getCapitalCitiesWorld();
  return res.render("capitalCities", {rows, fields});
});

app.get("/capitalCities/continents", async (req, res) => {
  const [rows, fields] = await db.getContinents();
  return res.render("capitalCitiesContinents", {rows, fields});
});

app.get("/capitalCities/regions", async (req, res) => {
  const [rows, fields] = await db.getRegions();
  return res.render("capitalCitiesRegions", {rows, fields});
});

app.get("/capitalCities/continents/:name", async (req, res) => {
  const continentName = req.params.name;
  const [rows, fields] = await db.getCapitalCitiesContinent(continentName);
  return res.render("capitalCities", {rows, fields});
});

app.get("/capitalCities/regions/:name", async (req, res) => {
  const regionName = req.params.name;
  const [rows, fields] = await db.getCapitalCitiesRegion(regionName);
  return res.render("capitalCities", {rows, fields});
});

app.get("/capitalCities/world/:limit", async (req, res) => {
  const continentName = req.params.name;
  const limit = req.params.limit;
  const [rows, fields] = await db.getCapitalCitiesWorldLimit(limit);
  return res.render("capitalCities", {rows, fields});
});

app.get("/capitalCities/continents/:name/:limit", async (req, res) => {
  const continentName = req.params.name;
  const limit = req.params.limit;
  const [rows, fields] = await db.getCapitalCitiesContinentLimit(continentName, limit);
  return res.render("capitalCities", {rows, fields});
});

app.get("/capitalCities/regions/:name/:limit", async (req, res) => {
  const regionName = req.params.name;
  const limit = req.params.limit;
  const [rows, fields] = await db.getCapitalCitiesRegionLimit(regionName, limit);
  return res.render("capitalCities", {rows, fields});
});

// Cities route
app.get("/city/:id", async (req, res) => {
  const code = req.params.id;
  const [rows,fields] = await db.getCity(id);
  return res.render("cities", {rows, fields});
});

app.get("/cities/world", async (req, res) => {
  const [rows,fields] = await db.getCitiesWorld();
  return res.render("cities", {rows, fields});
});

app.get("/cities/continents", async (req, res) => {
  const [rows, fields] = await db.getContinents();
  return res.render("citiesContinents", {rows, fields});
});

app.get("/cities/regions", async (req, res) => {
  const [rows, fields] = await db.getRegions();
  return res.render("citiesRegions", {rows, fields});
});

app.get("/cities/countries", async (req, res) => {
  const [rows, fields] = await db.getCountryNames();
  return res.render("citiesCountries", {rows, fields});
});

app.get("/cities/districts", async (req, res) => {
  const [rows, fields] = await db.getDistricts();
  return res.render("citiesDistricts", {rows, fields});
});

app.get("/cities/continents/:name", async (req, res) => {
  const continentName = req.params.name;
  const [rows, fields] = await db.getCitiesContinent(continentName);
  return res.render("cities", {rows, fields});
});

app.get("/cities/regions/:name", async (req, res) => {
  const regionName = req.params.name;
  const [rows, fields] = await db.getCitiesRegion(regionName);
  return res.render("cities", {rows, fields});
});

app.get("/cities/countries/:name", async (req, res) => {
  const regionName = req.params.name;
  const limit = req.params.limit;
  const [rows, fields] = await db.getCitiesCountry(regionName);
  return res.render("cities", {rows, fields});
});

app.get("/cities/districts/:name", async (req, res) => {
  const regionName = req.params.name;
  const limit = req.params.limit;
  const [rows, fields] = await db.getCitiesDistrict(regionName);
  return res.render("cities", {rows, fields});
});

app.get("/cities/world/:limit", async (req, res) => {
  const continentName = req.params.name;
  const limit = req.params.limit;
  const [rows, fields] = await db.getCitiesWorldLimit(limit);
  return res.render("cities", {rows, fields});
});

app.get("/cities/continents/:name/:limit", async (req, res) => {
  const continentName = req.params.name;
  const limit = req.params.limit;
  const [rows, fields] = await db.getCitiesContinentLimit(continentName, limit);
  return res.render("cities", {rows, fields});
});

app.get("/cities/regions/:name/:limit", async (req, res) => {
  const regionName = req.params.name;
  const limit = req.params.limit;
  const [rows, fields] = await db.getCitiesRegionLimit(regionName, limit);
  return res.render("cities", {rows, fields});
});

app.get("/cities/countries/:name/:limit", async (req, res) => {
  const regionName = req.params.name;
  const limit = req.params.limit;
  const [rows, fields] = await db.getCitiesCountryLimit(regionName, limit);
  return res.render("cities", {rows, fields});
});

app.get("/cities/districts/:name/:limit", async (req, res) => {
  const regionName = req.params.name;
  const limit = req.params.limit;
  const [rows, fields] = await db.getCitiesDistrictLimit(regionName, limit);
  return res.render("cities", {rows, fields});
});

// About route
app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/cities", async (req, res) => {
  const [rows, fields] = await db.getCities();
  /* Render cities.pug with data passed as plain object */
  return res.render("cities", { rows, fields });
});

// app.get('/cities/:id', async (req, res) => {
//   const cityId = req.params.id;
//   const city = await db.getCity(cityId);
//   return res.render('city', { city });
// })

// /* Update a city by ID */
// app.post('/cities/:id', async (req, res) => {
//   const cityId = req.params.id;
//   const { name } = req.body;
//   const sql = `
//     UPDATE city
//     SET Name = '${name}'
//     WHERE ID = '${cityId}';
//   `
//   await conn.execute(sql);
//   return res.redirect(`/cities/${cityId}`);
// });

// Run server!
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
