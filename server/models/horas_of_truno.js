'use strict';
module.exports = (sequelize, DataTypes) => {
  const horas_of_truno = sequelize.define('horas_of_truno', {
    estado: DataTypes.STRING(10),
    hora: DataTypes.STRING,
    id_turnos: DataTypes.INTEGER
  }, {});
  horas_of_truno.associate = function(models) {
    // associations can be defined here
    horas_of_truno.belongsTo(models.Turnos, {
      foreignKey: 'id_turnos',
      onDelete: 'CASCADE'
    });
  };
  return horas_of_truno;
};