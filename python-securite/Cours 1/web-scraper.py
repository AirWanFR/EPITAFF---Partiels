import requests
from bs4 import BeautifulSoup

# URL à récupérer
URL = "https://www.w3schools.com"

# Fetch the content of the webpage using requests
response = requests.get(URL)

# Vérifier si la requête a réussi
if response.status_code == 200:
    # Parser le contenu HTML avec BeautifulSoup
    soup = BeautifulSoup(response.text, features="html.parser")

    # Afficher le titre de la page
    if soup.title:
        print(soup.title)
        print("=" * 64)
        print(soup.title.string)
        print("=" * 64)
    else:
        print("Aucun titre trouvé.")
    print("=" * 64)

    # Trouver tous les liens <a> et afficher les URL
    print("Liste des URL trouvées sur la page:")
    for link in soup.find_all("a"):
        href = link.get('href')
        if href:
            print(href)
        else:
            print("Lien sans URL.")
        print("=" * 64)

else:
    print(f"Échec de la récupération de la page. Code de statut : {response.status_code}")
