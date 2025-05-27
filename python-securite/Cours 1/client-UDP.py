import socket

client = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)

host = socket.gethostname()
port = 667

print(f"Sending UDP to {host}:{port}...")
client.sendto(b'Banner query\r\n',(host,port))
print(f"Waiting for response...")
message = client.recv(1024)
print("Recieived from {}:{} : {}".format(host,port,message))