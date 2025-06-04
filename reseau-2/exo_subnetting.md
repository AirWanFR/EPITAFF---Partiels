# Exercices Subnetting — Corrigés cachés

---

## Exercice 1  
**Enoncé :**  
On dispose du réseau 192.168.1.0/24. On souhaite le découper en 4 sous-réseaux de taille égale.  
- Quel masque utiliser ?  
- Quelles sont les plages d'adresses de chaque sous-réseau ?

<details>
<summary>Correction</summary>

- 4 sous-réseaux → 2 bits à emprunter : /24 + 2 = /26 → 255.255.255.192  
- Taille de chaque sous-réseau : 64 adresses (62 utilisables)
- Plages :
  - 192.168.1.0/26 : 192.168.1.1 – 192.168.1.62 / Broadcast : 192.168.1.63
  - 192.168.1.64/26 : 192.168.1.65 – 192.168.1.126 / Broadcast : 192.168.1.127
  - 192.168.1.128/26 : 192.168.1.129 – 192.168.1.190 / Broadcast : 192.168.1.191
  - 192.168.1.192/26 : 192.168.1.193 – 192.168.1.254 / Broadcast : 192.168.1.255

</details>

---

## Exercice 2  
**Enoncé :**  
Avec le réseau 10.0.0.0/16, créez 8 sous-réseaux de même taille.  
- Quel masque utiliser ?  
- Donnez la première adresse de chaque sous-réseau.

<details>
<summary>Correction</summary>

- 8 sous-réseaux → 3 bits empruntés → /16+3 = /19 → 255.255.224.0  
- Plage de chaque sous-réseau : 8192 adresses  
- Début des sous-réseaux :
  - 10.0.0.0/19
  - 10.0.32.0/19
  - 10.0.64.0/19
  - 10.0.96.0/19
  - 10.0.128.0/19
  - 10.0.160.0/19
  - 10.0.192.0/19
  - 10.0.224.0/19

</details>

---

## Exercice 3  
**Enoncé :**  
Décomposez le réseau 172.16.0.0/16 pour avoir au moins 60 sous-réseaux.  
- Quel masque utiliser ?  
- Combien d'hôtes par sous-réseau ?

<details>
<summary>Correction</summary>

- 60 sous-réseaux → 2⁶ = 64, donc 6 bits à emprunter → /16+6 = /22 → 255.255.252.0  
- Nombre d'hôtes : 2⁽³²⁻²²⁾ – 2 = 1022 hôtes par sous-réseau

</details>

---

## Exercice 4  
**Enoncé :**  
Quel est le dernier hôte utilisable dans le sous-réseau 192.168.10.64/28 ?

<details>
<summary>Correction</summary>

- /28 → 16 adresses, plage : 192.168.10.64 à 192.168.10.79  
- Broadcast : 192.168.10.79  
- Dernier hôte utilisable : 192.168.10.78

</details>

---

## Exercice 5  
**Enoncé :**  
Donnez le masque CIDR et décimal pour un sous-réseau permettant 30 hôtes.

<details>
<summary>Correction</summary>

- 30 hôtes → 2⁵ – 2 = 30 ⇒ il faut 5 bits pour les hôtes  
- Masque : 32–5 = 27 ⇒ /27 ⇒ 255.255.255.224

</details>

---

## Exercice 6  
**Enoncé :**  
Quel est le réseau, le premier hôte, le dernier hôte et le broadcast du sous-réseau contenant 192.168.20.45/29 ?

<details>
<summary>Correction</summary>

- /29 → incrément de 8 : 192.168.20.40 à 192.168.20.47  
- Réseau : 192.168.20.40  
- Premier hôte : 192.168.20.41  
- Dernier hôte : 192.168.20.46  
- Broadcast : 192.168.20.47

</details>

---

## Exercice 7  
**Enoncé :**  
Combien de sous-réseaux et d’hôtes par sous-réseau obtient-on si on divise 192.168.0.0/24 en /28 ?

<details>
<summary>Correction</summary>

- /28 → 4 bits empruntés (28-24=4) → 2⁴=16 sous-réseaux  
- Hôtes : 2⁴ – 2 = 14 hôtes par sous-réseau

</details>

---

