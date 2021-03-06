'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Doctores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      TDoctor: {
        type: Sequelize.STRING
      },
      enfermera:{
        type: Sequelize.STRING
      },
      idCuaderno:{
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Cuadernos',
          key: 'id',
          as: 'idCuaderno',
        }
      },
      id_ConsultaEspecialidad:{
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Consulta_especilaidas',
          key: 'id',
          as: 'id_ConsultaEspecialidad',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Doctores');
  }
};