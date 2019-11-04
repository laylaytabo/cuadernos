'use strict';
module.exports = (sequelize, DataTypes) => {
  const prueba_fechas = sequelize.define('prueba_fechas', {
    fecha: DataTypes.STRING
  }, {});
  prueba_fechas.associate = function(models) {
    // associations can be defined here
  };
  return prueba_fechas;
};