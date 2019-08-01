'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('horas_of_trunos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      estado: {
        type: Sequelize.STRING(10),
        allowNull: false, 
        defaultValue: "libre"
      },
      hora: {
        type: Sequelize.STRING
      },
      id_turnos: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Turnos',
          key: 'id',
          as: 'id_turnos',
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
    return queryInterface.dropTable('horas_of_trunos');
  }
};