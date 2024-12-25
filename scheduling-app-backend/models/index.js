"use strict";

import { readdirSync } from "fs";
import { basename, join } from "path";
import { Sequelize } from "sequelize";
import config from "../config/config.js"; // Import config

const basenameFile = basename(import.meta.url); // Get the current file name
const env = process.env.NODE_ENV || "development"; // Default to 'development'
const configData = config[env]; // Get the config for the current environment

// Create a new Sequelize instance using the config data
const sequelize = new Sequelize(config.development.url, {
  dialect: "postgres",
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the PostgreSQL database established successfully."
    );
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

// Initialize an empty object to hold the models
const db = {};

// Read and import all the models dynamically
readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file !== basenameFile &&
      file.slice(-3) === ".js" &&
      !file.includes(".test.js")
  )
  .forEach((file) => {
    const model = import(join(__dirname, file)); // Dynamically import each model file
    db[model.name] = model; // Store the model in the db object
  });

// Set up model associations if they exist
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db); // Call the associate method for each model
  }
});

db.sequelize = sequelize; // Add the sequelize instance to the db object
db.Sequelize = Sequelize; // Add Sequelize to the db object for easy reference

export default db; // Export the db object containing all models and sequelize instance
