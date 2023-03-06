require('dotenv').config({ path: '../.env' });

module.exports = {
  env: process.env.NODE_ENV || 'development',
  // PORT APP
  port: process.env.PORT,
  // URLS APIS
  geoApi: {
    url: process.env.GEO_API,
    key: process.env.API_KEY_GEO_API,
  },
  countryApi: {
    url: process.env.COUNTRY_API,
  },
  currencyApi: {
    url: process.env.CURRENCY_API,
    key: process.env.API_KEY_CURRENCY_API,
  },

};
