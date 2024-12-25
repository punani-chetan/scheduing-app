import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../services/authService";
import { useAuth } from "../services/authService";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // If already authenticated, redirect to schedule
    if (isAuthenticated) {
      navigate("/schedule");
    }
  }, [isAuthenticated, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username, password });
      console.log(response);
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        navigate("/schedule");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Typography variant="h5">Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ marginTop: 2 }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
