#include "dictionnaire.h"

dico_t* creer_dico() {
    dico_t* dico = malloc(sizeof(dico_t));
    if (dico == NULL) return NULL;

    dico->capacite = CAPACITE_INITIALE;
    dico->taille = 0;

    dico->tableau = malloc(sizeof(node*) * dico->capacite);
    if (dico->tableau == NULL) {
        free(dico);
        return NULL;
    }

    for (int i = 0; i < dico->capacite; i++) {
        dico->tableau[i] = NULL;
    }

    return dico;
}


void supprimer_dico(dico_t* dico) {
    if (dico == NULL) {
        return;
    }
    vider_dico(dico);
    free(dico);
}


int taille(const dico_t* dico) {
    return (dico != NULL) ? dico->taille : -1;
}


char* valeur(const char* cle, const dico_t* dico) {
    if (dico == NULL) {
        return NULL;
    }
    unsigned int index = hash(cle) % dico->capacite;
    node* courant = dico->tableau[index];
    while (courant != NULL) {
        if (strcmp(courant->cle, cle) == 0) {
            return strdup(courant->valeur);
        }
        courant = courant->suivant;
    }
    return NULL;
}

bool contient(const char* cle, const dico_t* dico) {
    if (dico == NULL) return false;

    unsigned int index = hash(cle) % dico->capacite;
    node* courant = dico->tableau[index];

    while (courant != NULL) {
        if (strcmp(courant->cle, cle) == 0) {
            return true;
        }
        courant = courant->suivant;
    }
    return false;
}


bool ajouter(const char* cle, const char* valeur, dico_t* dico) {
    if (dico == NULL || valeur == NULL) {
        return false;
    }

    if ((dico->taille + 1.0 ) / dico->capacite > 0.75 ){
        node** newTab = calloc(dico->capacite * 2, sizeof(node*));

        if(newTab != NULL){
            node** prevTab = dico->tableau;
            int prevDim = dico->capacite;
            dico->tableau = newTab;
            dico->capacite *= 2;

            replacer(dico, prevTab, prevDim);
        }
    }

    unsigned int index = hash(cle) % dico->capacite;
    node* courrant = dico->tableau[index];
    while(courrant != NULL) {
        if (strcmp(courrant->cle, cle) == 0) {
            courrant->valeur = valeur;
            return true;
        }
        courrant = courrant->suivant;
    }
    node* nouveau = malloc(sizeof(node));
    if (nouveau == NULL) {
        return false;
    }
    nouveau->cle = strdup(cle);
    nouveau->valeur = strdup(valeur);
    nouveau->suivant = dico->tableau[index];
    dico->tableau[index] = nouveau;
    dico->taille++;
    return true;
}

char* retirer(const char* cle, dico_t* dico) {
    if (dico == NULL) {
        return NULL;
    }
    unsigned int index = hash(cle) % dico->capacite;
    node* courant = dico->tableau[index];
    node* precedent = NULL;
    while (courant != NULL) {
        if (strcmp(courant->cle, cle) == 0) {
            char* valeurSupprimee = strdup(courant->valeur);
            if (precedent == NULL) {
                dico->tableau[index] = courant->suivant;
            } else {
                precedent->suivant = courant->suivant;
            }
            free(courant->cle);
            free(courant->valeur);
            free(courant);
            dico->taille--;
            return valeurSupprimee;
        }
        precedent = courant;
        courant = courant->suivant;
    }
    return NULL;
}

void vider_dico(dico_t* dico) {
    if (dico == NULL) {
        return;
    }
    if(dico->taille == 0) {
        return;
    }
    for (int i = 0; i < dico->taille; i++) {
        node* courant = dico->tableau[i];
        while (courant != NULL) {
            node* temp = courant;
            courant = courant->suivant;
            free(temp);
        }
        dico->tableau[i] = NULL;
    }
    dico->taille = 0;
}

void replacer(dico_t* dico, node** prevTab, int prevDim) {
    for (int i = 0; i < prevDim; i++) {
        node* courant = prevTab[i];
        while (courant != NULL) {
            node* suivant = courant->suivant; 
            unsigned int index = hash(courant->cle) % dico->capacite;
            courant->suivant = dico->tableau[index];
            dico->tableau[index] = courant;
            courant = suivant;
        }
    }
    free(prevTab); 
}


static unsigned int hash(const char* cle) {
    if(cle == NULL) {
        return 0;
    }
    unsigned int somme = 0;
    for (int i = 0; cle[i] != '\0'; i++) {
        somme += cle[i];
    }
    return somme;
}