import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function App() {
  const [hasUnreadAlerts, setHasUnreadAlerts] = useState(false);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        // Get user ID from local storage
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.id) {
          console.error("User ID not found in local storage");
          return; // Exit if no user ID
        }
        const userId = user.id;

        // Fetch alerts from the API
        const response = await axios.get(`http://localhost:8000/alert/${userId}`);
        const alerts = response.data;

        // Check if any alert has "viewed": false
        const hasUnviewedAlerts = alerts.some((alert) => alert.viewed === false);
        setHasUnreadAlerts(hasUnviewedAlerts); // Set state if there are unviewed alerts
      } catch (error) {
        console.error("Error fetching alerts:", error.message);
      }
    };

    fetchAlerts();

    // Optional: Poll the API periodically to check for new alerts
    const interval = setInterval(fetchAlerts, 5000); // Check every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <>
      {hasUnreadAlerts && (
        <div className="alert-bar">
          <p>You have unread alerts! Please check them.</p>
        </div>
      )}
      <Outlet />
    </>
  );
}

export default App;
