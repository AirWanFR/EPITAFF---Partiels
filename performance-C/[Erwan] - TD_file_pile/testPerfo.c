#include "file.h"
#include <stdio.h>

int main(int argc, char* argv[]){
    int charge = atoi(argv[1]);
    int taille = atoi(argv[2]);
    file* f = creerF(charge + 1);
    for(int i = 0; i < charge; i++){
        enfiler(f, "test");
        printf("charge n: %d\n", i);
    }
    for(int i = 0; i < taille; i++){
        enfiler(f, "test");
        printf("taille n: %d\n", i);
        defiler(f);
    }
    
}