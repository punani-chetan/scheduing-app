import bcrypt from "bcrypt";
import User from "../models/User.js";
import Employee from "../models/Employee.js";

const seedData = async () => {
  try {
    // Check if there are any users in the database
    const userCount = await User.count();
    if (userCount === 0) {
      const hashedPassword = await bcrypt.hash("admin123", 10);

      // Add Admin User
      await User.create({
        username: "admin",
        password: hashedPassword,
        email: "chetan.punani@bacancy.com",
        role: "Admin",
      });
      console.log("Admin user seeded");
    }

    // Check if there are any employees in the database
    const employeeCount = await Employee.count();
    if (employeeCount === 0) {
      await Employee.bulkCreate([
        { name: "Chetan Punani", email: "chetan.punani@bacancy.com" },
        { name: "John Doe", email: "john@example.com" },
        { name: "Jane Smith", email: "jane@example.com" },
      ]);
      console.log("Employees seeded");
    }
  } catch (error) {
    console.error("Error seeding data:", error.message);
  }
};

export default seedData;
