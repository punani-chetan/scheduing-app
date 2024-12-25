import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensures that email is unique across users
      validate: {
        isEmail: true, // Validates the value is a proper email format
      },
    },
    role: { type: DataTypes.ENUM("Admin", "User"), defaultValue: "User" },
  },
  {
    tableName: "users", // Optional: Sequelize will automatically pluralize 'User' to 'users'
    timestamps: true, // Optional: Enables createdAt and updatedAt fields
  }
);

export default User;
