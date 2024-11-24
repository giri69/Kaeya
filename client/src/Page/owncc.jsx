import React, { useState } from "react";

const DetailsPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("python"); 

  const examples = [
    {
      title: "Script",
      pythonCode: `import os
import hashlib
import logging
import json
import glob
import time
import requests
import psutil
from datetime import datetime

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[
        logging.FileHandler("/home/ec2-user/user_routes.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger("LogProcessor")

USER_ID = "673e42eaae9a74869e81275b"
SERVICE_ID = "6741c2aeb6513df77fb4a1af"
LAMBDA_ENDPOINT = "https://c316tf2op8.execute-api.ap-south-1.amazonaws.com/hh"

TRACKER_FILE = "/home/ec2-user/last_processed_tracker.txt"
METRICS_FILE = "/home/ec2-user/metrics.log"

EXCLUDED_LOGS = {
    "dnf.log",
    "messages", "cloud-init-output.log",
    "kern.log",
    "boot.log",
    "dmesg",
    "utmp",
    "lastlog",
    "Xorg.0.log",
    "dnf.librepo.log", "dnf.rpm.log", "cloud-init.log"
}

def get_last_processed():
    if os.path.exists(TRACKER_FILE):
        with open(TRACKER_FILE, "r") as f:
            return f.read().strip()
    return None

def update_last_processed(value):
    with open(TRACKER_FILE, "w") as f:
        f.write(value)

def compute_log_hash(log_entry):
    return hashlib.sha256(log_entry.encode("utf-8")).hexdigest()

def parse_log_line(line):
    """
    Parse a log line to extract the timestamp, level, and message.
    Args:
        line (str): A single line from the log file.
    Returns:
        dict: Parsed log data containing timestamp, level, and message.
    """
    try:
        parts = line.split(" - ", maxsplit=2)
        if len(parts) == 3:
            timestamp, level, message = parts
            return {
                "timestamp": timestamp.strip(),
                "level": level.strip(),
                "message": message.strip()
            }
    except Exception as e:
        logger.error(f"Failed to parse log line: {line} - Error: {str(e)}")
    return None

def collect_system_metrics():
    """
    Collect system metrics and write them to a metrics.log file.
    """
    metrics = {
        "timestamp": datetime.utcnow().isoformat(),
        "cpu_usage": psutil.cpu_percent(interval=1),
        "memory_usage": psutil.virtual_memory().percent,
        "disk_usage": psutil.disk_usage('/').percent,
        "network_stats": {
            "bytes_sent": psutil.net_io_counters().bytes_sent,
            "bytes_received": psutil.net_io_counters().bytes_recv
        },
        "userId": USER_ID,
        "serviceId": SERVICE_ID
    }
    try:
        with open(METRICS_FILE, "w") as metrics_file:
            json.dump(metrics, metrics_file, indent=4)
        logger.info("System metrics collected and written to metrics.log.")
    except Exception as e:
        logger.error(f"Failed to write system metrics to file: {str(e)}", exc_info=True)
    return metrics

def scan_and_process_logs():
    log_directory = "/var/log"
    last_processed = get_last_processed()
    processed_hashes = set()
    if last_processed:
        processed_hashes.add(last_processed)

    try:
        log_files = glob.glob(f"{log_directory}/*.log")
        new_logs = []

        for log_file in log_files:
            file_name = os.path.basename(log_file)
            if file_name in EXCLUDED_LOGS:
                logger.info(f"Skipping excluded log file: {file_name}")
                continue

            with open(log_file, "r") as f:
                for line in f:
                    log_hash = compute_log_hash(line)
                    if log_hash not in processed_hashes:
                        parsed_log = parse_log_line(line)
                        if parsed_log:
                            new_logs.append({
                                "timestamp": parsed_log["timestamp"],
                                "level": parsed_log["level"],
                                "file_name": file_name,
                                "message": parsed_log["message"],
                                "hash": log_hash
                            })
                            processed_hashes.add(log_hash)

        if new_logs:
            # Collect system metrics and add to the payload
            metrics = collect_system_metrics()
            payload = {
                "userId": USER_ID,
                "serviceId": SERVICE_ID,
                "collection_name": "log",
                "log_batch": new_logs,
                "system_metrics": {
                    "timestamp": metrics["timestamp"],
                    "cpu_usage": metrics["cpu_usage"],
                    "memory_usage": metrics["memory_usage"],
                    "disk_usage": metrics["disk_usage"],
                    "network_stats": metrics["network_stats"]
                }
            }
            send_logs_to_lambda(payload)
            update_last_processed(log_hash)
        else:
            logger.info("No new logs found.")
    except Exception as e:
        logger.error(f"Error while processing logs: {str(e)}", exc_info=True)

def send_logs_to_lambda(payload):
    try:
        headers = {"Content-Type": "application/json"}
        response = requests.post(LAMBDA_ENDPOINT, headers=headers, data=json.dumps(payload))
        response.raise_for_status()
        logger.info(f"Logs sent to Lambda successfully: {response.status_code}")
    except requests.exceptions.RequestException as e:
        logger.error(f"Failed to send logs to Lambda: {str(e)}", exc_info=True)

def main():
    while True:
        logger.info("Starting log processing cycle.")
        scan_and_process_logs()
        logger.info("Log processing cycle completed. Sleeping for 5 minutes.")
        time.sleep(300)

if _name_ == "_main_":
    main()`
    }
  ];

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    alert("Code copied!");
  };

  return (
    <div className="w-screen  bg-gradient-to-b from-gray-900 to-gray-800 p-6">
      <div className="max-w-4xl mx-auto bg-gray-900 text-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold text-blue-400 text-center mb-6">
           Installation Guide
        </h1>
        <p className="text-gray-300 text-center mb-8">
           This is a script to add an EC2 instance to run our app
        </p>

        {/* Radio Buttons for Language Selection */}
        <div className="flex justify-center items-center space-x-6 mb-8">
          <label className="flex items-center space-x-2 cursor-pointer">
          <input
              type="radio"
              name="language"
              value="python"
              checked={selectedLanguage === "python"}
              onChange={() => setSelectedLanguage("python")}
              className="form-radio text-blue-500"
            />
            <span className="text-gray-300">Python</span>
            
          </label>
          
        </div>

        {/* Code Examples */}
        <div className="space-y-8">
          {examples.map((example, index) => (
            <div key={index} className="relative">
              <h2 className="text-2xl font-bold text-white mb-4">
                {example.title}
              </h2>

              {/* Code Block with Copy Button */}
              <div className="bg-gray-800 text-gray-300 p-4 rounded-lg mb-4 relative">
                <button
                  onClick={() =>
                    handleCopy(
                      selectedLanguage === "js"
                        ? example.jsCode
                        : example.pythonCode
                    )
                  }
                  className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-500 transition"
                >
                  Copy
                </button>
                <pre>
                  <code>
                    {selectedLanguage === "js"
                      ? example.jsCode
                      : example.pythonCode}
                  </code>
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
