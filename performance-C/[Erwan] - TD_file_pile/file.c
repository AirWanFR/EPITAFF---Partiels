#include "file.h"

file* creerF(int capacite) {
    file* f = malloc(sizeof(file));
    if (f == NULL) {
        return NULL;
    }
    f->capacite = capacite;
    f->size = 0;
    f->tab = malloc(capacite * sizeof(char*));
    if (f->tab == NULL) {
        free(f);
        return NULL;
    }
    return f;
}

void supprimerF(file* f) {
    if (f != NULL) {
        for (int i = 0; i < f->size; i++) {
            free(f->tab[i]);
        }
        free(f->tab);
        free(f);
    }
}

int tailleF(const file* f) {
    if (f == NULL) {
        return -1;
    }
    return f->size;
}

int estVideF(const file* f) {
    if (f == NULL) {
        return 1;
    }
    return f->size == 0;
}

char* debut(const file* f) {
    if (f == NULL || f->size == 0) {
        return NULL;
    }
    return f->tab[0];
}

int enfiler(file* f, const char* element) {
    if (f == NULL || f->size >= f->capacite || element == NULL) {
        return 0;
    }
    f->tab[f->size] = strdup(element); // Copie de la chaîne
    if (f->tab[f->size] == NULL) {
        return 0;
    }
    f->size++;
    return 1;
}

char* defiler(file* f) {
    if (f == NULL || f->size == 0) {
        return NULL;
    }
    char* element = f->tab[0];
    for (int i = 1; i < f->size; i++) {
        f->tab[i - 1] = f->tab[i];
    }
    f->size--;
    return element;
}

void viderF(file* f) {
    if (f != NULL) {
        for (int i = 0; i < f->size; i++) {
            free(f->tab[i]);
        }
        f->size = 0;
    }
}