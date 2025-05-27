from personne import Personne


class Contact(Personne):
    def __init__(self, mobile, email):
        self.email = email
        self.mobile = mobile
    
    def info(self):
        print(f"Mobile: {self.mobile}, Email: {self.email}");