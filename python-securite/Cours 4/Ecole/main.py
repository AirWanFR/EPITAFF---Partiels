from etudiant import Etudiant

# Instanciation de plusieurs "étudiants" (en réalité, des personnes célèbres)
etudiants = [
    Etudiant("Hamilton", "Lewis", 2022, "0654321987", "lewis@example.com"),
    Etudiant("Vettel", "Sebastian", 2021, "0789456123", "sebastian@example.com"),
    Etudiant("Schumacher", "Michael", 2020, "0779654321", "michael@example.com"),
    Etudiant("Senna", "Ayrton", 1994, "0665321098", "ayrton@example.com"),
    Etudiant("Bottas", "Valtteri", 2023, "0678901234", "valtteri@example.com"),
    Etudiant("Leclerc", "Charles", 2022, "0656789012", "charles@example.com"),
    Etudiant("Verstappen", "Max", 2021, "0681234567", "max@example.com"),
    Etudiant("Prost", "Alain", 1985, "0698765432", "alain@example.com"),
    Etudiant("Lauda", "Niki", 1976, "0789642135", "niki@example.com"),
    Etudiant("Schumacher", "Mick", 2020, "0798765432", "mick@example.com"),
    Etudiant("Beyoncé", "Carter", 2022, "0654321098", "beyonce@example.com"),
    Etudiant("Presley", "Elvis", 1956, "0678901234", "elvis@example.com"),
    Etudiant("Jackson", "Michael", 1982, "0681234567", "michael.jackson@example.com"),
    Etudiant("Grande", "Ariana", 2023, "0698765432", "ariana@example.com"),
    Etudiant("Mercury", "Freddie", 1985, "0798765432", "freddie.mercury@example.com"),
    Etudiant("Lennon", "John", 1960, "0654321987", "john.lennon@example.com"),
    Etudiant("Madonna", "Ciccone", 1984, "0789456123", "madonna@example.com"),
    Etudiant("Swift", "Taylor", 2021, "0678654321", "taylor.swift@example.com"),
    Etudiant("Hitler", "Adolf", 1945, "1945193955", "a.hitler@juif.gaz", "20-04-1889"),
    Etudiant("Gaga", "Lady", 2023, "0656789012", "lady.gaga@example.com")
]

# Boucle pour afficher les informations de chaque "étudiant"
for i, etudiant in enumerate(etudiants, 1):
    print(f"\nInformations de l'étudiant {i}:")
    etudiant.info()
    print(f"Semestre actuel: {etudiant.semestre()}")

    print(f"\nInformations complètes de l'étudiant {i}:")
    etudiant.info_complete()
