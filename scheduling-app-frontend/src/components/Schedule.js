import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  TextField,
  Button,
  Box,
  FormControl,
} from "@mui/material";
import { toast } from "react-toastify";
import { fetchEmployees, scheduleTask } from "../services/scheduleService";

const Schedule = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(false);
  const [dateError, setDateError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const employeeData = await fetchEmployees();
        setEmployees(employeeData.data);
      } catch (error) {
        toast.error("Failed to fetch employees");
      }
    }
    fetchData();
  }, []);

  const handleEmployeeSelection = (id) => {
    setSelectedEmployees((prev) =>
      prev.includes(id) ? prev.filter((emp) => emp !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    setDateError(false);
    setCommentError(false);

    // Validate date - must be a future date
    const selectedDate = new Date(scheduleDate).getTime();
    if (selectedDate < Date.now()) {
      setDateError(true);
      toast.error("Please select a future date.");
      return;
    }

    // Validate comment - max 200 characters
    if (comment.length > 200) {
      setCommentError(true);
      toast.error("Comment must be between 1 and 200 characters.");
      return;
    }

    try {
      const response = await scheduleTask({
        selectedEmployees,
        scheduleDate,
        scheduleTime,
        comment,
      });
      if (response.status === 201) {
        toast.success("Schedule created successfully.");
        setScheduleDate("");
        setScheduleTime("");
        setComment("");
        setSelectedEmployees([]);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to create schedule.");
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" sx={{ marginTop: 2, textAlign: "center" }}>
        Schedule Task
      </Typography>

      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={12}>
          <Typography variant="h6">Select Employees</Typography>
          <Box
            sx={{
              maxHeight: 300,
              overflowY: "auto",
              border: "1px solid #ccc",
              borderRadius: 1,
              padding: 1,
            }}
          >
            {employees.map((employee) => (
              <FormControlLabel
                key={employee.id}
                control={
                  <Checkbox
                    checked={selectedEmployees.includes(employee.id)}
                    onChange={() => handleEmployeeSelection(employee.id)}
                  />
                }
                label={employee.name}
              />
            ))}
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Schedule Date"
            type="date"
            fullWidth
            value={scheduleDate}
            onChange={(e) => setScheduleDate(e.target.value)}
            required
            InputLabelProps={{
              shrink: true,
            }}
            error={dateError}
            helperText={dateError && "Please select a future date."}
            inputProps={{
              min: new Date().toISOString().split("T")[0], // Disable past dates
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Schedule Time"
            type="time"
            fullWidth
            value={scheduleTime}
            onChange={(e) => setScheduleTime(e.target.value)}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Schedule Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              fullWidth
              multiline
              rows={4}
              inputProps={{ maxLength: 200 }}
              required
              error={commentError}
              helperText={
                commentError
                  ? "Comment must be between 1 and 200 characters."
                  : `${comment.length}/200`
              }
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ textAlign: "center", marginTop: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Schedule;
