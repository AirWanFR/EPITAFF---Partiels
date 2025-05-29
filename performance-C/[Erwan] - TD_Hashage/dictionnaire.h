#ifndef DICO_H
#define DICO_H

#include <stdlib.h>
#include <string.h>
#include <stdio.h>
#include <stdbool.h>

#define CAPACITE_INITIALE 32


// Déclaration d’un nœud (élément chaîné)
typedef struct {
    char* cle;
    char* valeur;
    struct node* suivant;
} node;

// Dictionnaire basé sur une table de hachage avec chaînage
typedef struct {
    node** tableau;  // tableau de pointeurs vers des listes chaînées
    int taille;      // taille du tableau
    int capacite;
} dico_t;

/* === Fonctions Importantes === */
// 1- Fonctions de création et suppression de dictionnaire
dico_t* creer_dico();
void supprimer_dico(dico_t* dico);
// 2- Fonctions d'ajout et de retrait
bool ajouter(const char* cle, const char* valeur, dico_t* dico);
char* retirer(const char* cle, dico_t* dico);
void vider_dico(dico_t* dico);

/* === Fonctions Utilitaires === */
// >> Fonctions de consultation
char* valeur(const char* cle, const dico_t* dico);
bool contient(const char* cle, const dico_t* dico);

int taille(const dico_t* dico);
bool estVide(const dico_t* dico);
static unsigned int hash(const char* cle);

#endif // DICO_H
