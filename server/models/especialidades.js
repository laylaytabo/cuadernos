'use strict';
module.exports = (sequelize, DataTypes) => {
  const Especialidades = sequelize.define('Especialidades', {
    nombre: DataTypes.STRING,
    horarios: DataTypes.STRING,
    saldo: DataTypes.STRING
  }, {});
  Especialidades.associate = function(models) {
    // associations can be defined here
  };
  return Especialidades;
};