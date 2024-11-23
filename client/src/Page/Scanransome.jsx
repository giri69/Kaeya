import React, { useState, useEffect } from "react";

// Simulated file data
const files = [
  { name: "document1.txt", isRansomware: false },
  { name: "report.xlsx", isRansomware: false },
  { name: "virus.exe", isRansomware: true },
  { name: "presentation.ppt", isRansomware: false },
  { name: "malware.dll", isRansomware: true },
  { name: "photo.jpg", isRansomware: false },
];

const ScanRansomware = () => {
  const [scannedFiles, setScannedFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate file scanning (delayed to mimic an API call)
    const simulateScan = () => {
      setScannedFiles(files);
      setLoading(false);
    };

    const timer = setTimeout(simulateScan, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 px-4 py-8">
      <div className="max-w-6xl w-full bg-gray-900 text-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-blue-400 text-center mb-6">
          Ransomware File Scanner
        </h1>
        <p className="text-gray-300 text-center mb-8">
          Scanning your files for potential ransomware threats...
        </p>

        {loading ? (
          <div className="flex flex-col items-center justify-center">
            <div className="loader rounded-full border-t-4 border-blue-400 w-12 h-12 mb-4"></div>
            <p className="text-gray-400 text-lg">Scanning...</p>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default ScanRansomware;
