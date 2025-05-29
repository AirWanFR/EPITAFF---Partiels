#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include "dictionnaire.h"

#define RED     "\x1b[31m"
#define GREEN   "\x1b[32m"
#define YELLOW  "\x1b[33m"
#define CYAN    "\x1b[36m"
#define PURPLE  "\x1b[35m"
#define RESET   "\x1b[0m"

void afficher_dico(const dico_t* dico) {
    if (dico == NULL) {
        printf(RED "Dictionnaire NULL\n" RESET);
        return;
    }
    printf(YELLOW "Contenu du dictionnaire (taille = %d, capacité = %d) : " RESET, dico->taille, dico->capacite);

    if (dico->taille == 0) {
        printf(GREEN "{}\n\n" RESET);
        return;
    }

    printf(PURPLE "{");
    bool premier = true;

    for (int i = 0; i < dico->capacite; i++) {
        node* courant = dico->tableau[i];
        while (courant != NULL) {
            if (!premier) {
                printf("; ");
            }
            printf(CYAN "%s" RESET ": " PURPLE "%s" RESET, courant->cle, courant->valeur);
            premier = false;
            courant = courant->suivant;
        }
    }
    printf(PURPLE "}\n\n" RESET);
}

int main() {
    printf(CYAN "=== TEST DICTIONNAIRE ===\n\n" RESET);

    dico_t* dico = creer_dico();
    if (dico == NULL) {
        printf(RED "Erreur création dictionnaire\n" RESET);
        return 1;
    }

    printf(YELLOW "1. Dictionnaire créé. Taille = %d, Capacité = %d\n" RESET, taille(dico), dico->capacite);
    afficher_dico(dico);

    printf(YELLOW "2. Ajout de clés/valeurs simples\n" RESET);
    ajouter("pomme", "fruit rouge", dico);
    ajouter("banane", "fruit jaune", dico);
    ajouter("carotte", "légume orange", dico);
    printf(YELLOW "Après ajout, taille = %d, capacité = %d\n" RESET, taille(dico), dico->capacite);
    afficher_dico(dico);

    printf(YELLOW "3. Vérification avec contient() et valeur()\n" RESET);
    const char* cles[] = {"pomme", "banane", "carotte", "poire"};
    for (int i = 0; i < 4; i++) {
        const char* cle = cles[i];
        printf(CYAN "Clé : '%s' -> ", cle);
        if (contient(cle, dico)) {
            char* val = valeur(cle, dico);
            printf(GREEN "existe, valeur = %s\n" RESET, val);
            free(val);
        } else {
            printf(RED "n'existe pas\n" RESET);
        }
    }
    printf("\n");

    printf(YELLOW "4. Test massif : 10 000 couples clé/valeur\n" RESET);
    char cle_buf[32], val_buf[64];
    int erreurs = 0;

    for (int i = 0; i < 10000; i++) {
        sprintf(cle_buf, "clé_%d", i);
        sprintf(val_buf, "valeur_%d", i);
        if (!ajouter(cle_buf, val_buf, dico)) {
            printf(RED "Erreur à l'ajout de %s\n" RESET, cle_buf);
            erreurs++;
        }
    }
    printf(GREEN "Ajout terminé. Taille = %d, Capacité = %d, Erreurs = %d\n" RESET, taille(dico), dico->capacite, erreurs);

    printf(YELLOW "5. Vérification des 10 000 avec contient() + valeur()\n" RESET);
    erreurs = 0;
    for (int i = 0; i < 10000; i++) {
        sprintf(cle_buf, "clé_%d", i);
        if (!contient(cle_buf, dico)) {
            erreurs++;
            continue;
        }
        char* val = valeur(cle_buf, dico);
        if (val == NULL || strncmp(val, "valeur_", 7) != 0) {
            erreurs++;
        }
        free(val);
    }
    if (erreurs == 0) {
        printf(GREEN "Tout est correct pour les 10 000 couples ! ✅\n" RESET);
    } else {
        printf(RED "Erreurs détectées : %d ❌\n" RESET, erreurs);
    }

    printf(YELLOW "tests perso \n" RESET);
    for (int i = 0; i < 10000; i++) {
        char cle[32];
        char val[32];
        sprintf(cle, "cle_%d", i);
        sprintf(val, "valeur_%d", i);
        ajouter(cle, val, dico);
    }

    for (int i = 0; i < 10000; i++) {
        char cle[32];
        sprintf(cle, "cle_%d", i);
        if (!contient(cle, dico)) {
            printf(RED "Erreur : clé %s non trouvée\n" RESET, cle);
        }
    }

    printf(YELLOW "6. Suppression finale\n" RESET);
    supprimer_dico(dico);
    printf(CYAN "=== FIN DU TEST ===\n" RESET);
    return 0;
}
