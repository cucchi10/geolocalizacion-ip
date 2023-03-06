require('dotenv').config({ path: '../.env' });

module.exports = {
  development: {
    host: 'localhost',
    port: process.env.CACHE_PORT,
  },
  production: {
    host: process.env.CACHE_HOST,
    port: process.env.CACHE_PORT,
  },
};
