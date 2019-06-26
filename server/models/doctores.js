'use strict';
module.exports = (sequelize, DataTypes) => {
  const Doctores = sequelize.define('Doctores', {
    nombre: DataTypes.STRING,
    TDoctor:DataTypes.STRING,
    enfermera:DataTypes.STRING,
    idCuaderno: { 
      type: DataTypes.INTEGER,
      allowNull:{
        args: false,
      }
    },
    id_espcialidad:DataTypes.INTEGER
  }, {});
  Doctores.associate = function(models) {
    // associations can be defined here
    Doctores.hasMany(models.Fechas, {
      foreignKey: 'id_doctor',
    });
    Doctores.belongsTo(models.Cuadernos, {
      foreignKey: 'idCuaderno',
      onDelete: 'CASCADE'
    });
    Doctores.belongsTo(models.Especialidades, {
      foreignKey: 'id_espcialidad',
      onDelete: 'CASCADE'
    });
  };
  return Doctores;
};