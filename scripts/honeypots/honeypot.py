import socket
import threading
from datetime import datetime

# Configuration
HOST = "0.0.0.0"
PORTS = [2222,8080]  # Ports to mimic SSH and HTTP
LOG_FILE = "honeypot_logs.txt"

def log_activity(client_address, port, data):
    """Log client interactions."""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_entry = f"[{timestamp}] From {client_address} on port {port}: {data}\n"
    print(log_entry.strip())
    with open(LOG_FILE, "a") as log_file:
        log_file.write(log_entry)

def handle_client(client_socket, client_address, port):
    """Handle individual client connections."""
    try:
        if port == 2222:  # SSH mimic
            client_socket.send(b"SSH-2.0-OpenSSH_8.0\n")
        elif port == 8080:  # HTTP mimic
            client_socket.send(b"HTTP/1.1 200 OK\nContent-Type: text/html\n\n<h1>Welcome to the honeypot!</h1>")
        data = client_socket.recv(1024).decode().strip()
        log_activity(client_address, port, data)
    except Exception as e:
        log_activity(client_address, port, f"Error: {e}")
    finally:
        client_socket.close()

def start_honeypot(port):
    """Start the honeypot on the given port."""
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind((HOST, port))
    server.listen(5)
    print(f"Honeypot listening on port {port}...")
    while True:
        client_socket, client_address = server.accept()
        threading.Thread(target=handle_client, args=(client_socket, client_address[0], port)).start()

if __name__ == "__main__":
    print("Starting honeypot...")
    for port in PORTS:
        threading.Thread(target=start_honeypot, args=(port,)).start()
