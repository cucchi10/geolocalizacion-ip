const constants = require('../../utils/constants');
const cacheService = require('./cacheService');

const setData = async (key, data) => {
  await cacheService.set(key, JSON.stringify(data), 300, true);
};

const getData = async (key) => {
  const data = await cacheService.get(key);
  return JSON.parse(data);
};

const getGeolocalization = async () => {
  const data = await getData(constants.CACHE.GEOLOCALIZATION);
  return JSON.parse(data);
};

const setGeolocalization = async (data) => { await setData(constants.CACHE.GEOLOCALIZATION, JSON.stringify(data)); };

const delGeolocalization = async () => { await cacheService.del(constants.CACHE.GEOLOCALIZATION); };

module.exports = {
  name: 'cacheController',
  getGeolocalization,
  setGeolocalization,
  delGeolocalization,
  getData,
  setData,
};
