"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("schedule_employees", {
      scheduleId: {
        type: Sequelize.INTEGER,
        references: {
          model: "schedules", // Table name
          key: "id",
        },
        onDelete: "CASCADE",
      },
      employeeId: {
        type: Sequelize.INTEGER,
        references: {
          model: "employees", // Table name
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
