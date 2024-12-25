import express from "express";
import { createSchedule } from "../controllers/scheduleController.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.post("/", auth, createSchedule);

export default router;
