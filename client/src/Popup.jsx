import React, { useState } from "react";
import { Modal, Box, Button, Typography } from "@mui/material";

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
  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Simulate ransomware detection
  const detectRansomware = () => {
    handleOpen();
  };

  return (
    <div
      style={{
        // backgroundColor: "#121212",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
      }}
    >

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
