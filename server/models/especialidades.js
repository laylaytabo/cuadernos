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
    Especialidades.hasMany(models.Consulta_especilaida, {
      foreignKey: 'id_especialidad',
    });
    Especialidades.hasMany(models.especialidad_doctor, {
      foreignKey: 'id_especialidad',
    });
  };
  return Especialidades;
};