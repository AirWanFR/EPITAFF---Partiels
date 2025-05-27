import quopri
import csv
import os
from bs4 import BeautifulSoup
from jinja2 import Template

# Fonction pour lire et décoder le fichier .raw
def read_and_decode_raw(file_path):
    print(f"Lecture du fichier : {file_path}")
    with open(file_path, 'rb') as file:
        encoded = file.read()
        decoded_content = quopri.decodestring(encoded).decode('iso-8859-1')
    print("Fichier décodé avec succès.")
    return decoded_content

# Fonction pour remplacer les informations dans le HTML
def replace_info_in_html(html_content, data):
    soup = BeautifulSoup(html_content, 'html.parser')

    # Remplacer le numéro de colis
    for strong in soup.find_all('strong'):
        if strong.text.strip() == 'FR123456789AB':
            strong.string = data['order_number']

    # Remplacer l'adresse de livraison
    td = soup.find('td', id="infomartions")
    if td:
        td.clear()
        # Créer un nouvel élément HTML pour le nom
        name_tag = soup.new_tag("span")
        name_tag.string = data['name']
        td.append(name_tag)
        # Ajouter un saut de ligne
        td.append(soup.new_tag("br"))
        # Créer un nouvel élément HTML pour l'adresse
        address_tag = soup.new_tag("span")
        address_tag.string = data['street_address']
        td.append(address_tag)
        # Ajouter un saut de ligne
        td.append(soup.new_tag("br"))
        # Créer un nouvel élément HTML pour le complément
        complement_tag = soup.new_tag("span")
        complement_tag.string = data['complement']
        td.append(complement_tag)
        # Ajouter un saut de ligne
        td.append(soup.new_tag("br"))
        # Créer un nouvel élément HTML pour le code postal et la ville
        postal_city_tag = soup.new_tag("span")
        postal_city_tag.string = f"{data['postal_code']} {data['city']}"
        td.append(postal_city_tag)

    # Remplacer l'heure de livraison
    for strong in soup.find_all('strong'):
        if strong.text.strip() == '09h35':
            strong.string = data['timeslot'].split('-')[0]
        if strong.text.strip() == '10h35':
            strong.string = data['timeslot'].split('-')[1]

    # Remplacer le lien de suivi de colis
    for a in soup.find_all('a', href=True):
        if 'suivi-page?listeNumerosLT=FR123456789AB' in a['href']:
            a['href'] = a['href'].replace('FR123456789AB', data['order_number'])

    return str(soup)

# Fonction pour rediriger tous les liens vers http://127.0.0.1:5000/
def redirect_links(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    for a in soup.find_all('a', href=True):
        a['href'] = 'http://127.0.0.1:5000/'
    return str(soup)

# Fonction pour générer un email à partir d'un template
def generate_email(template_content, data):
    print("Génération d'un email à partir du template...")
    # Remplacer les informations dans le HTML
    modified_content = replace_info_in_html(template_content, data)
    # Rediriger tous les liens vers http://127.0.0.1:5000/
    modified_content = redirect_links(modified_content)
    template = Template(modified_content)
    email_content = template.render(data)
    print("Email généré avec succès.")
    return email_content

# Fonction pour générer des emails à partir d'un CSV
def generate_emails_from_csv(csv_path, template_content):
    print(f"Génération des emails à partir du fichier CSV : {csv_path}")
    if not os.path.exists(csv_path):
        print(f"Le fichier {csv_path} n'existe pas.")
        return

    try:
        with open(csv_path, 'r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                print(f"Traitement de la ligne : {row}")
                # Personnaliser les données avec les informations du CSV
                data = {
                    'order_number': row['order_number'],
                    'name': row['name'],
                    'postal_code': row['postal_code'],
                    'city': row['city'],
                    'street_address': row['street_address'],
                    'complement': row['complement'],
                    'phone': row['phone'],
                    'email': row['email'],
                    'delivery_date': row['delivery_date'],
                    'timeslot': row['timeslot']
                }
                email_content = generate_email(template_content, data)
                output_dir = 'automat/test_mail'
                os.makedirs(output_dir, exist_ok=True)
                output_file = os.path.join(output_dir, f"{row['name']}.html")
                with open(output_file, 'w', encoding='utf-8') as email_file:
                    email_file.write(email_content)
                print(f"Email sauvegardé dans : {output_file}")
    except Exception as e:
        print(f"Une erreur s'est produite : {e}")

# Exemple d'utilisation
if __name__ == '__main__':
    # Chemin vers le fichier .raw
    raw_file_path = 'email/chronopost_mail.raw'
    csv_path = 'cibles.csv'

    # Lire et décoder le fichier .raw
    print("Début de la lecture et du décodage du fichier .raw...")
    template_content = read_and_decode_raw(raw_file_path)

    # Générer les mails de phishing
    print("Début de la génération des emails de phishing...")
    generate_emails_from_csv(csv_path, template_content)

    print("Les emails de phishing ont été générés avec succès.")
