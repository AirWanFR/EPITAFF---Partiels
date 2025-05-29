#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#include "liste.h"

//
// Usage : testPerformances <charge> <iterations> <t|q> <t|q>
//
// Test de performances d'une liste.
//
// Paramètres
// <charge> : nombre inital d'élement dans la liste
// <iterations> : nombre de ajouter() + retirer() effectués
// <t|q> : t = ajouter() en tête, q = ajouter() en queue
// <t|q> : t = retirer() en tête, q = retirer() en queue 
//
int main(int argc, const char* argv[]) {

    // controler syntaxe et paramètres
    if (argc != 5) {
        fprintf(stderr, "usage: %s <charge> <iterations> <ajouter : t|q> <retirer : t|q>\n", argv[0]);
        return 1;
    }

    int charge = atoi(argv[1]);
    int iterations = atoi(argv[2]);
    int ouAjouter = (argv[3][0] == 't' ? 0 : -1);
    int ouRetirer = (argv[4][0] == 't' ? 0 : -1);

    // charger la liste 
    liste* liste = creer(2 * charge + 1);
    for (int i = 0; i < charge; i++) {
        if (!ajouter(liste, ouAjouter, "test")) {
            fprintf(stderr, "erreur ajouter()\n");
            return 3;
        }
    }

    // iterer sur ajouter() + retirer()
    for (int n = 0; n < iterations; n++) {
        if (!ajouter(liste, ouAjouter, "test")) {
            fprintf(stderr, "[%d]: erreur ajouter()\n", n);
            return 3;
        }
        char* element = retirer(liste, ouRetirer == 0 ? 0 : taille(liste) - 1);
        if (element == NULL) {
            fprintf(stderr, "[%d]: erreur retirer()\n", n);
            return 3;
        }
        free(element);
    }

    // vider la liste
    while (taille(liste) != 0) {
        char* element = retirer(liste, ouRetirer == 0 ? 0 : taille(liste) - 1);
        if (element == NULL) {
            fprintf(stderr, "erreur retirer()\n");
            return 3;
        }
        free(element);
    }

    // fin d'utilisation
    supprimer(liste);
}
