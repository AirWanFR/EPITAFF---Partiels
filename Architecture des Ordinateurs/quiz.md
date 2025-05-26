
# 🧪 QUIZ  — Révision Architecture des Ordinateurs

---

## 🔹 Partie 1 : **Logique Combinatoire**

**1. Quelle est la particularité d’un circuit combinatoire ?**

<details><summary>Réponse</summary>
✅ La sortie dépend uniquement des entrées à un instant donné.
</details>

**2. Que vaut la sortie d’une porte XOR si ses deux entrées valent 1 ?**

<details><summary>Réponse</summary>
✅ 0 — car XOR = 1 uniquement si une seule des deux entrées vaut 1.
</details>

**3. Quelle propriété utilise-t-on dans les tables de Karnaugh ?**

<details><summary>Réponse</summary>
✅ L’adjacence des cases pour simplifier visuellement les fonctions logiques.
</details>

**4. Que signifie une "somme de produits" ?**

<details><summary>Réponse</summary>
✅ C’est une expression logique constituée d’un OU (somme) de plusieurs ET (produits).
</details>

**5. Complète avec des ET:**   $\overline{A + B} =$ ?

<details><summary>Réponse</summary>
✅ \({A} \cdot \overline{B}\) — Théorème de De Morgan.
</details>

---

## 🔹 Partie 2 : **Logique Séquentielle**

**6. Quelle est la différence entre une bascule RS et une bascule D ?**

<details><summary>Réponse</summary>
✅ La bascule D a une seule entrée (D) copiée sur la sortie ; la RS a deux entrées distinctes (S et R).
</details>

**7. Quelle est la condition interdite pour une bascule RS ?**

<details><summary>Réponse</summary>
✅ S = 1 et R = 1 simultanément (état indéfini).
</details>

**8. Qu’est-ce qu’une bascule synchronisée ?**

<details><summary>Réponse</summary>
✅ Une bascule qui change d’état uniquement lors d’un front d’horloge.
</details>

**9. À quoi sert l’entrée CLK dans un compteur ?**

<details><summary>Réponse</summary>
✅ À synchroniser les changements d’état — c’est l’élément de rythme.
</details>

**10. La sortie d’un circuit séquentiel dépend-elle seulement des entrées ?**

<details><summary>Réponse</summary>
✅ Non — elle dépend aussi de l’état précédent (grâce à une mémoire interne).
</details>

---

## 🔹 Partie 3 : **Assembleur Motorola 68000**

**11. Quelle est la différence entre `ADDI.W` et `ADD.B` ?**

<details><summary>Réponse</summary>
✅ `ADDI.W` ajoute une valeur immédiate de 16 bits ; `ADD.B` fait une addition sur 8 bits.
</details>

**12. Que fait l'instruction `TRAP #15` dans Easy68K ?**

<details><summary>Réponse</summary>
✅ Elle appelle un service système (ex : affichage de texte dans le terminal).
</details>

**13. Quelle est la plage de valeurs autorisée pour une instruction `.B` ?**

<details><summary>Réponse</summary>
✅ De 0 à 255 — soit de $00 à $FF en hexadécimal.
</details>

**14. Que stocke le registre D0 après `MOVE.B #45, D0` et `ADD.B #85, D0` ?**

<details><summary>Réponse</summary>
✅ 130 (en décimal), soit 2D + 55 = 82H en hexadécimal.
</details>

**15. À quoi sert le registre A7 ?**

<details><summary>Réponse</summary>
✅ C’est le registre de pile (Stack Pointer), utilisé pour gérer les appels et retours de sous-programmes.
</details>

