import socket

def scan_port(host, port):
    client = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    
    try:
        client.sendto(b"test", (host, port)) 
        client.recv(1024)  
        return True 
    except socket.error:
        return False  
    finally:
        client.close()

host = socket.gethostname()
open_ports = []

for i in range(1, 1000):  #
    if scan_port(host, i):
        open_ports.append(i)

print("Open UDP ports:", open_ports)

