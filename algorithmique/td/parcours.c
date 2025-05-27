#include <stdio.h>
#include <stdlib.h>
#include <stddef.h>

void afficherTab(int tab[], int size)
{
    for (int i = 0; i < size; i++)
    {
        printf("%d\n", tab[i]);
    }
}

void afficherChaine(char mot[])
{
    int i = 0;
    while (mot[i] != '\0')
    {
        printf("%c", mot[i]);
        i++;
    }
}

/*
== EXERCICES ==

1. Ecrire une fonction qui retourne l'indice de la première occurrence d'un caractère 'lettre' dans une chaîne de caractères 'mot".
   Si le caractère n'est pas trouvé, la fonction retourne -1.

2. Ecrire une fonction qui retourne le nombre total d'occurrences d'un caractère 'lettre' dans une chaîne de caractères 'mot'.
   Si le caractère n'est pas trouvé, la fonction retourne 0.

3. Ecrire une fonction qui prends en paramètre une chaîne de caractères 'mot', un caractère 'lettre', et un entier 'index'.
   La fonction retourne l'indice de la première occurrence du caractère 'lettre' dans la chaîne 'mot' à partir de l'indice 'index'.
   Si le caractère n'est pas trouvé, la fonction retourne -1.
*/

int find_index(char mot[], char lettre)
{
    int i = 0;
    while (mot[i] != '\0')
    {
        if (mot[i] == lettre)
        {
            return i;
        }
        i++;
    }
    return -1; // Si le caractère n'est pas trouvé
}

int count_occurrences(char mot[], char lettre)
{
    int count = 0;
    int i = 0;
    while (mot[i] != '\0')
    {
        if (mot[i] == lettre)
        {
            count++;
        }
        i++;
    }
    return count;
}

int find_index_from(char mot[], char lettre, int index)
{
    if (index < 0 || mot[index] == '\0')
    {
        return -1;
    }
    while (mot[index] != '\0')
    {
        if (mot[index] == lettre)
        {
            return index;
        }
        index++;
    }
    return -1;
}

int prochaine_occurence(char *mot, char lettre, int indice) {
    int i = indice + 1;

    while (mot[i] != '\0') {
        if (mot[i] == lettre) {
            return i;
        }
        i++;
    }
    return -1;
}

/* 
 === REPRISE DE CONTEXTE ===

 - Problèmes - 

 Etant donné mot, lettre, écrire une fonction qui retourne un tableau contenant tous les indices des occurences de lettres

 ex: R | E | V | I | S | I | O | N
    
    lettre : I

    output : 3 | 5
*/

int* index_return(char mot[], char lettre){
    int count = count_occurrences(mot, lettre);
    if (count == 0) {
        return NULL; 
    }

    int *indices = (int *)malloc(count * sizeof(int));
    if (indices == NULL) {
        return NULL; 
    }

    int index = 0;
    int i = 0;
    while (mot[i] != '\0') {
        if (mot[i] == lettre) {
            indices[index++] = i;
        }
        i++;
    }
    
    return indices;
}