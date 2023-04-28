/* Import dependencies */
import express from "express";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import DatabaseService from "./services/database.service.mjs";
import session from "express-session";

/* Create express instance */
const app = express();
const port = 3000;

/* Add form data middleware */
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "verysecretkey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

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
// Finding the country by code
app.get("/country/:code", async (req, res) => {
  const code = req.params.code;
  const [rows,fields] = await db.getCountry(code);
  return res.render("countries", {rows, fields});
});

app.get("/country/confirm/:code", async (req, res) => {
  const code = req.params.code;
  const country = await db.getCountry(code);
  return res.render('confirmation', { country });
});

app.delete("/country/:code", async (req, res) =>{
  const code = req.params.code;
  const result = await db.deleteCountry(code);
  alert('Data removed successfully!');
  return res.redirect('/countries/world');
});

// Getting all the countries
app.get("/countries/world", async (req, res) => {
  const [rows,fields] = await db.getCountriesWorld();
  return res.render("countries", {rows, fields});
});
// Route for continents page
app.get("/countries/continents", async (req, res) => {
  const [rows, fields] = await db.getContinents();
  return res.render("continents", {rows, fields, title:'countryContinents'});
});
// Route for regions page
app.get("/countries/regions", async (req, res) => {
  const [rows, fields] = await db.getRegions();
  return res.render("regions", {rows, fields, title:'countryRegions'});
});
// Route for countries page in a specific continent
app.get("/countries/continents/:name", async (req, res) => {
  const continentName = req.params.name;
  const [rows, fields] = await db.getCountriesContinent(continentName);
  return res.render("countries", {rows, fields});
});
// Route for countries page in a specific region
app.get("/countries/regions/:name", async (req, res) => {
  const regionName = req.params.name;
  const [rows, fields] = await db.getCountriesRegion(regionName);
  return res.render("countries", {rows, fields});
});
// Route for countries page with a limit
app.get("/countries/world/:limit", async (req, res) => {
  const continentName = req.params.name;
  const limit = req.params.limit;
  const [rows, fields] = await db.getCountriesWorldLimit(limit);
  return res.render("countries", {rows, fields});
});
// Route for countries page in a specific continent with a limit
app.get("/countries/continents/:name/:limit", async (req, res) => {
  const continentName = req.params.name;
  const limit = req.params.limit;
  const [rows, fields] = await db.getCountriesContinentLimit(continentName, limit);
  return res.render("countries", {rows, fields});
});
// Route for countries page in a specific region with a limit
app.get("/countries/regions/:name/:limit", async (req, res) => {
  const regionName = req.params.name;
  const limit = req.params.limit;
  const [rows, fields] = await db.getCountriesRegionLimit(regionName, limit);
  return res.render("countries", {rows, fields});
});

// Finding capital city by id
app.get("/capitalCity/:id", async (req, res) => {
  const code = req.params.code;
  const [rows,fields] = await db.getCapitalCity(id);
  return res.render("capitalCities", {rows, fields});
});
// Route for all capital cities page
app.get("/capitalCities/world", async (req, res) => {
  const [rows,fields] = await db.getCapitalCitiesWorld();
  return res.render("capitalCities", {rows, fields});
});
// Route for continents page
app.get("/capitalCities/continents", async (req, res) => {
  const [rows, fields] = await db.getContinents();
  return res.render("continents", {rows, fields, title:'capitalCityContinents'});
});
// Route for region page
app.get("/capitalCities/regions", async (req, res) => {
  const [rows, fields] = await db.getRegions();
  return res.render("regions", {rows, fields, title:'capitalCityRegions'});
});
// Route for capital cities in a specific continent
app.get("/capitalCities/continents/:name", async (req, res) => {
  const continentName = req.params.name;
  const [rows, fields] = await db.getCapitalCitiesContinent(continentName);
  return res.render("capitalCities", {rows, fields});
});
// Route for capital cities in a specific region
app.get("/capitalCities/regions/:name", async (req, res) => {
  const regionName = req.params.name;
  const [rows, fields] = await db.getCapitalCitiesRegion(regionName);
  return res.render("capitalCities", {rows, fields});
});
// Route for all capital cities in world with limit
app.get("/capitalCities/world/:limit", async (req, res) => {
  const continentName = req.params.name;
  const limit = req.params.limit;
  const [rows, fields] = await db.getCapitalCitiesWorldLimit(limit);
  return res.render("capitalCities", {rows, fields});
});
// Route for capital cities in a specific continent with limit
app.get("/capitalCities/continents/:name/:limit", async (req, res) => {
  const continentName = req.params.name;
  const limit = req.params.limit;
  const [rows, fields] = await db.getCapitalCitiesContinentLimit(continentName, limit);
  return res.render("capitalCities", {rows, fields});
});
// Route for capital cities in a specific region with a limit
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
  return res.render("continents", {rows, fields, title:'cityContinents'});
});

app.get("/cities/regions", async (req, res) => {
  const [rows, fields] = await db.getRegions();
  return res.render("regions", {rows, fields, title:'cityRegions'});
});

app.get("/cities/countries", async (req, res) => {
  const [rows, fields] = await db.getCountryNames();
  return res.render("countryNames", {rows, fields});
});

app.get("/cities/districts", async (req, res) => {
  const [rows, fields] = await db.getDistricts();
  return res.render("districts", {rows, fields});
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
  return res.render("about");
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



/***Login Page *****/
/* Authentication */

// Register
app.get("/register", (req, res) => {
  res.render("register");
});

// Login
app.get("/login", (req, res) => {
  res.render("login");
});

// Account
app.get("/account", async (req, res) => {
  const { auth, userId } = req.session;

  if (!auth) {
    return res.redirect("/login");
  }

  const sql = `SELECT id, email FROM user WHERE user.id = ${userId}`;
  const [results, cols] = await conn.execute(sql);
  const user = results[0];

  res.render("account", { user });
});

app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const sql = `INSERT INTO user (email, password) VALUES ('${email}', '${hashed}')`;
    const [result, _] = await conn.execute(sql);
    const id = result.insertId;
    req.session.auth = true;
    req.session.userId = id;
    return res.redirect("/account");
  } catch (err) {
    console.error(err);
    return res.status(400).send(err.sqlMessage);
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).send("Missing credentials");
  }

  const sql = `SELECT id, password FROM user WHERE email = '${email}'`;
  const [results, cols] = await conn.execute(sql);

  const user = results[0];

  if (!user) {
    return res.status(401).send("User does not exist");
  }

  const { id } = user;
  const hash = user?.password;
  const match = await bcrypt.compare(password, hash);

  if (!match) {
    return res.status(401).send("Invalid password");
  }

  req.session.auth = true;
  req.session.userId = id;

  return res.redirect("/account");
});


// Run server!
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
