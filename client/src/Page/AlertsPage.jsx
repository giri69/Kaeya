import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const AlertsPage = () => {
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  // Fetch alerts from API
  const fetchAlerts = async () => {
    setLoading(true); // Start loading
    setError(null); // Reset error
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.id) {
        throw new Error("User ID not found in local storage");
      }
      const userId = user.id;

      const response = await axios.get(`http://localhost:8000/alert/${userId}`);
      setAlerts(response.data);
    } catch (err) {
      setError(err.message || "Failed to fetch alerts.");
    } finally {
      setLoading(false); // End loading
    }
  };

  // Update acknowledgment status using API
  const toggleAcknowledgment = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.id) {
        throw new Error("User ID not found in local storage");
      }
      const userId = user.id;

      await axios.put(`http://localhost:8000/alert/${userId}/viewed`, { alert_id: id });
      setAlerts((prevAlerts) =>
        prevAlerts.map((alert) =>
          alert.id === id ? { ...alert, isAcknowledged: !alert.isAcknowledged } : alert
        )
      );
    } catch (err) {
      setError(err.message || "Failed to update acknowledgment status.");
    }
  };

  // Fetch alerts on component mount
  useEffect(() => {
    fetchAlerts();
  }, []);

  // Sort alerts so that non-acknowledged ones appear first
  const sortedAlerts = [...alerts].sort((a, b) => a.isAcknowledged - b.isAcknowledged);

  return (
    <Box
      sx={{
        backgroundColor: "#121212",
        color: "#ffffff",
        minHeight: "100vh",
        width: "100vw",
        padding: "20px",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          marginBottom: "20px",
          textAlign: "center",
          color: "#00bcd4", // Light blue accent for header
        }}
      >
        Alerts
      </Typography>

      {error && (
        <Typography
          variant="body1"
          sx={{
            color: "#ff3e3e",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          {error}
        </Typography>
      )}

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress sx={{ color: "#00bcd4" }} />
        </Box>
      ) : alerts.length === 0 ? (
        <Typography
          variant="body1"
          sx={{
            color: "#bbbbbb",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          No alerts to display.
        </Typography>
      ) : (
        <List sx={{ width: "100%", maxWidth: 800, margin: "0 auto" }}>
          {sortedAlerts.map((alert) => (
            <ListItem
              key={alert.id}
              sx={{
                marginBottom: "10px",
                padding: "15px",
                borderRadius: "12px",
                backgroundColor: alert.isAcknowledged ? "#2c2c2c" : "#1a2236",
                boxShadow: alert.isAcknowledged
                  ? "none"
                  : "0 8px 15px rgba(0, 188, 212, 0.5)", // Light blue shadow
                border: `2px solid ${
                  alert.isAcknowledged ? "#444444" : "#00bcd4"
                }`, // Light blue border for active alerts
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                opacity: alert.isAcknowledged ? 0.6 : 1,
                transform: alert.isAcknowledged ? "scale(0.98)" : "scale(1)",
                transition: "all 0.3s ease-in-out",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: "16px",
                  fontWeight: alert.isAcknowledged ? "normal" : "bold",
                  color: alert.isAcknowledged ? "#bbbbbb" : "#ffffff", // Dim text for acknowledged alerts
                }}
              >
                {alert.message}
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={alert.isAcknowledged}
                    onChange={() => toggleAcknowledgment(alert.id)}
                    sx={{
                      color: "#00bcd4",
                      "&.Mui-checked": {
                        color: "#00bcd4",
                      },
                    }}
                  />
                }
                label="Acknowledge"
                sx={{ marginLeft: "10px" }}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default AlertsPage;
