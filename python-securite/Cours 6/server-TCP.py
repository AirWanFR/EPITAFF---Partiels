import socket

server = socket.socket(family=socket.AF_INET, type=socket.SOCK_STREAM)

host = socket.gethostname()
port = 9999

server.bind((host,port))
server.listen(5)

print(f"\033[92mRunning TCP server on {host} : {port}\033[0m")  # Green text for server start
while True:
    client, address = server.accept()
    print(f"\033[94m[INFO]\033[0m Connexion de {address[0]}:{address[1]}")

    try:
        # Envoie un message d’accueil
        greeting = "Salut ! Qui es-tu ?\r\n"
        client.send(greeting.encode('utf-8'))

        # Reçoit la réponse
        name = client.recv(1024).decode('utf-8').strip()

        # Répond avec un message personnalisé
        response = (
            f"Enchanté {name} ! Content de te parler 😄\r\n"
            "À bientôt !\r\n"
        )
        client.send(response.encode('utf-8'))

    except Exception as e:
        print(f"\033[91m[ERREUR]\033[0m {e}")
    finally:
        client.close()
        print(f"\033[93m[FERMÉ]\033[0m Connexion fermée avec {address[0]}:{address[1]}")
