#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <limits.h>

// #include "pile.h"
// #include "file.h"
#include "liste.h"

#define NB_ITERATION 1

int main(int argc, char *argv[])
{
    // unsigned long long int nb_operations = 42949672950;
    unsigned long long int nb_operations = ULLONG_MAX;
  if (argc > 1) {
      nb_operations = atoi(argv[1]);
  }

    for(int i=0; i<NB_ITERATION; i++ ) {
        {
            liste* l = creer(128);
            printf("Ajouter\n");
            {
                clock_t debut = clock();
                for (int i = 0; i < nb_operations; i++) {
                    ajouter(l, -1, "some_data");
                }
                clock_t fin = clock();
                double duree = (double)(fin - debut) / CLOCKS_PER_SEC;
                printf("Temps total: %f s\n", duree);
                printf("Temps moyen: %f microsecondes\n", (duree * 1e6) / nb_operations);
            }
            printf("Retirer\n");
            {
                clock_t debut = clock();
                for (int i = 0; i < nb_operations; i++) {
                    const char* val = retirer(l, 0);
                    (void)val;
                }
                clock_t fin = clock();
                double duree = (double)(fin - debut) / CLOCKS_PER_SEC;
                printf("Temps total: %f s\n", duree);
                printf("Temps moyen: %f microsecondes\n", (duree * 1e6) / nb_operations);
            }
            supprimer(l);
        }
    }
    return 0;
}