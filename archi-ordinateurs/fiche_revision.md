
## FICHE DE RÉVISION

### 1. **Logique combinatoire**

* **Définition** : la sortie dépend uniquement des entrées (pas de mémoire).
* **Portes logiques de base** :

  * **NON** (NOT)
  * **ET** (AND)
  * **OU** (OR)
  * **XOR**, **NAND**, **NOR**, **XNOR**
* **Table de vérité** : tableau listant toutes les combinaisons d’entrée et les sorties associées.
* **Algèbre de Boole** : utilisée pour simplifier les expressions logiques.
* **Théorèmes utiles** :

  * $A + \overline{A} = 1$, $A \cdot \overline{A} = 0$
  * Théorème de De Morgan : $\overline{A + B} = \overline{A} \cdot \overline{B}$
* **Outils de simplification** : table de Karnaugh
* **Circuits combinatoires** : multiplexeurs, encodeurs, décodeurs, additionneurs.

---

### 2. **Logique séquentielle**

* **Définition** : sortie dépend des entrées **et** de l’état précédent → mémoire.
* **Bascules** :

  * **RS** (Set/Reset)
  * **D** (Data) : Q ← D à l’horloge
  * **JK** : extension de RS, autorise J=K=1
* **Horloge (CLK)** : synchronise les changements d'état
* **Types de circuits** :

  * **Asynchrones** : changent d’état sans signal d’horloge
  * **Synchrones** : changements déclenchés par l’horloge
* **Compteurs** : basés sur des bascules ; comptent les impulsions d’horloge (binaire, décimal...)

---

### 3. **Assembleur Motorola 68000**

* **Registres** :

  * **D0-D7** : registres de données
  * **A0-A7** : registres d’adresses (A7 = pile)
* **Types de données** :

  * .B (byte, 8 bits), .W (word, 16 bits), .L (long, 32 bits)
* **Instructions courantes** :

  * **MOVE** source, dest
  * **ADD**, **SUB**, **MULS**, **MULU**
  * **AND**, **OR**, **EOR**
  * **TRAP #15** : appel système (ex : affichage)
  * **BRA**, **BNE**, **BEQ** : branchements
* **CCR (Condition Code Register)** : contient les indicateurs :

  * Z (zero), N (négatif), V (overflow), C (retenue), X (extension)
* **Syntaxe exemple** :

```asm
MOVE.B #45, D0
ADD.B #85, D0
TRAP #15
```

* **Limites** :

  * ADDI.B ne peut excéder 255 : `ADDI.B #$12345, D5` est invalide.
* **Logiciel utilisé** : Easy68K ou asm-editor.specy.app


