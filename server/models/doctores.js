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
    id_ConsultaEspecialidad:DataTypes.INTEGER
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
    Doctores.belongsTo(models.Consulta_especilaida, {
      foreignKey: 'id_ConsultaEspecialidad',
      onDelete: 'CASCADE'
    });
  };
  return Doctores;
};