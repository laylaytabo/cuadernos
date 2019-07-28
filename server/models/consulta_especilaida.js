'use strict';
module.exports = (sequelize, DataTypes) => {
  const Consulta_especilaida = sequelize.define('Consulta_especilaida', {
    nombre: DataTypes.STRING,
    sigla: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    id_especialidad: DataTypes.INTEGER
  }, {});
  Consulta_especilaida.associate = function(models) {
    // associations can be defined here
    Consulta_especilaida.hasMany(models.Doctores, {
      foreignKey: 'id_ConsultaEspecialidad',
    });
    Consulta_especilaida.belongsTo(models.Especialidades, {
      foreignKey: 'id_especialidad',
      onDelete: 'CASCADE'
    });
  };
  return Consulta_especilaida;
};