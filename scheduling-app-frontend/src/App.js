import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Schedule from "./components/Schedule";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/schedule"
        element={
          <ProtectedRoute>
            <Schedule />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
