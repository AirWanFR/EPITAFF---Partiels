#include <stdio.h>
#include <stdlib.h>

struct node {
    int cle;
    struct node *fg;
    struct node *fd;
};

int* node_to_array(struct node *root, int *tab, int size) {

    for(int i = 0; i < size; i++) {
        tab[i] = -1; 
    }

    if (root == NULL || tab == NULL || size <= 0) {
        return tab;
    }

    remplissage(root, tab, size, 0);

    return tab;
}

void remplissage(struct node *root, int *tab,int size, int n) {
    if (root != NULL) {
        tab[n] = root->cle;
        remplissage(root->fg, tab, size, n * 2 + 1);
        remplissage(root->fd, tab, size, n * 2 + 2);
    }
}