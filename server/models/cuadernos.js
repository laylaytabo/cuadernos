'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cuadernos = sequelize.define('Cuadernos', {
    titulo: DataTypes.TEXT,
    grupo: DataTypes.TEXT
  }, {});
  Cuadernos.associate = function(models) {
    // associations can be defined here
    Cuadernos.belongsTo(models.Turnos, {
      foreignKey: 'idTurno',
      onDelete: 'CASCADE'
    });
  };
  return Cuadernos;
};