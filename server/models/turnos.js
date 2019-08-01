'use strict';
module.exports = (sequelize, DataTypes) => {
  const Turnos = sequelize.define('Turnos', {
    cantiFicha: DataTypes.INTEGER,
    diasAten: DataTypes.STRING,
    turno: DataTypes.STRING,
    idFechas: { 
      type: DataTypes.INTEGER,
      allowNull:{
        args: false,
      }
    }
  }, {});
  Turnos.associate = function(models) {
    // associations can be defined here
    Turnos.hasMany(models.horas_of_truno, {
      foreignKey: 'id_turnos',
    });
    Turnos.belongsTo(models.Fechas, {
      foreignKey: 'idFechas',
      onDelete: 'CASCADE'
    });
  };
  return Turnos;
};