import time
import requests
import json

LOG_FILE = "honeypot_logs.txt"
SUSPICIOUS_PATTERNS = ["malicious", "suspicious", "command", "GET /suspicious"]
USER_ID = "673e42eaae9a74869e81275b"
SERVICE_ID = "6741c2aeb6513df77fb4a1af"
API_URL = "https://c316tf2op8.execute-api.ap-south-1.amazonaws.com/hh"
COLLECTION_NAME = "honeypotlog"

def send_alert(log_entry):
    """Send an alert to the server with the suspicious log details."""
    alert_data = {
        "user_id": USER_ID,
        "service_id": SERVICE_ID,
        "collection_name": COLLECTION_NAME,
        "log_entry": log_entry.strip(),
        "alert_flag": "suspicious_activity"
    }
    try:
        response = requests.post(API_URL, json=alert_data)
        if response.status_code == 200:
            print("Alert sent successfully.")
        else:
            print(f"Failed to send alert. Server responded with: {response.status_code} {response.text}")
    except Exception as e:
        print(f"Error sending alert: {e}")

def monitor_logs():
    """Monitor logs in real-time for suspicious activity."""
    with open(LOG_FILE, "r") as log_file:
        log_file.seek(0, 2)  # Move to the end of the file
        while True:
            line = log_file.readline()
            if not line:
                time.sleep(1)  # Wait for new logs
                continue
            analyze_log_entry(line)

def analyze_log_entry(log_entry):
    """Analyze a single log entry for suspicious patterns."""
    if any(pattern in log_entry for pattern in SUSPICIOUS_PATTERNS):
        print(f"ALERT: Suspicious activity detected:\n{log_entry}")
        send_alert(log_entry)

if __name__ == "__main__":
    print("Monitoring logs for suspicious activity...")
    monitor_logs()
