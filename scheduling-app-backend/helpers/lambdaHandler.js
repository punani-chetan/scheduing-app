import AWS from "aws-sdk";
import Schedule from "../models/Schedule.js";
import Employee from "../models/Employee.js";
import moment from "moment";

const ses = new AWS.SES({ region: "us-east-1" });

export const sendEmailNotifications = async (event) => {
  try {
    // Get the current timestamp (in ISO format) to compare against schedule notification times
    const currentTimestamp = moment().toISOString();

    // Fetch schedules that need notifications
    const schedules = await Schedule.findAll({
      where: {
        notificationTimes: { [Op.contains]: [currentTimestamp] }, // Check for matching notification time
      },
    });

    if (schedules.length === 0) {
      console.log("No schedules found for the current timestamp.");
      return { status: "success", message: "No notifications to send." };
    }

    // Send email notifications for each schedule
    for (const schedule of schedules) {
      const employees = await Employee.findAll({
        where: { id: schedule.selectedEmployees },
        attributes: ["email", "name"],
      });

      if (employees.length === 0) {
        console.log(`No employees found for schedule ${schedule.id}`);
        continue;
      }

      // Send email to each employee
      for (const employee of employees) {
        const emailParams = {
          Source: process.env.SENDER_EMAIL, // SES verified sender email
          Destination: { ToAddresses: [employee.email] },
          Message: {
            Subject: { Data: "Schedule Notification" },
            Body: {
              Text: {
                Data: `Hello ${employee.name},\n\nReminder: ${schedule.comment}\nScheduled time: ${schedule.scheduleTime}\n\nBest regards.`,
              },
            },
          },
        };

        await ses.sendEmail(emailParams).promise();
        console.log(
          `Sent email to ${employee.email} for schedule ${schedule.id}`
        );
      }
    }

    // After all notifications, send an email to the admin (once last notification is sent)
    const adminEmail = "admin@example.com"; // Set admin email
    const adminEmailParams = {
      Source: process.env.SENDER_EMAIL,
      Destination: { ToAddresses: [adminEmail] },
      Message: {
        Subject: { Data: "All Schedule Notifications Sent" },
        Body: {
          Text: {
            Data: "All scheduled notifications have been successfully sent to the selected employees.",
          },
        },
      },
    };

    await ses.sendEmail(adminEmailParams).promise();
    console.log("Admin notified after all emails sent.");

    return {
      status: "success",
      message: "Notifications sent and admin notified.",
    };
  } catch (error) {
    console.error("Error sending notifications:", error);
    throw new Error("Failed to send notifications.");
  }
};
