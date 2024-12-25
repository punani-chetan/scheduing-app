// controllers/employeeController.js
import Employee from "../models/Employee.js";

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll(); // Fetch all employees from the database

    if (employees.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    }

    res.status(200).json(employees); // Return the employees data
  } catch (error) {
    console.error("Error fetching employees:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching employees" });
  }
};