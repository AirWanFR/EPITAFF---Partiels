from Cryptodome.Cipher import AES
from Cryptodome.Util.Padding import unpad
import os

def dec_file(file, key):
    with open(file, "rb") as f:
        data = f.read()

    cipher = AES.new(key, AES.MODE_ECB)
    decrypted_data = unpad(cipher.decrypt(data), AES.block_size)

    # Créer le répertoire de sortie s'il n'existe pas
    output_dir = "./test_dec"
    os.makedirs(output_dir, exist_ok=True)

    # Déterminer le chemin du fichier déchiffré
    dec_file_path = os.path.join(output_dir, os.path.basename(file).replace('.enc', ''))

    with open(dec_file_path, "wb") as f:
        f.write(decrypted_data)

    print(f"Fichier déchiffré : {dec_file_path}")

    return file, dec_file_path  # Retourner le chemin original et le chemin déchiffré

def search_dir(key):
    # Déchiffrer le fichier keys.txt
    with open("keys.txt", "r") as keys_file:
        for line in keys_file:
            if line.strip():  # Ignorer les lignes vides
                path, key_hex = line.strip().split(":")
                key = bytes.fromhex(key_hex)

                # Déchiffrer le fichier
                original_file, decrypted_file = dec_file(path, key)

                # Comparer le fichier original et le fichier déchiffré
                try:
                    with open(original_file, "rb") as orig_f, open(decrypted_file, "rb") as dec_f:
                        if orig_f.read() == dec_f.read():
                            print(f"Le fichier {original_file} a été déchiffré avec succès et correspond au fichier original.")
                        else:
                            print(f"Le fichier {original_file} ne correspond pas au fichier déchiffré {decrypted_file}.")
                except FileNotFoundError:
                    print(f"Le fichier original {original_file} n'a pas été trouvé.")
                except Exception as e:
                    print(f"Une erreur est survenue lors de la comparaison des fichiers : {e}")

def main():
    dir_to_search = input("Entrez le chemin du répertoire contenant les fichiers à déchiffrer : ")
    
    key_input = input("Entrez la clé de déchiffrement (en hexadécimal) : ")
    
    key = bytes.fromhex(key_input)

    if len(key) not in {16, 24, 32}:
        print("La clé doit être de 16, 24 ou 32 octets.")
        return

    search_dir(dir_to_search, key)

if __name__ == "__main__":
    main()