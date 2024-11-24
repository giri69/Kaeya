import React, { useEffect, useState } from "react";
import axios from "axios";

const Honeypot = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        // Retrieve user from local storage
        const user = JSON.parse(localStorage.getItem("user")); // Parse the stored JSON string
        if (!user || !user.id) {
          throw new Error("User ID not found in local storage");
        }
        const userId = user.id;

        // Fetch logs from the API
        const response = await axios.get(
          `http://localhost:8000/honey/honeypot/logs/${userId}`
        );
        setLogs(response.data); // Set logs from the response
      } catch (err) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  // Loading state
  if (loading) {
    return <div className="text-white text-center mt-8">Loading logs...</div>;
  }

  // Error state
  if (error) {
    return (
      <div className="text-red-500 text-center mt-8">
        Error: {error}
      </div>
    );
  }

  // Render logs table
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 p-6">
      <div className="max-w-6xl w-full bg-gray-900 text-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-blue-400 text-center mb-6">
          Honeypot Logs
        </h1>
        <p className="text-gray-300 text-center mb-8">
          View the logs of malicious activities detected by our Honeypot.
        </p>
        <div className="bg-gray-800 rounded-lg p-6 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="text-gray-300 text-sm font-semibold py-2 px-4 border-b border-gray-700">
                  Timestamp
                </th>
                <th className="text-gray-300 text-sm font-semibold py-2 px-4 border-b border-gray-700">
                  Log Entry
                </th>
                <th className="text-gray-300 text-sm font-semibold py-2 px-4 border-b border-gray-700">
                  Alert
                </th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr
                  key={log._id}
                  className="hover:bg-gray-700 transition-all duration-200"
                >
                  <td className="text-gray-300 text-sm py-2 px-4 border-b border-gray-700">
                    {log.log_entry.match(/\[([^\]]+)\]/)?.[1]} {/* Extract timestamp from log_entry */}
                  </td>
                  <td className="text-gray-300 text-sm py-2 px-4 border-b border-gray-700">
                    {log.log_entry}
                  </td>
                  <td
                    className={`text-sm py-2 px-4 border-b border-gray-700 font-semibold ${
                      log.alert_flag === "suspicious_activity"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {log.alert_flag}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Honeypot;
