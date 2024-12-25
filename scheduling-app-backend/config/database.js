import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  "postgresql://postgres:postgres@localhost:5432/scheduling_app?schema=public"
);

export default sequelize;
