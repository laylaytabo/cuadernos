'use strict';
module.exports = (sequelize, DataTypes) => {
  const Fechas = sequelize.define('Fechas', {
    fechaini: DataTypes.DATE,
    fechafin: DataTypes.DATE,
    id_doctor: DataTypes.INTEGER
  }, {});
  Fechas.associate = function(models) {
    // associations can be defined here
    Fechas.hasMany(models.Turnos, {
      foreignKey: 'idFecha',
    });
    Fechas.belongsTo(models.Doctores, {
      foreignKey: 'id_doctor',
      onDelete: 'CASCADE'
    });
  };
  return Fechas;
};