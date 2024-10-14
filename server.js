/********************************************************************************
 *  WEB322 – Assignment 03
 *
 *  I declare that this assignment is my own work in accordance with Seneca's
 *  Academic Integrity Policy:
 *
 *  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
 *
 *  Name: Hasit Patel            Student ID: 143320232     Date: 10/15/2024
 *
 *  Published URL: https://vercel.com/hasit2010s-projects/web-322-a-3/6NcKMYdaxd6Y4ANWFwJpbeAREou4
 *
 ********************************************************************************/

const express = require("express");
const path = require("path");
const countryData = require("./modules/country-service");

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// Log middleware for requests
app.use((req, res, next) => {
  console.log(`Request from: ${req.get("user-agent")} [${new Date()}]`);
  next();
});

// Initialize country data and start the server
countryData
  .initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`Server running at: http://localhost:${HTTP_PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error initializing data: " + err);
  });

// GET "/" - Serve home.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/home.html"));
});

// GET "/about" - Serve about.html
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/about.html"));
});

// GET "/countries" - Handle region/subRegion queries
app.get("/countries", (req, res) => {
  const { region, subRegion } = req.query;

  if (region) {
    countryData
      .getCountriesByRegion(region)
      .then((countries) => res.json(countries))
      .catch((err) => res.status(404).send(err));
  } else if (subRegion) {
    countryData
      .getCountriesBySubRegion(subRegion)
      .then((countries) => res.json(countries))
      .catch((err) => res.status(404).send(err));
  } else {
    countryData
      .getAllCountries()
      .then((countries) => res.json(countries))
      .catch((err) => res.status(500).send(err));
  }
});

// GET "/countries/:id" - Get country by ID
app.get("/countries/:id", (req, res) => {
  countryData
    .getCountryById(req.params.id)
    .then((country) => res.json(country))
    .catch((err) => res.status(404).send(err));
});

// Custom 404 error handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "/views/404.html"));
});
