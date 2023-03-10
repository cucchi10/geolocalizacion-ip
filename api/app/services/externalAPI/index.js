const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);
const externalControllers = {};

// Initializing controllers
fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-13) === 'controller.js',
  )
  .forEach((file) => {
    const controller = require(path.join(__dirname, file));
    externalControllers[controller.name] = controller;
  });

module.exports = externalControllers;
