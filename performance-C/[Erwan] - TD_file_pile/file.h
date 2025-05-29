#ifndef FILE_H
#define FILE_H

#include <stdlib.h>
#include "liste.h"

// ***
// INTERFACE D'UN SERVICE DE GESTION DE FILES de chaines caractères
// ***

//
// A- Type d'une file - A COMPLETER en fonction de la solution retenue
//

typedef liste file;

//
// B.1- Fonctions de création et suppression de file - ATTENTION : prototypes NON MODIFIABLES
//

/*
    Crée une nouvelle file avec la capacité spécifiée. Les éléments de cette file sont des chaines de
    caractères non NULL.

    Paramètre capacité : capacité de la file, infinie si négatif

    Retourne la file créée ou NULL si erreur
*/
file* creerF(int capacite);

/*
    Supprime la file spécifiée.

    Paramètre file : file à supprimer
*/
void supprimerF(file* file);

//
// B.2- Fonctions de consultation d'une file - ATTENTION : prototypes NON MODIFIABLES
//

/*
    Retourne la taille de la file spécifiée.

    Paramètre file : file à examiner

    Retourne la taille de la file ou -1 si erreur
*/
int tailleF(const file* file);

/*
    Indique si la file spécifiée est vide.

    Paramètre file : file à examiner

    Retourne 1 si la file est vide, 0 sinon ou si erreur
*/
int estVideF(const file* file);

/*
    Retourne l'élement situé au début de la file spécifiée.

    Paramètre file : file à examiner

    Retourne l'élément au début de la file s'il existe, NULL sinon ou si erreur
*/
char* debut(const file* file);

//
// B.3- Fonctions de modification d'une file - ATTENTION : prototypes NON MODIFIABLES
//
/*
    Enfile l'élément spécifié à la fin de la file spécifiée. L'élément ne doit pas être NULL.

    Paramètre file : file à modifier
    Paramètre element : élément à enfiler, non NULL

    Retourne 1 en cas de succès ou 0 si erreur
*/
int enfiler(file* file, const char* element);

/*
    Défile l'élément situé au début de la file spécifiée.

    Paramètre file : file à modier

    Retourne l'élément défilé en cas de succès ou NULL si erreur
*/
char* defiler(file* file);

/*
    Vide la file spécifiée de tous ses éléments. 

    Paramètre file : file à vider 
*/
void viderF(file* file);

#endif // FILE_H