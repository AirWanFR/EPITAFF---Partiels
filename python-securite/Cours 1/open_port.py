#!/usr/bin/python3
import socket
import sys

def scan_port(host, port):
    try:
        client = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        client.settimeout(1)  
        client.sendto(b"test", (host, port)) 

        try:
            client.recv(1024)  
            return True  
        except socket.timeout:
            return False  
    except socket.error:
        return False
    finally:
        client.close()

def scan(host, start, end):
    print("[SCAN] Début du Scan de ports")
    open_ports = []

    for i in range(start, end + 1):
        print(i)
        if scan_port(host, i):
            open_ports.append(i)

    print("Open UDP ports:", open_ports)

if len(sys.argv) != 3:
    print("Usage : ./open_port <start_port> <end_port>")
else:
    try:
        start = int(sys.argv[1])
        end = int(sys.argv[2])

        if start < 1 or end > 65535 or start > end:
            print("Erreur : Les ports doivent être entre 1 et 65535 avec start <= end")
            sys.exit(1)

        host = socket.gethostbyname(socket.gethostname())  
        scan(host, start, end)
    except ValueError:
        print("Erreur : Veuillez entrer des nombres valides pour les ports.")
        sys.exit(1)
