import React, { useState, useEffect, useCallback } from "react";
import { Modal, Box, Button, Typography } from "@mui/material";
import axios from "axios";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#1e1e2f",
  border: "none",
  boxShadow: 24,
  padding: "20px",
  borderRadius: "8px",
  width: "400px",
  textAlign: "center",
  color: "#ffffff",
};

const Appp = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  // Function to check for unviewed alerts
  const fetchAlerts = useCallback(async () => {
    try {
      // Get user ID from local storage
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.id) {
        throw new Error("User ID not found in local storage");
      }
      const userId = user.id;

      // Fetch alerts from the API
      const response = await axios.get(`http://localhost:8000/alert/${userId}`);
      const alerts = response.data;

      // Check if any alert has "viewed": false
      if (alerts.some((alert) => !alert.viewed)) {
        setOpen(true); // Open the modal if unviewed alerts exist
      }
    } catch (err) {
      setError(err.message || "An error occurred while fetching alerts.");
    }
  }, []);

  // Start periodic check for alerts
  useEffect(() => {
    // Trigger alert checks every 2 seconds
    const id = setInterval(fetchAlerts, 2000);
    setIntervalId(id);

    // Cleanup on unmount
    return () => clearInterval(id);
  }, [fetchAlerts]);

  // Manual trigger for fetching alerts
  const triggerAlertCheck = () => {
    fetchAlerts(); // Manually fetch alerts on demand
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {error && (
        <Typography variant="body1" style={{ color: "#ff3e3e", marginBottom: "20px" }}>
          {error}
        </Typography>
      )}
      <div>
        <Button
          onClick={triggerAlertCheck}
          variant="contained"
          style={{
            marginBottom: "20px",
            backgroundColor: "#007bff",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Check Alerts
        </Button>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box style={modalStyle}>
          <Typography variant="h5" style={{ fontWeight: "bold", marginBottom: "10px" }}>
            ⚠️ Ransomware Detected!
          </Typography>
          <Typography variant="body1" style={{ marginBottom: "20px" }}>
            Suspicious activity has been detected. Please take immediate action to secure your system.
          </Typography>
          <Button
            onClick={handleClose}
            variant="contained"
            style={{
              backgroundColor: "#ff3e3e",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Acknowledge
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Appp;
