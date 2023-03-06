const constants = require('../../utils/constants');
const CustomError = require('../CustomError');
const getCacheInstance = require('./index');

const cache = getCacheInstance();

module.exports = {
  name: 'cacheService',
  set: (key, value, ttl = constants.CACHE.TTL) => {
    try {
      return cache.set(key, value, 'EX', ttl);
    } catch (error) {
      throw new CustomError(error.message, error.status);
    }
  },
  get: (key) => {
    try {
      return cache.get(key);
    } catch (error) {
      throw new CustomError(error.message, error.status);
    }
  },
  del: (key) => {
    try {
      return cache.del(key);
    } catch (error) {
      throw new CustomError(error.message, error.status);
    }
  },
};
