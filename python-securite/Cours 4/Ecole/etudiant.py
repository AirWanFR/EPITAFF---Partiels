from personne import Personne
from contact import Contact

from datetime import datetime


class Etudiant(Personne):
    def __init__(self, nom, prenom, promotion, mobile, email, dob=None):
        Personne.__init__(self, nom, prenom, dob)
        Contact.__init__(self, mobile, email)
        self.promotion = promotion
    
    def info(self):
        super().info()
        print(f"Promotion: {self.promotion}")

    def semestre(self):
        annee_actuelle = datetime.now().year
        annees_ecoulees = annee_actuelle - self.promotion
        semestre_actuel = (annees_ecoulees * 2) + 1  
        return semestre_actuel    
    
    def info_complete(self):
        self.info()  
        Contact.info(self)
    