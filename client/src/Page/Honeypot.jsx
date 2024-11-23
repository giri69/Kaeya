import React from "react";

const honeypotLogs = [
  { timestamp: "2024-11-24 14:23:45", sourceIP: "192.168.1.5", attackType: "SSH Brute Force", status: "Blocked" },
  { timestamp: "2024-11-24 14:26:10", sourceIP: "203.0.113.42", attackType: "SQL Injection", status: "Blocked" },
  { timestamp: "2024-11-24 14:30:33", sourceIP: "198.51.100.14", attackType: "Port Scan", status: "Monitored" },
  { timestamp: "2024-11-24 14:40:12", sourceIP: "172.16.0.12", attackType: "DDoS", status: "Blocked" },
  { timestamp: "2024-11-24 14:45:55", sourceIP: "10.0.0.8", attackType: "Credential Stuffing", status: "Monitored" },
];

const Honeypot = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 p-6">
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
                  Source IP
                </th>
                <th className="text-gray-300 text-sm font-semibold py-2 px-4 border-b border-gray-700">
                  Attack Type
                </th>
                <th className="text-gray-300 text-sm font-semibold py-2 px-4 border-b border-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {honeypotLogs.map((log, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-700 transition-all duration-200"
                >
                  <td className="text-gray-300 text-sm py-2 px-4 border-b border-gray-700">
                    {log.timestamp}
                  </td>
                  <td className="text-gray-300 text-sm py-2 px-4 border-b border-gray-700">
                    {log.sourceIP}
                  </td>
                  <td className="text-gray-300 text-sm py-2 px-4 border-b border-gray-700">
                    {log.attackType}
                  </td>
                  <td
                    className={`text-sm py-2 px-4 border-b border-gray-700 font-semibold ${
                      log.status === "Blocked"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {log.status}
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
