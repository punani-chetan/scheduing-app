import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ScheduleEmployee = sequelize.define(
  "ScheduleEmployee",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    scheduleId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Schedules",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    employeeId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Employees",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "schedule_employees",
    timestamps: true,
  }
);

export default ScheduleEmployee;
