const Redis = require('ioredis');
const { env } = require('../../config/config');

const config = require(`${__dirname}/../../config/cache.config.js`)[env];

let instance = null;

module.exports = function getCacheInstance() {
  if (!instance) {
    instance = new Redis({
      host: config.host,
      port: config.port,
    });
  }
  return instance;
};
