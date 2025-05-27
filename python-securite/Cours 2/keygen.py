from Cryptodome.PublicKey import RSA
# Générer une paire de clés RSA 4096 bits
rsa_key = RSA.generate(4096)
# Récupérer la clef privée (binaire)
rsa_key.export_key()
# Récupérer la clef publique (binaire)
rsa_key.publickey().export_key()

from Cryptodome.Cipher import AES
from Cryptodome.Random import get_random_bytes

# Génération d'une clé AES aléatoire (32 bytes pour AES-256)
aes_key = get_random_bytes(32)
# Remplir les blocs (AES requiert des blocs de 16 octets)
data = "CONTENU DU FICHIER"
data += b"\0" * (16 - len(data) % 16)

# Chiffrement AES-256
cipher = AES.new(aes_key, AES.MODE_ECB)  # Mode ECB (facile à casser en réalité)
ciphertext = cipher.encrypt(data)  # ATTENTION data doit être rempli (blocs de 16 octets)

import os
# Parcourir un répertoire et tous ses sous-répertoires
os.walk("REPERTOIRE_CIBLE")  # Retourne chemin, liste de répertoires, liste de fichiers
