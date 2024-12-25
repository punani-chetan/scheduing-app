"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("schedules", "notificationTimes", {
      type: Sequelize.JSON, // Store array of trigger times
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("schedules", "notificationTimes");
  },
};
