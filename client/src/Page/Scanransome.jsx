import React, { useState } from "react";
import axios from "axios";

const ScanRansomware = () => {
  const [scannedFiles, setScannedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to trigger an alert if ransomware is detected
  const handleAlert = async () => {
    try {
      // Retrieve user ID from local storage
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.id) {
        throw new Error("User ID not found in local storage");
      }

      // API call to send alert
      await axios.post("http://localhost:8000/alert/", {
        user_id: user.id,
        alert_title: "Ransomware detected",
      });

      alert("Ransomware detected! An alert has been sent.");
    } catch (err) {
      console.error("Failed to send alert:", err);
      alert("Failed to send alert. Please try again.");
    }
  };

  const triggerScan = async () => {
    try {
      setLoading(true);
      setError(null);
      setScannedFiles([]);

      // API call to get ransomware predictions
      const response = await axios.get("http://localhost:8000/model/predict-ransomware");
      const files = response.data;

      setScannedFiles(files);

      // Check if any file is ransomware and trigger the alert
      if (files.some((file) => file.isRansomware)) {
        handleAlert();
      }
    } catch (err) {
      setError("Failed to fetch scan results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 px-4 py-8">
      <div className="max-w-6xl w-full bg-gray-900 text-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-blue-400 text-center mb-6">
          Ransomware File Scanner
        </h1>
        <p className="text-gray-300 text-center mb-8">
          Scan your files for potential ransomware threats.
        </p>

        <button
          onClick={triggerScan}
          disabled={loading}
          className={`mb-6 w-full py-3 rounded-lg text-white font-semibold ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Scanning..." : "Start Scan"}
        </button>

        {error && <p className="text-red-500 text-center mb-6">{error}</p>}

        {loading ? (
          <div className="flex flex-col items-center justify-center">
            <div className="loader rounded-full border-t-4 border-blue-400 w-12 h-12 mb-4"></div>
            <p className="text-gray-400 text-lg">Scanning...</p>
          </div>
        ) : (
          scannedFiles.length > 0 && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-200 mb-4">
                Scan Results:
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {scannedFiles.map((file, index) => (
                  <li
                    key={index}
                    className={`p-4 rounded-lg flex justify-between items-center transition transform ${
                      file.isRansomware
                        ? "bg-red-500 hover:scale-105 text-white"
                        : "bg-gray-700 hover:bg-gray-600 hover:scale-105 text-gray-300"
                    }`}
                  >
                    <span className="truncate">{file.name}</span>
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded-lg ${
                        file.isRansomware
                          ? "bg-red-800 text-red-200"
                          : "bg-green-800 text-green-200"
                      }`}
                    >
                      {file.isRansomware ? "Ransomware" : "Safe"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ScanRansomware;
