## 🧠 FICHE DE RÉVISION – Électronique – 1ère Année EPITA

---

### 📘 Cours 1 : Amplificateur Opérationnel (AOP)

#### Principes de base :

* Amplifie la différence de tension entre ses deux entrées.
* Applications : comparateur, filtre actif, additionneur, soustracteur, etc.
* Symboles : Entrées `Ve+`, `Ve-` ; alimentation `+Vcc`, `-Vss`.

#### Montages classiques :

* **Comparateur** : commute entre deux tensions selon l’entrée.
* **Suiveur** : gain = 1, sert de tampon.
* **Non-inverseur** : gain = 1 + R2/R1.
* **Inverseur** : gain = -R2/R1.
* **Additionneur** : somme pondérée de plusieurs entrées.
* **Soustracteur** : soustraction pondérée.
* **Trigger de Schmitt** : ajout d'hystérésis (seuils haut/bas différents).

---

### 📘 Cours 2 : Filtres Passifs

#### Impédance :

* **Résistance** : Z = R
* **Inductance** : Z = jωL
* **Condensateur** : Z = 1/jωC

#### Fonction de transfert :

* H(jω) = Vout / Vin
* Dépend des composants et de leur disposition

#### Diagramme de Bode :

* Représentation en gain (dB) et phase
* Utilisé pour analyser la fréquence de coupure, gain, stabilité

---

### 📘 Cours 3 : Facteurs d’influence & Limites

#### 🟩 Résistance :

* **Tolérance** : ±1%, ±5% → variation autour de la valeur nominale
* **CT (ppm/°C)** : variation avec la température
* **Vieillissement** : change avec le temps
* **Tension maximale** : au-delà = risque de claquage

#### 🟦 Condensateur :

* **Capacité** : varie avec température, tension, vieillissement
* **Type diélectrique** : X7R, C0G/NP0, Y5V...
* **ESR (Résistance série équivalente)** : influence sur le filtrage
* **Vieillissement** : perte de capacité avec le temps
* **Tension de polarisation** : capacité diminue sous tension

#### 🟥 Inductance :

* **L (µH)** : capacité à s’opposer à une variation de courant
* **R\_s (DCR)** : pertes résistives
* **Courant nominal & saturation** : au-delà = perte d’efficacité
* **Q** : facteur de qualité (filtrage haute fréquence)
* **Vieillissement thermique** : perte de performance


