"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("schedules", "adminId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users", // Ensure your 'users' table has the 'id' column
        key: "id",
      },
      onDelete: "CASCADE", // This will delete associated schedules if the user is deleted
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("schedules", "adminId");
  },
};
