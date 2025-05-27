## 📜 FICHE DE RÉVISION – Analyse Mathématique (Examen Final)

### 1. ✅ Sommes Finies

#### 🔹 Définitions :

* Somme partielle :
  Sn = somme de k=0 à n de u\git _k

#### 🔹 Formules usuelles :

* somme de k=1 à n de k = n(n+1)/2
* somme de k=1 à n de k^2 = n(n+1)(2n+1)/6
* somme de k=0 à n de (a + kr) = (n+1)(2a + nr)/2
* Suite géométrique (si q != 1) : somme de k=0 à n de aq^k = a \* (1 - q^{n+1}) / (1 - q)

---

### 2. ✅ Limites (composition, comparaison, encadrement)

#### 🔹 Limites usuelles :

* 1 / n^k tend vers 0
* a^n tend vers 0 si 0 < a < 1, vers +∞ si a > 1, diverge si a < -1
* ln(n) tend vers +∞

#### 🔹 Méthodes :

* Théorème des gendarmes : si a\_n ≤ b\_n ≤ c\_n et lim a\_n = lim c\_n = L, alors lim b\_n = L
* Comparaison : si a\_n ≤ b\_n, alors lim a\_n ≤ lim b\_n
* Composition : utiliser des limites connues pour en déduire d'autres

---

### 3. ✅ Équivalents, Petit o et Grand O

#### 🔹 Équivalence :

* u\_n \~ v\_n ssi lim u\_n / v\_n = 1

#### 🔹 Petit o :

* u\_n = o(v\_n) ssi lim u\_n / v\_n = 0

#### 🔹 Grand O :

* u\_n = O(v\_n) ssi il existe C > 0 et n\_0 tel que pour tout n ≥ n\_0, |u\_n| ≤ C|v\_n|

#### 🔹 Exemples :

* n^2 + n \~ n^2 donc n = o(n^2)
* 1 / (n^2 + 1) \~ 1 / n^2
* ln(n) = o(n^a) pour tout a > 0

---

### 4. ✅ Complexité

#### 🔹 Croissances classiques :

* ln(n) << n^a << n^a ln(n)^b << a^n << n!
* Cela permet d'évaluer le temps d'exécution d'un algorithme

#### 🔹 À savoir :

* u\_n = O(v\_n) signifie que u\_n ne croît pas plus vite que v\_n
* u\_n = o(v\_n) signifie que u\_n est négligeable devant v\_n

---

### 5. 📊 Introduction à la complexité (extraits du Cours n°1)

* Objectif : étudier le temps d’exécution des algorithmes
* Exemple comparatif : brute-force (n^3) vs Dijkstra (n^2 log n)
* Temps d'exécution estimé selon la taille d'entrée
* Notions importantes :

  * Suites définies par un terme général ou une récurrence
  * Sens de variation : croissante, décroissante, bornée
  * Représentation graphique (non évaluée à l'examen)
  * Raisonnement par récurrence (non au programme)

Exemples :

* u\_n = 3n : strictement croissante
* u\_n = (1/3)^n : strictement décroissante
* u\_n = (−1)^n : bornée mais non monotone

Conclusion :
Connaître les suites, leur comportement asymptotique, et les comparaisons permet de comprendre l'efficacité des algorithmes et leur complexité.
