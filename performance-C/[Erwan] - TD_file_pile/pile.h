#ifndef PILE_H
#define PILE_H

#include <stdlib.h>

// ***
// INTERFACE D'UN SERVICE DE GESTION DE PILES de chaines caractères
// ***

//
// A- Type d'une pile - A COMPLETER en fonction de la solution retenue
//

typedef int pile; // pour compiler

//
// B.1- Fonctions de création et suppression de pile - ATTENTION : prototypes NON MODIFIABLES
//

/*
    Crée une nouvelle pile avec la capacité spécifiée. Les éléments de cette pile sont des chaines de
    caractères non NULL.

    Paramètre capacité : capacité de la pile, infinie si négatif

    Retourne la pile créée ou NULL si erreur
*/
pile* creerP(int capacite);

/*
    Supprime la pile spécifiée.

    Paramètre pile : pile à supprimer
*/
void supprimerP(pile* pile);

// B.2- Fonctions de consultation d'une pile - ATTENTION : prototypes NON MODIFIABLES

/*
    Retourne la taille de la pile spécifiée.

    Paramètre pile : pile à examiner

    Retourne la taille de la pile ou -1 si erreur
*/
int tailleP(const pile* pile);

/*
    Indique si la pile spécifiée est vide.

    Paramètre pile : pile à examiner

    Retourne 1 si la pile est vide, 0 sinon ou si erreur
*/
int estVideP(const pile* pile);

/*
    Retourne l'élement situé au début de la pile spécifiée.

    Paramètre pile : pile à examiner

    Retourne l'élément au début de la pile s'il existe, NULL sinon ou si erreur
*/
char* sommet(const pile* pile);

//
// B.3- Fonctions de modification d'une pile - ATTENTION : prototypes NON MODIFIABLES
//
/*
    Empile l'élément spécifié au sommet de la pile spécifiée. L'élément ne doit pas être NULL.

    Paramètre pile : pile à modifier
    Paramètre element : élément à empiler, non NULL

    Retourne 1 en cas de succès ou 0 si erreur
*/
int empiler(pile* pile, const char* element);

/*
    Dépile l'élément au sommet de la pile spécifiée.

    Paramètre pile : pile à modier

    Retourne l'élément dépilé en cas de succès ou NULL si erreur
*/
char* depiler(pile* pile);

/*
    Vide la pile spécifiée de tous ses éléments. 

    Paramètre pile : pile à vider 
*/
void viderP(pile* pile);

#endif // PILE_H