"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("schedules", "scheduleTime", {
      type: Sequelize.TIME,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("schedules", "scheduleTime");
  },
};
