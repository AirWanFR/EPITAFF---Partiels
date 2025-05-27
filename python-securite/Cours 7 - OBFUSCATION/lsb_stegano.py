from bitstring import BitArray
from PIL import Image
import sys

LSB_PAYLOAD_LENGTH_BITS = 32

# --- Lecture binaire du fichier source ---
def read_data(input_file):
    try:
        with open(input_file, "rb") as f:
            data = f.read()
    except IOError:
        print(f"Could not open file {input_file}")
        exit(1)
    return data

# --- Écriture binaire dans le fichier de sortie ---
def write_data(output_file, data):
    try:
        with open(output_file, "wb") as f:
            f.write(data)
    except IOError:
        print(f"Could not open file {output_file}")
        exit(1)
    print(f"Data written to {output_file}")

# --- Insertion des données dans l'image via LSB ---
def obfuscate_via_lsb(data_file, input_img_file, output_img_file):
    data = read_data(data_file)
    data_bits = BitArray(uint=len(data) * 8, length=LSB_PAYLOAD_LENGTH_BITS).bin + BitArray(bytes=data).bin

    i = 0
    try:
        with Image.open(input_img_file) as img:
            width, height = img.size

            if len(data_bits) > width * height * 3:
                print("Data too large for image.")
                exit(1)

            for x in range(width):
                for y in range(height):
                    pixel = list(img.getpixel((x, y)))
                    for n in range(3):  # R, G, B
                        if i < len(data_bits):
                            pixel[n] = pixel[n] & ~1 | int(data_bits[i])
                            i += 1
                    img.putpixel((x, y), tuple(pixel))
                    if i >= len(data_bits):
                        break
                if i >= len(data_bits):
                    break

            img.save(output_img_file, "PNG")
            print(f"Data written to {output_img_file}")

    except IOError:
        print(f"Could not open {input_img_file}")
        exit(1)

# --- Extraction des données LSB d'une image ---
def deobfuscate_via_lsb(input_img_file, output_data_file):
    try:
        with Image.open(input_img_file) as img:
            header_bits = decode_img_nbits(img, LSB_PAYLOAD_LENGTH_BITS)
            payload_length = int("".join(map(str, header_bits)), 2)

            all_bits = decode_img_nbits(img, LSB_PAYLOAD_LENGTH_BITS + payload_length)
            data_bits = all_bits[LSB_PAYLOAD_LENGTH_BITS:]
            data = BitArray(bin="".join(map(str, data_bits))).bytes

            write_data(output_data_file, data)

    except IOError:
        print(f"Could not open {input_img_file}")
        exit(1)

# --- Extraction de bits LSB depuis une image ---
def decode_img_nbits(img, nbits):
    data = []
    i = 0
    width, height = img.size
    for x in range(width):
        for y in range(height):
            pixel = list(img.getpixel((x, y)))
            for n in range(3):  # R, G, B
                if i < nbits:
                    data.append(pixel[n] & 1)
                    i += 1
                if i >= nbits:
                    break
            if i >= nbits:
                break
        if i >= nbits:
            break
    return data

# --- Utilisation : encode ou decode ---
if __name__ == "__main__":
    mode = input("Mode (encode/decode): ").strip().lower()

    if mode == "encode":
        data_file = input("Fichier à cacher (ex: secret.txt): ")
        input_img = input("Image source (ex: image.png): ")
        output_img = input("Image de sortie (ex: image_stegano.png): ")
        obfuscate_via_lsb(data_file, input_img, output_img)

    elif mode == "decode":
        input_img = input("Image avec données cachées (ex: image_stegano.png): ")
        output_data = input("Fichier de sortie (ex: secret_out.txt): ")
        deobfuscate_via_lsb(input_img, output_data)

    else:
        print("Mode invalide. Choisissez 'encode' ou 'decode'.")
