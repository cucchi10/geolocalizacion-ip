const { Router } = require('express');
const { geolocalizationController } = require('../controllers/index');

const router = Router();

router.get('/', [], geolocalizationController.index);
router.get('/:ip', [], geolocalizationController.getIpInfoByParams);
router.post('/ip', [], geolocalizationController.getIpInfoByBody);

module.exports = {
  basePath: '/api',
  router,
};
