'use strict';
module.exports = (sequelize, DataTypes) => {
  const Especialidades = sequelize.define('Especialidades', {
    nombre: DataTypes.STRING,
    /////no entiendo
    
  }, {});
  Especialidades.associate = function(models) {
    // associations can be defined here
    Doctores.belongsTo(models.Cuadernos, {
      foreignKey: 'idCuaderno',
      onDelete: 'CASCADE'
    });
  };
  return Especialidades;
};