## Exercice 8  
**Enoncé :**  
Attribuer la plage d’un sous-réseau /30, débutant à 10.10.10.0.

<details>
<summary>Correction</summary>

- /30 → incrément de 4 : 10.10.10.0 à 10.10.10.3  
- Réseau : 10.10.10.0  
- Premier hôte : 10.10.10.1  
- Dernier hôte : 10.10.10.2  
- Broadcast : 10.10.10.3

</details>

---

## Exercice 9  
**Enoncé :**  
Quel masque utiliser pour créer au moins 100 sous-réseaux à partir de 192.168.0.0/24 ?

<details>
<summary>Correction</summary>

- 100 sous-réseaux → 2⁷ = 128 → 7 bits à emprunter  
- /24+7 = /31, mais /31 n’est pas utilisable en pratique, donc /31 pour point-à-point, sinon /31 donne 0 hôtes utilisables.  
- Pour au moins 100 sous-réseaux avec hôtes : /31 trop petit, prendre /30 (6 bits), 2⁶=64, pas assez.  
- Pour 128 sous-réseaux : /31, mais pour des réseaux avec 2 hôtes, utiliser /30  
- Pour 100 sous-réseaux : /30 (255.255.255.252) → 64 sous-réseaux de 2 hôtes, donc ce n’est pas possible avec /24 pour 100 sous-réseaux d’au moins 2 hôtes.  
- **Réponse attendue :** /31 (255.255.255.254) pour liens point-à-point, sinon /30 (255.255.255.252) pour 62 sous-réseaux de 2 hôtes.

</details>

---

## Exercice 10  
**Enoncé :**  
Dans le réseau 172.20.0.0/16, vous voulez au moins 500 hôtes par sous-réseau.  
- Quel masque utiliser ?

<details>
<summary>Correction</summary>

- 500 hôtes → 2⁹ – 2 = 510, donc il faut 9 bits pour les hôtes  
- Masque : 32–9 = 23 ⇒ /23 ⇒ 255.255.254.0

</details>

---

## Exercice 11  
**Enoncé :**  
Vous avez besoin de 1000 adresses IP utilisables par sous-réseau.  
- Quel masque devez-vous utiliser ?  
- Combien d’adresses sont fournies exactement par sous-réseau ?

<details>
<summary>Correction</summary>

- 1000 adresses → 2^10 = 1024 (1022 utilisables)  
- Masque : 32–10 = 22 ⇒ /22 ⇒ 255.255.252.0  
- Nombre exact d’adresses utilisables : 1022

</details>

---

## Exercice 12  
**Enoncé :**  
Quel est le plus petit masque possible pour fournir au moins 10 adresses IP utilisables par sous-réseau ?

<details>
<summary>Correction</summary>

- 10 adresses → 2^4 = 16 (14 utilisables)  
- Masque : 32–4 = 28 ⇒ /28 ⇒ 255.255.255.240

</details>

---

## Exercice 13  
**Enoncé :**  
Combien d’adresses sont disponibles dans un sous-réseau /29 ?

<details>
<summary>Correction</summary>

- /29 → 32–29 = 3 bits pour les hôtes → 2^3 = 8 adresses totales  
- Adresses utilisables : 8–2 = 6

</details>

---

## Exercice 14  
**Enoncé :**  
Pour un sous-réseau de 2046 adresses utilisables, quel masque faut-il prendre ?

<details>
<summary>Correction</summary>

- 2046 → 2^11 = 2048 (2046 utilisables)  
- Masque : 32–11 = 21 ⇒ /21 ⇒ 255.255.248.0

</details>

---

## Exercice 15  
**Enoncé :**  
Vous avez un réseau 192.168.4.0/24.  
- Quel masque permet de créer des sous-réseaux de 12 hôtes utilisables au maximum ?  
- Donnez la plage du premier sous-réseau.

<details>
<summary>Correction</summary>

- 12 hôtes → 2^4 = 16 (14 utilisables)  
- Masque : /28 ⇒ 255.255.255.240  
- Premier sous-réseau :  
  - 192.168.4.0/28 :  
    - Réseau : 192.168.4.0  
    - Hôtes : 192.168.4.1 – 192.168.4.14  
    - Broadcast : 192.168.4.15

</details>

---