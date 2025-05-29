#ifndef PILE_H
#define PILE_H

#include <stdlib.h>

#include "liste.h"

// ***
// INTERFACE D'UN SERVICE DE GESTION DE PILES de chaines caractères
// ***

//
// A- Type d'une pile
//

// Choix d'implémentation : une pile (i) est une liste (ii) dans laquelle 
// on ajoute et on retire en dernière position.

typedef liste pile; 

//
// B.1- Fonctions de création et suppression de pile
//

#define creerP(capacite) creer(capacite)

#define supprimerP(pile) supprimer(pile)

//
// B.2- Fonctions de consultation d'une pile
//

#define tailleP(pile) taille(pile)

#define estVideP(pile) estVide(pile)

#define sommet(pile) lire(pile, tailleP(pile) - 1);

//
// B.3- Fonctions de modification d'une pile
//

#define empiler(pile, element) ajouter(pile, -1, element)

#define depiler(pile) retirer(pile, taille(pile) - 1)

#define viderP(pile) vider(pile)

#endif // PILE_H
