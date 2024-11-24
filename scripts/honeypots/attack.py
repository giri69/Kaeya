import socket
import random

# Configuration
HOST = "127.0.0.1"
PORTS = [2222, 8080]

def simulate_attack():
    """Simulate interaction with the honeypot."""
    for port in PORTS:
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client:
                client.connect((HOST, port))
                if port == 2222:  # SSH
                    client.send(b"malicious command\n")
                elif port == 8080:  # HTTP
                    client.send(b"GET /suspicious HTTP/1.1\nHost: honeypot\n\n")
                response = client.recv(1024)
                print(f"Response from port {port}:\n{response.decode()}")
        except Exception as e:
            print(f"Failed to connect to port {port}: {e}")

if __name__ == "__main__":
    simulate_attack()
