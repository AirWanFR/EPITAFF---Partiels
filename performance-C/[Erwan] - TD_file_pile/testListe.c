#include <stdio.h>
#include <string.h>

#include "liste.h"


// retourne une chaine representant la liste donnée
char* enChaine(const liste* liste) {
    
    int t = taille(liste);
    if (t == 0) {
        return strdup("[]");
    }

    char chaine[4096];
    int l = sprintf(chaine, "[");
    for (int i = 0; i < t - 1; i++) {
        char* element = lire(liste, i);
        if (l + strlen(element) + 8 >= sizeof(chaine)) {
            sprintf(chaine + l, "...]");
            return strdup(chaine);
        }
        l += sprintf(chaine + l, "\"%s\", ", element);
    }

    sprintf(chaine + l, "\"%s\"]", lire(liste, t - 1));
    return strdup(chaine);
}

//
// Usage : testListe [arguments]* [-]
//
// Ajoute les arguments de lancement à une liste, en queue (défaut) ou en tête (si - final), 
// affiche la liste, puis retire ses éléments un à un.
//
// Exerce les fonctions essentielles du service de gestion de listes : 
// - creer(), supprimer()
// - taille(), lire()
// - ajouter(), retirer()
//
liste* creer(int capacite){
	liste* new_liste = malloc(sizeof(liste));
	new_liste->size = 0;
	new_liste->capacite = capacite;
	new_liste->tab = malloc((sizeof(char*)*capacite));
	return new_liste;
}

void supprimer(liste* liste){
	if (liste != NULL) {
		free(liste->tab);
		free(liste);
	}
}

int taille(const liste* liste) {
    return liste == NULL ? -1 : liste->size;
}

int estVide(const liste* liste) {
    if (liste == NULL || liste->tab == NULL || liste->capacite <= 0)
        return 0;
    return liste->size == 0 ? 1 : 0;
}

char* lire(const liste* liste, int position) {
    if (liste == NULL || liste->tab == NULL || liste->capacite <= 0 || position < 0 || position >= liste->size)
        return NULL;
    return liste->tab[position];
}


int position(const liste *liste, const char *element) {
    if (liste == NULL || liste->tab == NULL || liste->capacite <= 0)
        return -1;

    for (int i = 0; i < liste->size; i++) {
        if (strcmp(liste->tab[i], element) == 0) {
            return i;
        }
    }
    return -1;
}

int contient(const liste *liste, const char *element) {
    if (liste == NULL || liste->tab == NULL || liste->capacite <= 0)
        return 0;
    return position(liste, element) != -1 ? 1 : 0;
}

int ecrire(liste *liste, int position, const char *element) {
    if (liste == NULL || liste->tab == NULL || liste->capacite <= 0 || position < 0 || position >= liste->size)
        return -1;
    liste->tab[position] = strdup(element);
    return 0;
}

int ajouter(liste *liste, int ou, const char *element) {
    if (liste == NULL || liste->tab == NULL || liste->capacite <= 0 || liste->size >= liste->capacite)
        return 0;
    if (ou == 0) {
        for (int i = liste->size; i > 0; i--) {
            liste->tab[i] = liste->tab[i - 1];
        }
        liste->tab[0] = strdup(element);
    } else {
        liste->tab[liste->size] = strdup(element);
    }
    liste->size++;
    return 1;
}

char* retirer(liste *liste, int position) {
    if (liste == NULL || liste->tab == NULL || liste->capacite <= 0 || position < 0 || position >= liste->size)
        return NULL;
    char *element = liste->tab[position];
    for (int i = position; i < liste->size - 1; i++) {
        liste->tab[i] = liste->tab[i + 1];
    }
    liste->size--;
    return element;
}  

void vider(liste *liste) {
    if (liste == NULL || liste->tab == NULL || liste->capacite <= 0)
        return;
    for (int i = 0; i < liste->size; i++) {
        free(liste->tab[i]);
    }
    liste->size = 0;
    liste->capacite = 0;
    free(liste->tab);
    liste->tab = NULL;
}

 /* 
            +================================+
            |███╗   ███╗ █████╗ ██╗███╗   ██╗|
            |████╗ ████║██╔══██╗██║████╗  ██║|
            |██╔████╔██║███████║██║██╔██╗ ██║|
            |██║╚██╔╝██║██╔══██║██║██║╚██╗██║|
            |██║ ╚═╝ ██║██║  ██║██║██║ ╚████║|
            |╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝|
            +================================+
*/
/*
int main(int argc, const char* argv[]) {

    // ajouter en queue ou en tête ?
    int ou = -1;
    if (strcmp(argv[argc - 1], "-") == 0) {
        ou = 0;
        argc -= 1;
    }

    // ajoute les arguments dans une liste
    liste* liste = creer(1024);
    printf("creer(...) = %p\n", liste);
    for (int i = 1; i < argc; i++) {
        printf("ajouter(...) = %d\n", ajouter(liste, ou, argv[i]));
    }

    // affiche la liste et sa taille
    printf("arguments : (%d) %s\n", taille(liste), enChaine(liste));

    // vide la liste élément par élément par la tête
    while (taille(liste) != 0) {
        printf("retirer(...) = %s\n", retirer(liste, 0));
    }

    // fin d'utilisation
    printf("supprimer(...)\n");
    supprimer(liste);
    printf("terminé\n");
}
*/