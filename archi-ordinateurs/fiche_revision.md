## 🧠 FICHE DE RÉVISION DÉTAILLÉE

---

### 1. 🔌 Logique Combinatoire

#### 🔸 Définition

La **logique combinatoire** désigne des circuits dont les **sorties dépendent uniquement de l’état présent des entrées**, sans aucune mémoire d’état antérieur.

#### 🔸 Portes logiques de base

| Porte              | Symbole  | Fonction                              |
| ------------------ | -------- | ------------------------------------- |
| NON (NOT)          | ¬A       | Inverse une entrée                    |
| ET (AND)           | A · B    | Sortie = 1 si A = 1 et B = 1          |
| OU (OR)            | A + B    | Sortie = 1 si A = 1 ou B = 1          |
| OU Exclusif (XOR)  | A ⊕ B    | Sortie = 1 si une seule entrée vaut 1 |
| NON-ET (NAND)      | ¬(A · B) | Sortie inversée de l’ET               |
| NON-OU (NOR)       | ¬(A + B) | Sortie inversée de l’OR               |
| Équivalence (XNOR) | ¬(A ⊕ B) | Sortie = 1 si A = B                   |

#### 🔸 Table de vérité

Un tableau indiquant les sorties pour toutes les combinaisons possibles des entrées.

#### 🔸 Algèbre de Boole

Utilisée pour la **simplification des fonctions logiques** :

* **Identités fondamentales :**

  * $A + \overline{A} = 1$
  * $A \cdot \overline{A} = 0$
  * $A + 0 = A$, $A \cdot 1 = A$

* **Théorèmes de De Morgan :**

  * $\overline{A + B} = \overline{A} \cdot \overline{B}$
  * $\overline{A \cdot B} = \overline{A} + \overline{B}$

#### 🔸 Simplification (Méthode de Karnaugh)

* Grille 2x2, 4x4, etc.
* Regrouper les 1 (ou les 0) en blocs de 2, 4, 8…
* Objectif : **réduire le nombre de termes et donc de portes logiques**

#### 🔸 Circuits combinatoires courants

* **Additionneur complet** : addition de deux bits + retenue
* **Multiplexeur (MUX)** : sélectionne une entrée parmi plusieurs selon les lignes de sélection
* **Décodeur/Démultiplexeur** : active une sortie unique selon un code binaire en entrée
* **Encodeur** : donne un code binaire correspondant à une entrée active

---

### 2. ⏱ Logique Séquentielle (jusqu’aux compteurs)

#### 🔸 Définition

Un **circuit séquentiel** a des **sorties qui dépendent des entrées et de l’état précédent** → implique une **mémoire**.

#### 🔸 Bascules (latches & flip-flops)

| Type               | Description                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------- |
| **RS**             | Set-Reset, 2 entrées : S (Set), R (Reset). État mémoire si S = R = 0. Interdit si S = R = 1. |
| **RS avec Enable** | Active uniquement quand E = 1. Sinon conserve l’état.                                        |
| **D (Data)**       | Q ← D à chaque front d’horloge (CLK)                                                         |
| **JK**             | Version améliorée de RS où J=K=1 ⇨ bascule d’état                                            |
| **T (Toggle)**     | Change d’état à chaque front actif                                                           |

#### 🔸 Synchronisation

* **Asynchrone** : changement dès qu’une entrée change
* **Synchrone** : changement au **front montant de l’horloge**

#### 🔸 Compteurs

Basés sur des **bascules T ou D**. Permettent de compter :

* Des **impulsions**
* D’implémenter des **automates** (états successifs)

Exemples :

* **Compteur binaire 3 bits** : compte de 0 à 7 (000 à 111)
* **Compteur modulo N** : revient à 0 après N-1

---

### 3. 🖥 Assembleur Motorola 68000

#### 🔸 Processeur

* Architecture **16/32 bits**, 24 bits pour les adresses
* Exécute des instructions très proches du matériel

#### 🔸 Registres

| Type         | Noms                                      | Rôle                                |
| ------------ | ----------------------------------------- | ----------------------------------- |
| **Données**  | D0 à D7                                   | Stockage temporaire de données      |
| **Adresses** | A0 à A6                                   | Pointeurs d’adresses                |
| **Pile**     | A7                                        | Stack pointer (SSP ou USP)          |
| **PC**       | Program Counter                           | Adresse de la prochaine instruction |
| **SR/CCR**   | Status Register / Condition Code Register | Drapeaux : Z, N, V, C, X            |

#### 🔸 Taille d’opérande

* `.B` = Byte (8 bits)
* `.W` = Word (16 bits)
* `.L` = Long (32 bits)

#### 🔸 Instructions courantes

| Catégorie        | Instructions                         |
| ---------------- | ------------------------------------ |
| **Transfert**    | `MOVE`, `LEA`, `CLR`                 |
| **Arithmétique** | `ADD`, `SUB`, `MULS`, `MULU`, `DIVS` |
| **Logique**      | `AND`, `OR`, `EOR`, `NOT`, `NEG`     |
| **Branchement**  | `BRA`, `BNE`, `BEQ`, `BGE`, `BLT`... |
| **Trap système** | `TRAP #15` → affichage dans Sim68K   |
| **Autres**       | `CMP`, `TST`, `EXG`, `STOP`          |

#### 🔸 Modes d’adressage

* **Immédiat** : `#valeur`
* **Direct** : `D0`, `A0`
* **Indirect** : `(A0)`, `(A0)+`, `-(A0)`
* **Indexé** : `d(A0,D1.L)`

#### 🔸 Exemple de code

```asm
MOVE.B #45, D0
ADD.B #85, D0
TRAP #15 ; affiche le caractère correspondant
```

#### 🔸 Astuces et erreurs courantes

* `ADDI.B #$12345, D5` ❌ → dépasse 8 bits !
* Toujours adapter la taille : si >255, utiliser `.W` ou `.L`


