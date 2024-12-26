import Schedule from "../models/Schedule.js";
import ScheduleEmployee from "../models/ScheduleEmployee.js";
import Employee from "../models/Employee.js";
import moment from "moment";

export const createSchedule = async (req, res) => {
  const { scheduleDate, scheduleTime, comment, selectedEmployees } = req.body;
  const adminId = req.user.id;

  try {
    if (
      !Array.isArray(selectedEmployees) ||
      !selectedEmployees.every(Number.isInteger)
    ) {
      return res.status(400).json({
        status: "error",
        message: "Invalid selectedEmployees format. Must be an array of IDs.",
      });
    }

    // Parse schedule date and time
    const scheduleDateTime = moment(
      `${scheduleDate} ${scheduleTime}`,
      "YYYY-MM-DD HH:mm:ss"
    );

    // Calculate notification times (1 hour, 30 minutes, 15 minutes before scheduled time)
    const notificationTimes = [
      scheduleDateTime.subtract(1, "hour").toISOString(),
      scheduleDateTime.add(30, "minutes").toISOString(),
      scheduleDateTime.add(15, "minutes").toISOString(),
    ];

    // Create the schedule and save to the database
    const schedule = await Schedule.create({
      adminId,
      scheduleDate,
      scheduleTime,
      comment,
      notificationTimes,
    });

    // Associate employees with the schedule
    const scheduleEmployeePromises = selectedEmployees.map((employeeId) =>
      ScheduleEmployee.create({ scheduleId: schedule.id, employeeId })
    );
    await Promise.all(scheduleEmployeePromises);

    // Fetch employee details
    const employees = await Employee.findAll({
      where: { id: selectedEmployees },
      attributes: ["id", "name", "email"],
    });

    if (employees.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No employees found with the provided IDs.",
      });
    }

    // At this point, AWS Lambda will handle sending emails at the correct time
    // by triggering the Lambda function based on the stored `notificationTimes`

    // Respond with success message
    res.status(201).json({
      status: "success",
      message: "Schedule created and notifications scheduled successfully!",
    });
  } catch (error) {
    console.error(`Error creating schedule: ${error.message}`);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};
