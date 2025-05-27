class Personne:
    def __init__(self, nom, prenom, dob=None):
        self.nom = nom
        self.prenom = prenom
        self.dob = dob  

    def info(self):
        if self.dob:
            print(f"Nom: {self.nom}, Prénom: {self.prenom}, Date de naissance: {self.dob}")
        else:
            print(f"Nom: {self.nom}, Prénom: {self.prenom}")
