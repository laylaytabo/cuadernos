'use strict';
module.exports = (sequelize, DataTypes) => {
  const Fechas = sequelize.define('Fechas', {
    fechaini: DataTypes.DATE,
    fechafin: DataTypes.DATE,
    codDoctor: DataTypes.INTEGER
  }, {});
  Fechas.associate = function(models) {
    // associations can be defined here
  };
  return Fechas;
};