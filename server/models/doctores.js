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
    }
  }, {});
  Doctores.associate = function(models) {
    // associations can be defined here
    Doctores.belongsTo(models.Cuadernos, {
      foreignKey: 'idCuaderno',
      onDelete: 'CASCADE'
    });
  };
  return Doctores;
};