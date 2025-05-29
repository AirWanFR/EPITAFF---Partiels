#ifndef LISTE_H
#define LISTE_H

#include <stdlib.h>

// ***
// INTERFACE D'UN SERVICE DE GESTION DE LISTES de chaines caractères
// ***

//
// A- Type d'une liste - A COMPLETER en fonction de la solution retenue
//

typedef struct {
    int capacite;
    int taille;
    char** elements;
    int alloue;
} liste;

//
// B.1- Fonctions de création et suppression de liste - ATTENTION : prototypes NON MODIFIABLES
//

/*
    Crée une nouvelle liste avec la capacité spécifiée. Les éléments de cette liste sont des chaines de
    caractères non NULL.

    Paramètre capacité : capacité de la liste, infinie si négatif

    Retourne la liste créée ou NULL si erreur
*/
liste* creer(int capacite);

/*
    Supprime la liste spécifiée.

    Paramètre liste : liste à supprimer
*/
void supprimer(liste* liste);

//
// B.2- Fonctions de consultation d'une liste - ATTENTION : prototypes NON MODIFIABLES
//

/*
    Retourne la taille de la liste spécifiée.

    Paramètre liste : liste à examiner

    Retourne la taille de la liste ou -1 si erreur
*/
int taille(const liste* liste);

/*
    Indique si la liste spécifiée est vide.

    Paramètre liste : liste à examiner

    Retourne 1 si la liste est vide, 0 sinon ou si erreur
*/
int estVide(const liste* liste);

/*
    Lit l'élément de position spécifié dans la liste spécifiée.

    Paramètre liste : liste à consulter
    Paramètre position : position de l'élément à lire, dans [0, taille()[

    Retourne l'élément à la position spécifiée ou NULL si erreur
*/
char* lire(const liste* liste, int position);

/*
    Détermine la position de l'élément spécifié dans la liste spécifiée, s'il est présent.  

    Paramètre liste : liste à consulter
    Paramètre element : élément à chercher

    Retourne la position de l'élément s'il est présent, -1 sinon ou si erreur
*/
int position(const liste* liste, const char* element);

/*
    Détermine si la liste spécifiée contient l'élément spécifié. 

    Paramètre liste : liste à consulter
    Paramètre element : élément à chercher

    Retourne 1 si la liste contient l'élément, 0 sinon ou si erreur
*/
int contient(const liste* liste, const char* element);

//
// B.3- Fonctions de modification d'une liste - ATTENTION : prototypes NON MODIFIABLES
//
/*
    Remplace, dans la liste spécifiée, l'élément de position spécifiée par l'élément spécifié.
    L'élément ne doit pas être NULL.

    Paramètre liste : liste à modifier
    Paramètre position : position de l'élément à remplacer, dans [0, taille()[
    Paramètre element : élément de remplacement, non NULL

    Retourne 1 en cas de succès ou 0 si erreur
*/
int ecrire(liste* liste, int position, const char* element);

/*
    Ajoute à la liste spécifiée l'élément spécifié à la position spécifiée. L'élément ne doit pas
    être NULL. Si la position est dans [0, taille()[, l'élément déjà à cette position et les suivants
    sont décalés d'un cran vers la droite (leur position est incrémentée). Si position est taille() ou
    -1, le nouvel élément est ajouté à la fin de la liste.

    Paramètre liste : liste à laquelle ajouter
    Paramètre element : élément à ajouter, non NULL
    Paramètre position : position à laquelle insérer, dans [0, taille()] ou -1

    Retourne 1 en cas de succès ou 0 si erreur
*/
int ajouter(liste* liste, int position, const char* element);

/*
    Retire de la liste spécifiée l'élément de position spécifiée. Les éléments suivants sont décalés
    d'un cran vers la gauche (leur position est décrémentée).

    Paramètre liste : liste de laquelle retirer
    Paramètre position : position de l'élément à retirer, dans [0, taille()[

    Retourne l'élément retiré ou NULL si erreur
*/
char* retirer(liste* liste, int position);

/*
    Vide la liste spécifiée de tous ses éléments. 

    Paramètre liste : liste à vider 
*/
void vider(liste* liste);

#endif // LISTE_H