#include <stdio.h>
#include <string.h>

#include "file.h"
#include "pile.h"

//
// Usage : testFilePile [arguments]*
//
// Enfile (empile) les arguments de lancement dans une file (pile), 
// puis les défile (dépile) un à un.
//
int main(int argc, const char* argv[]) {

    // créé une file et une pile
    file* file = creerF(1024);
    printf("creerF(...) = %p\n", (void*)file);
    pile* pile = creerP(1024);
    printf("creerP(...) = %p\n", (void*)pile);
    printf("\n");

    // enfile/empile les arguments
    for (int i = 1; i < argc; i++) {
        printf("enfiler(...) = %d\n", enfiler(file, argv[i]));
        printf("empiler(...) = %d\n", empiler(pile, argv[i]));
    }
    printf("\n");

    // defile les éléments
    while (!estVideF(file)) {
        printf("defiler(...) = %s\n", defiler(file));
    }
    printf("\n");

    // depile les éléments
    while (!estVideP(pile)) {
        printf("depiler(...) = %s\n", depiler(pile));
    }
    printf("\n");

    // fin d'utilisation
    printf("supprimerF(...)\n");
    supprimerF(file);
    printf("supprimerP(...)\n");
    supprimerP(pile);

    printf("terminé\n");
}
