import express from "express";
import { getAllEmployees } from "../controllers/employeeController.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.get("/", auth, getAllEmployees);

export default router;
