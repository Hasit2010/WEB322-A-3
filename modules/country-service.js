const countryData = require("../data/countryData");
const subRegionData = require("../data/subRegionData");

let countries = [];

function initialize() {
  return new Promise((resolve, reject) => {
    try {
      countries = countryData.map((country) => {
        let subRegionObj = subRegionData.find(
          (subRegion) => subRegion.id === country.subRegionId
        );
        return { ...country, subRegionObj };
      });
      resolve();
    } catch (err) {
      reject("Error initializing country data: " + err);
    }
  });
}

function getAllCountries() {
  return new Promise((resolve, reject) => {
    if (countries.length > 0) {
      resolve(countries);
    } else {
      reject("No countries available");
    }
  });
}

function getCountryById(id) {
  return new Promise((resolve, reject) => {
    const country = countries.find((country) => country.id === id);
    if (country) {
      resolve(country);
    } else {
      reject("Country not found with id: " + id);
    }
  });
}

function getCountriesBySubRegion(subRegion) {
  return new Promise((resolve, reject) => {
    const matchedCountries = countries.filter((country) =>
      country.subRegionObj.subRegion
        .toLowerCase()
        .includes(subRegion.toLowerCase())
    );
    if (matchedCountries.length > 0) {
      resolve(matchedCountries);
    } else {
      reject("No countries found in sub-region: " + subRegion);
    }
  });
}

function getCountriesByRegion(region) {
  return new Promise((resolve, reject) => {
    const matchedCountries = countries.filter((country) =>
      country.subRegionObj.region.toLowerCase().includes(region.toLowerCase())
    );
    if (matchedCountries.length > 0) {
      resolve(matchedCountries);
    } else {
      reject("No countries found in region: " + region);
    }
  });
}

module.exports = {
  initialize,
  getAllCountries,
  getCountryById,
  getCountriesBySubRegion,
  getCountriesByRegion,
};
