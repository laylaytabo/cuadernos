'use strict';
module.exports = (sequelize, DataTypes) => {
  const especialidad_doctor = sequelize.define('especialidad_doctor', {
    nombre_doctor: DataTypes.TEXT,
    ci: DataTypes.INTEGER,
    id_medico: DataTypes.INTEGER,
    id_especialidad: DataTypes.INTEGER
  }, {});
  especialidad_doctor.associate = function(models) {
    // associations can be defined here
    especialidad_doctor.belongsTo(models.Especialidades, {
      foreignKey: 'id_especialidad',
      onDelete: 'CASCADE'
    });
  };
  return especialidad_doctor;
};
