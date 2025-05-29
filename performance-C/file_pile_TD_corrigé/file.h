#ifndef FILE_H
#define FILE_H

#include <stdlib.h>

#include "liste.h"

// ***
// INTERFACE D'UN SERVICE DE GESTION DE FILES de chaines caractères
// ***

//
// A- Type d'une file 
//

// Choix d'implémentation : une file (i) est une liste (ii) dans laquelle 
// on ajoute en dernière position et on retire en première position

typedef liste file; 

//
// B.1- Fonctions de création et suppression de file
//

#define creerF(capacite) creer(capacite)

#define supprimerF(file) supprimer(file)

//
// B.2- Fonctions de consultation d'une file
//

#define tailleF(file) taille(file)

#define estVideF(file) estVide(file)

#define debut(file) lire(file, 0)

//
// B.3- Fonctions de modification d'une file
//

#define enfiler(file, element) ajouter(file, -1, element)

#define defiler(file) retirer(file, 0)

#define viderF(file) vider(file)

#endif // FILE_H
