"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("schedule_employees", {
      id: {
        // Add the primary key column
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      scheduleId: {
        type: Sequelize.INTEGER,
        references: {
          model: "schedules", // The schedules table
          key: "id",
        },
        onDelete: "CASCADE",
      },
      employeeId: {
        type: Sequelize.INTEGER,
        references: {
          model: "employees", // The employees table
          key: "id",
        },
        onDelete: "CASCADE",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("schedule_employees");
  },
};
