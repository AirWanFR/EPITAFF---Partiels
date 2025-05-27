import socket
import threading

# Configuration
PROXY_HOST = '0.0.0.0'
PROXY_PORT = 8888

SERVER_HOST = socket.gethostname()
SERVER_PORT = 9999

def handle_client(client_socket):
    # Connexion au vrai serveur
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.connect((SERVER_HOST, SERVER_PORT))

    # Thread pour transférer client -> serveur
    def forward_client_to_server():
        while True:
            data = client_socket.recv(4096)
            if not data:
                break
            server_socket.sendall(data)

    # Thread pour transférer serveur -> client
    def forward_server_to_client():
        while True:
            data = server_socket.recv(4096)
            if not data:
                break
            client_socket.sendall(data)

    threading.Thread(target=forward_client_to_server, daemon=True).start()
    threading.Thread(target=forward_server_to_client, daemon=True).start()

# Lancer le proxy
proxy = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
proxy.bind((PROXY_HOST, PROXY_PORT))
proxy.listen(5)

print(f"\033[92m[INFO]\033[0m Proxy TCP en écoute sur {PROXY_HOST}:{PROXY_PORT}")

while True:
    client_sock, client_addr = proxy.accept()
    print(f"\033[94m[CONNECTION]\033[0m Connexion entrante de {client_addr}")
    threading.Thread(target=handle_client, args=(client_sock,), daemon=True).start()
