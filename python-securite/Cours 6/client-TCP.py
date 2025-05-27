import socket

client = socket.socket(family=socket.AF_INET, type=socket.SOCK_STREAM)

host = socket.gethostname()
port = 8888

print(f"\033[92m[INFO]\033[0m Connecting to {host}:{port}...")
client.connect((host, port))
print(f"\033[92m[INFO]\033[0m Connected to {host}:{port}, grabbing header")

message = client.recv(1024)
print(f"\033[94m[SENT]\033[0m Received message from {host}:{port}")

client.close()
print(f"\033[93m[CLOSED]\033[0m Connection closed with {host}:{port}")

print(f"\033[96m[RECEIVED]\033[0m Message from {host}:{port}: {message.decode('ascii')}")