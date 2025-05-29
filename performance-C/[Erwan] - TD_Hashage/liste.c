#include "liste.h"

#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define INCR_TABLEAU 128  // incrément d'allocation du tableau quand capacité infinie demandée

// Fonctions utilitaires internes

static int estValide(const liste* liste) {
    return liste != NULL;
}

#ifdef IMPL_CHAINE

static void liberer(maillon* chaine) {

    while (chaine != NULL) {
        maillon* suivant = chaine->suivant;
        free(chaine);
        chaine = suivant;
    }

}

static maillon* maillonA(maillon* chaine, int position) {

    for (int p = 0; p < position; p++) {
        chaine = chaine->suivant;
    }
    return chaine;

}

#endif

// 1- Fonctions de création et suppression de liste

liste* creer(int capacite) {

    liste* nouveau = malloc(sizeof(liste));
    if (nouveau == NULL) {
        return NULL;
    }
    
    nouveau->taille = 0;
    nouveau->capacite = capacite;

#ifndef IMPL_CHAINE

    nouveau->alloue = capacite < 0 ? INCR_TABLEAU : capacite;
    nouveau->elements = malloc(sizeof(char*) * nouveau->alloue);

    if (nouveau->elements == NULL) {
        free(nouveau);
        return NULL;
    }

#else
    
    nouveau->tete = NULL;
    nouveau->queue = NULL;

#endif

    return nouveau;
}   
 
void supprimer(liste* liste) {

    if (!estValide(liste)) {
        return;
    }

#ifndef IMPL_CHAINE

    free(liste->elements);

#else

    liberer(liste->tete);

#endif

    free(liste);

}

// 2- Fonctions de consultation d'une liste

int taille(const liste* liste) {

    if (!estValide(liste)) {
        return -1;
    }
    return liste->taille;
}

int estVide(const liste* liste) {
    return taille(liste) == 0;
}

char* lire(const liste* liste, int position) {

    if (!estValide(liste) || 
        !(0 <= position && position < liste->taille)) {
        return NULL;
    }

#ifndef IMPL_CHAINE

    return liste->elements[position];

#else

    return maillonA(liste->tete, position)->element;

#endif
}

int position(const liste* liste, const char* element) {

    if (!estValide(liste)) {
        return -1;
    }

#ifndef IMPL_CHAINE

    for (int p = 0; p < liste->taille; p++) {
        if (strcmp(liste->elements[p], element) == 0) {
            return p;
        }
    }

#else

    maillon* courant = liste->tete;
    for (int p = 0; p < liste->taille; p++) {
        if (strcmp(courant->element, element) == 0) {
            return p;
        }
        courant = courant->suivant;
    }
    
#endif

    return -1;
}

int contient(const liste* liste, const char* element) {

    return position(liste, element) != -1;
}

// 3- Fonctions de modification d'une liste

int ecrire(liste* liste, int position, const char* element) {

    if (!estValide(liste) || 
        !(0 <= position && position < liste->taille) || 
        element == NULL) {
        return 0;
    }

#ifndef IMPL_CHAINE

    free(liste->elements[position]);
    liste->elements[position] = strdup(element);

#else
    
    maillon* maillon = maillonA(liste->tete, position);
    free(maillon->element);
    maillon->element = strdup(element);

#endif
    
    return 1;
}

int ajouter(liste* liste, int position, const char* element) {

    if (!estValide(liste) || 
        !((0 <= position && position <= liste->taille) || position == -1) || 
        element == NULL) {
        return 0;
    }

    // retourner si la capacité de la liste est déjà atteinte
    if (liste->capacite >= 0 && liste->taille >= liste->capacite) {
        return 0;
    }

#ifndef IMPL_CHAINE

    // augmenter si nécessaire la taille du tableau dynamique
    if (liste->capacite < 0 && liste->taille >= liste->alloue) {
        liste->alloue += INCR_TABLEAU;
        liste->elements = realloc(liste->elements, sizeof(char*) * liste->alloue);
        if (liste->elements == NULL) {
            return 1;
        }
    }

    // si ajout en dernière position
    if (position == -1) {
        position = liste->taille;
    }

    // décaler les éléments suivants d'une position à droite
    for (int i = liste->taille; i > position; i--) {
        liste->elements[i] = liste->elements[i - 1];
    }

    liste->elements[position] = strdup(element);
    liste->taille += 1;
    return 1;

#else
    
    maillon* aAjouter = malloc(sizeof(maillon));
    if (aAjouter == NULL) {
        return 0;
    }
    aAjouter->element = strdup(element);

    // si ajout en tête 
    if (position == 0) {
        aAjouter->suivant = liste->tete;
        liste->tete = aAjouter;
        if (liste->queue == NULL) {
            liste->queue = aAjouter;
        }
        liste->taille += 1;
        return 1;
    }

    // si ajout en queue
    if (position == liste->taille || position == -1) {
        aAjouter->suivant = NULL;
        if (liste->queue == NULL) {
            liste->tete = aAjouter;
        } else {
            liste->queue->suivant = aAjouter;
        }
        liste->queue = aAjouter;
        liste->taille += 1;
        return 1;
    } 

    // ajout au milieu
    maillon* precedent = maillonA(liste->tete, position - 1);
    aAjouter->suivant = precedent->suivant;
    precedent->suivant = aAjouter;
    liste->taille += 1;
    return 1;

#endif


}

char* retirer(liste* liste, int position) {
    if (!estValide(liste) ||
        !(0 <= position && position < liste->taille)) {
        return NULL;
    }

#ifndef IMPL_CHAINE

    // décaler les éléments suivants d'une position à gauche
    char* element = liste->elements[position];
    for (int i = position; i < liste->taille - 1; i++) {
        liste->elements[i] = liste->elements[i + 1];
    }
    liste->taille -= 1;

    // diminuer si nécessaire la taille du tableau dynamique
    if (liste->capacite < 0 && liste->taille <= liste->alloue - INCR_TABLEAU) {
        liste->alloue -= INCR_TABLEAU;
        liste->elements = realloc(liste->elements, sizeof(char*) * liste->alloue);
        if (liste->elements == NULL) {
            return NULL;
        }
    }

    return element;

#else
    
    liste->taille -= 1;

    // si retrait en tête
    if (position == 0) {
        maillon* aRetirer = liste->tete;
        liste->tete = aRetirer->suivant;
        if (aRetirer == liste->queue) {
            liste->queue = NULL;
        }

        char* element = aRetirer->element;
        free(aRetirer);
        return element;
    }

    // si retrait au milieu ou en queue
    maillon* precedent = maillonA(liste->tete, position - 1);
    maillon* aRetirer = precedent->suivant;
    precedent->suivant = aRetirer->suivant;
    if (aRetirer == liste->queue) {
        liste->queue = precedent;
    }

    char* element = aRetirer->element;
    free(aRetirer);
    return element;

#endif

}

void vider(liste* liste) {

    if (!estValide(liste)) {
        return;
    }


#ifndef IMPL_CHAINE

    if (liste->capacite < 0) {
        liste->alloue = INCR_TABLEAU;
        liste->elements = realloc(liste->elements, sizeof(char*) * liste->alloue);
    }

#else

    liberer(liste->tete);
    liste->tete = NULL;
    liste->queue = NULL;

#endif

    liste->taille = 0;

}

