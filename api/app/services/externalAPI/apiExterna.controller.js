const { get } = require('../ApiService');
const { geoApi, countryApi, currencyApi } = require('../../config/config');

const CustomError = require('../CustomError');

async function getIpInfo(ip) {
  return new Promise((resolve, reject) => {
    get(`${geoApi.url}${ip}`, {
      params: {
        access_key: geoApi.key,
      },
    })
      .then((response) => {
        if (response.status !== 200) throw new CustomError(response.statusText, response.status);
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

async function getAllCountrys() {
  return new Promise((resolve, reject) => {
    get(`${countryApi.url}`)
      .then((response) => {
        if (response.status !== 200) throw new CustomError(response.statusText, response.status);
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

async function getCurrencyAtUsd(codes) {
  const CurrencyCodes = codes.join(',');
  return new Promise((resolve, reject) => {
    get(`${currencyApi.url}`, {
      params: {
        symbols: CurrencyCodes,
        base: 'USD',
      },
      headers: {
        apikey: currencyApi.key,
      },
    })
      .then((response) => {
        if (response.status !== 200) throw new CustomError(response.statusText, response.status);
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = {
  name: 'apiExternalController',
  getIpInfo,
  getAllCountrys,
  getCurrencyAtUsd,
};
