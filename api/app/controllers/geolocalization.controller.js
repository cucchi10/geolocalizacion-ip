const { literal } = require('sequelize');
const models = require('../models');
const { isValidIp } = require('../utils/validations');
const CustomError = require('../services/CustomError');
const cacheController = require('../services/cache/cacheController');
const { apiExternalController } = require('../services/externalAPI/index');
const { buildResponseIpInfo, buildResponseStatistics } = require('../utils/response');

async function getIpInfo(ip) {
  try {
    // Start Transaction
    const result = await models.sequelize.transaction(async (transaction) => {
      let data = await cacheController.getData(ip);
      if (!data) {
        data = await apiExternalController.getIpInfo(ip);

        await cacheController.setData(ip, data);
      }

      const response = await buildResponseIpInfo(data);

      const [location, created] = await models.geolocalization.findOrCreate({
        where: { country: data.country_name, city: data.city },
        defaults: { distance: response.distance, touch: 1 },
        transaction,
      });

      if (!created) {
        location.update({ touch: location.touch + 1 }, transaction);
      }

      await cacheController.delGeolocalization();

      delete response.distance;
      return response;
    });
    return result;
  } catch (error) {
    throw new CustomError(error.message, error.status);
  }
}

async function getStatistics() {
  try {
    // Start Transaction
    const result = await models.sequelize.transaction(async (transaction) => {
      let data = await cacheController.getGeolocalization();

      if (!data) {
        const maxDistance = await models.geolocalization.findOne({
          attributes: ['country', 'city', 'distance'],
          order: [['distance', 'DESC']],
          raw: true,
        }, { transaction });
        const minDistance = await models.geolocalization.findOne({
          attributes: ['country', 'city', 'distance'],
          order: [['distance', 'ASC']],
          raw: true,
        }, { transaction });
        const averageDistance = await models.geolocalization.findOne({
          attributes: [[literal('SUM(distance * touch) / (COUNT(*) * SUM(touch))'), 'average_distance']],
        }, { transaction });
        data = buildResponseStatistics({ averageDistance, maxDistance, minDistance });
        await cacheController.setGeolocalization(data);
      }

      return data;
    });
    return result;
  } catch (error) {
    throw new CustomError(error.message, error.status);
  }
}

module.exports = {
  name: 'geolocalizationController',

  index: async (req, res, next) => {
    try {
      const result = await getStatistics();
      res.status(200).send(result);
      res.end();
    } catch (error) {
      // Transaction Failed!
      next(error);
    }
  },

  getIpInfoByBody: async (req, res, next) => {
    try {
      const { ip } = req.body;

      if (!ip || !isValidIp(ip)) throw new CustomError('La IP es incorrecta', 400);

      const result = await getIpInfo(ip);

      res.status(200).send(result);
      res.end();
    } catch (error) {
      // Transaction Failed!
      next(error);
    }
  },

  getIpInfoByParams: async (req, res, next) => {
    try {
      const { ip } = req.params;

      if (!ip || !isValidIp(ip)) throw new CustomError('La IP es incorrecta', 400);

      const result = await getIpInfo(ip);

      res.status(200).send(result);
      res.end();
    } catch (error) {
      // Transaction Failed!
      next(error);
    }
  },

};
