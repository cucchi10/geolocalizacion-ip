const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class geolocalization extends Model {
    static associate() {
    }
  }
  geolocalization.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    country: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    city: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    distance: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    touch: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    tableName: 'geolocalization',
    paranoid: true,
  });
  return geolocalization;
};
