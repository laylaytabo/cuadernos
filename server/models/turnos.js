'use strict';
module.exports = (sequelize, DataTypes) => {
  const Turnos = sequelize.define('Turnos', {
    turno: DataTypes.STRING,
    sala: DataTypes.STRING,
    idFecha: { 
      type: DataTypes.INTEGER,
      allowNull:{
        args: false,
      }
    }
  }, {});
  Turnos.associate = function(models) {
    // associations can be defined here
    Turnos.belongsTo(models.Cuadernos, {
      foreignKey: 'idCuadernos',
      onDelete: 'CASCADE'
    });
  };
  return Turnos;
};