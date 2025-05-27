# pip install flask
from flask import Flask, render_template, request
import csv
import os

app = Flask(__name__)

def get_users_from_csv():
    users = []
    csv_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'cibles.csv')
    
    try:
        with open(csv_path, 'r', encoding='utf-8') as file:
            csv_reader = csv.DictReader(file)
            for row in csv_reader:
                users.append(row)
    except Exception as e:
        print(f"Error reading CSV file: {e}")
        return []
    
    return users

def get_client(order_number):
    """
    Récupère les coordonnées d'un client à partir de son numéro de commande.
    
    Args:
        order_number (str): Numéro de commande à rechercher
        
    Returns:
        dict: Coordonnées du client si trouvé, None sinon
    """
    clients_csv_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'cibles.csv')
    
    try:
        with open(clients_csv_path, 'r', encoding='utf-8') as file:
            csv_reader = csv.DictReader(file)
            for row in csv_reader:
                # Vérifier si le numéro de commande correspond
                if row.get('order_number') == order_number:
                    # Retourner les coordonnées du client
                    return {
                        'nom': row.get('name', ''),
                        'adresse': row.get('street_address', ''),
                        'complement': row.get('complement', ''),
                        'code_postal': row.get('postal_code', ''),
                        'ville': row.get('city', ''),
                        'email': row.get('email', ''),
                        'telephone': row.get('phone', ''),
                        'delivery_date': row.get('delivery_date', ''),
                        'timeslot': row.get('timeslot', '')
                    }
    except Exception as e:
        print(f"Erreur lors de la lecture du fichier cibles.csv: {e}")
    
    # Si aucun client n'est trouvé ou en cas d'erreur
    return None

@app.route('/')
def home():
    users = get_users_from_csv()
    
    # Vérifier s'il y a un paramètre 'order' (numéro de commande) dans l'URL
    order_number = request.args.get('order')
    
    if order_number:
        # Rechercher le client correspondant au numéro de commande
        client = get_client(order_number)
        
        if client:
            # Formatage des données du client pour correspondre au format attendu par le template
            user = {
                'Nom': client['nom'],
                'Adresse': f"{client['adresse']}, {client['complement']}, {client['code_postal']} {client['ville']}",
                'Email': client['email'],
                'Telephone': client['telephone'],
                'Livraison': f"{client['delivery_date']} {client['timeslot']}"
            }
            return render_template('index.html', user=user, users=users, selected_index=None)
    
    # Si aucun paramètre ou client non trouvé, utiliser le premier utilisateur
    if not users:
        return render_template('index.html', 
                              user={"Nom": "Default", "Prenom": "User", 
                                   "Adresse": "No Address", "Email": "no@email.com"},
                              users=[], 
                              selected_index=None)
    
    # Par défaut, renvoyer le premier utilisateur et adapter le format
    first_user = {
        'Nom': users[0].get('name', ''),
        'Adresse': f"{users[0].get('street_address', '')}, {users[0].get('complement', '')}, {users[0].get('postal_code', '')} {users[0].get('city', '')}",
        'Email': users[0].get('email', ''),
        'Telephone': users[0].get('phone', ''),
        'Livraison': f"{users[0].get('delivery_date', '')} {users[0].get('timeslot', '')}"
    }
    
    return render_template('index.html', 
                          user=first_user, 
                          users=users, 
                          selected_index=0)

# Ces routes sont maintenant obsolètes mais conservées pour rétrocompatibilité
@app.route('/user/<int:index>')
def user_detail(index):
    users = get_users_from_csv()
    if not users or index < 0 or index >= len(users):
        return "User not found", 404
    return render_template('index.html', user=users[index], users=users, selected_index=index)

@app.route('/user')
def user_by_name():
    # Rediriger vers la route principale si les anciens paramètres sont utilisés
    name = request.args.get('name')
    last_name = request.args.get('last_name')
    
    if name and last_name:
        # On pourrait ajouter ici une logique pour convertir name/last_name en numéro de commande
        return home()
    return home()

# Cette route est maintenant obsolète, redirige vers l'accueil avec le paramètre order
@app.route('/order/<order_number>')
def order_details(order_number):
    return home()

if __name__ == '__main__':
    app.run(debug=True)