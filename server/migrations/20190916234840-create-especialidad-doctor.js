'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('especialidad_doctors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre_doctor: {
        type: Sequelize.TEXT
      },
      ci: {
        type: Sequelize.INTEGER
      },
      id_medico: {
        type: Sequelize.INTEGER
      },
      id_especialidad: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Especialidades',
          key: 'id',
          as: 'id_especialidad',
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
    return queryInterface.dropTable('especialidad_doctors');
  }
};