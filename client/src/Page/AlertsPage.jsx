import React, { useState } from "react";
import { Box, Typography, Checkbox, FormControlLabel, List, ListItem } from "@mui/material";

const fakeAlerts = [
  { id: 1, message: "Ransomware activity detected on Server 1", isAcknowledged: false },
  { id: 2, message: "Suspicious login detected from IP: 192.168.1.101", isAcknowledged: false },
  { id: 3, message: "Malware signature identified in uploaded file", isAcknowledged: false },
];

const AlertsPage = () => {
  const [alerts, setAlerts] = useState(fakeAlerts);

  // Handle checkbox toggle
  const toggleAcknowledgment = (id) => {
    setAlerts((prevAlerts) =>
      prevAlerts.map((alert) =>
        alert.id === id ? { ...alert, isAcknowledged: !alert.isAcknowledged } : alert
      )
    );
  };

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
    </Box>
  );
};

export default AlertsPage;
