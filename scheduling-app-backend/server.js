import express from "express";
import cors from "cors";
import sequelize from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import seedData from "./utils/seedData.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/employees", employeeRoutes);

sequelize
  .authenticate()
  .then(async () => {
    console.log("Connection has been established successfully.");
    // Seed data on the first run
    await seedData();
    await sequelize.sync({ alter: true });
    console.log("Tables created (if not exist)");
  })
  .catch((err) =>
    console.error("Connection has been established successfully.: " + err)
  );

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
