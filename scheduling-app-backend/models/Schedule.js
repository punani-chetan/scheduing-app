import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Schedule = sequelize.define(
  "Schedule",
  {
    adminId: { type: DataTypes.INTEGER, allowNull: false },
    scheduleDate: { type: DataTypes.DATE, allowNull: false },
    scheduleTime: { type: DataTypes.TIME, allowNull: false },
    comment: { type: DataTypes.STRING(200) },
    notificationTimes: { type: DataTypes.ARRAY(DataTypes.DATE) },
  },
  {
    tableName: "schedules",
    timestamps: true,
  }
);

export default Schedule;
