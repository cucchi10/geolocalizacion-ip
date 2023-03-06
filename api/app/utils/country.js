const constants = require('./constants');
const cacheController = require('../services/cache/cacheController');
const { apiExternalController } = require('../services/externalAPI/index');

const getCountryCache = async (shortName) => {
  let dataCountry = await cacheController.getData(shortName);
  if (!dataCountry) {
    const countrys = await apiExternalController.getAllCountrys();
    countrys.map((country) => {
      if (country.cca2 === shortName) dataCountry = { currencies: country.currencies, timezones: country.timezones };
      return cacheController.setData(country.cca2, { currencies: country.currencies, timezones: country.timezones });
    });
  }
  return dataCountry;
};

const toRadians = (degrees) => (degrees * Math.PI) / 180;

const calculateDistanceAtBsAs = (lat, long) => {
  const { LAT: BS_LAT, LONG: BS_LONG } = constants.BUENOS_AIRES_DISTANCE;
  // Lat and Long of Buenos Aires
  const bsLatRads = toRadians(BS_LAT);
  const bslongtRads = toRadians(BS_LONG);

  const latRads = toRadians(lat);
  const longRads = toRadians(long);

  const diferenceLat = latRads - bsLatRads;
  const diferenceLatLong = longRads - bslongtRads;

  const Haversine =
    (Math.sin(diferenceLat / 2) * Math.sin(diferenceLatLong / 2) +
    Math.sin(diferenceLatLong / 2) *
    Math.sin(diferenceLat / 2) *
    Math.cos(bsLatRads) *
    Math.cos(latRads));
  let result = Math.trunc(constants.EARTH_RADIUS * (2 * Math.atan2(Math.sqrt(Haversine), Math.sqrt(1 - Haversine))));
  if (!result) {
    result = 0;
  }
  return result;
};

const getCountryZoneTimes = (timeZones, currentTime) => timeZones
  .map((tz) => {
    const date = currentTime.setZone(tz);
    return `${date.toFormat('HH:mm:ss')} (${tz})`;
  })
  .join(' o ');

const getCountryLanguages = (languages) => languages
  .map((language) => `${language.name} (${language.code})`)
  .join(' | ');

const getCountryCurrencys = async (currencies) => {
  const currencyCodes = Object.keys(currencies);
  const currencyExchange = await apiExternalController.getCurrencyAtUsd(currencyCodes);

  return currencyCodes
    .map((currency) => {
      if (!currencyExchange.rates[currency]) {
        return `${currency} - No disponible`;
      }

      return `${currency} (1 ${currency} = ${(
        1 / currencyExchange.rates[currency]
      ).toFixed(2)} U$$)`;
    })
    .join(' | ');
};

const formatDistanceMessage = (distance, latlng) => {
  const { LAT: BS_LAT, LONG: BS_LONG } = constants.BUENOS_AIRES_DISTANCE;
  return `${distance} Kms (${BS_LAT.toFixed(0)}, ${BS_LONG.toFixed(0)}) a (${latlng.join(', ')})`;
};

module.exports = {
  name: 'country',
  getCountryCurrencys,
  getCountryLanguages,
  getCountryZoneTimes,
  calculateDistanceAtBsAs,
  formatDistanceMessage,
  getCountryCache,
};
