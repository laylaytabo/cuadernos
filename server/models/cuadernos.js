'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cuadernos = sequelize.define('Cuadernos', {
    titulo: DataTypes.TEXT,
    grupo: DataTypes.TEXT
  }, {});
  Cuadernos.associate = function(models) {
    // associations can be defined here
    Cuadernos.hasMany(models.Doctores, {
      foreignKey: 'idCuaderno',
    });
  };
  return Cuadernos;
};