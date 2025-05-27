from Cryptodome.PublicKey import RSA

def generate_keys():
    rsa_key = RSA.generate(4096)

    with open("key.private", "wb") as private_file:
        private_file.write(rsa_key.export_key(format='PEM'))

    with open("key.public", "wb") as public_file:
        public_file.write(rsa_key.publickey().export_key(format='PEM'))

    print("Les clés ont été générées et sauvegardées dans key.private et key.public.")

if __name__ == "__main__":
    generate_keys()