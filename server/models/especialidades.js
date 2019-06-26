'use strict';
module.exports = (sequelize, DataTypes) => {
  const Especialidades = sequelize.define('Especialidades', {
    nombre: DataTypes.STRING,
    sigla:DataTypes.STRING,
    descripcion:DataTypes.TEXT

    /////no entiendo
    
  }, {});
  Especialidades.associate = function(models) {
    // associations can be defined here
    Especialidades.hasMany(models.Doctores, {
      foreignKey: 'id_espcialidad',
    });
  };
  return Especialidades;
};