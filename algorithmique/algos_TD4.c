#include <stddef.h>

struct node
{
    int cle;
    struct node *fg;
    struct node *fd;
};

int find_char(char *str, char c, int index)
{
    int len = strlen(str);
    if ((str == NULL) || (index >= len))
    {
        return -1;
    }
    index += 1;
    while ((index < len) && (str[index] != c))
    {
        index++;
    }
    if (index == len)
    {
        return -1;
    }
    return index;
}

void Filltable(struct node *root, int *tab, int n)
{
    if (root != NULL)
    {
        tab[n - 1] = root->cle;
        Filltable(root->fg, tab, (n * 2));
        Filltable(root->fd, tab, ((n * 2) + 1));
    }
}

void node_to_tab(struct node *root, int *tab, int size)
{
    for (int i = 0; i < size; i++)
    {
        tab[i] = -1;
    }
    Filltable(root, tab, 1);
}

int Count_Path_RTN(struct node *root, struct node *end)
{
    if (root == NULL)
    {
        return (-1);
    }
    if (root == end)
    {
        return (+1);
    }
    int G = Count_Path_RTN(root->fg, end);
    int D = Count_Path_RTN(root->fd, end);
    if ((G < 0) && (D < 0))
    {
        return (-1);
    }
    if (G > 0)
    {
        return (G + 1);
    }
    else
    {
        return (D + 1);
    }
}

int Fill_Path_tab(struct node *root, struct node *end, struct node **tab,
                  int index)
{
    if (root != NULL)
    {
        if (root == end)
        {
            tab[index] = end;
            return 1;
        }
        int G = Fill_Path_tab(root->fg, end, tab, index + 1);
        int D = Fill_Path_tab(root->fg, end, tab, index + 1);
        if ((G > 0) || (D > 0))
        {
            tab[index] = root;
            return 1;
        }
        return -1;
    }
    return -1;
}

struct node **Build_Path_RTN(struct node *root, struct node *end)
{
    struct node **tab;
    int size = Count_Path_RTN(root, end);
    if (size < 0)
    {
        return NULL;
    }
    tab = malloc((size + 1) * sizeof(struct node *));
    if (tab == NULL)
    {
        return -1;
    }
    tab[size] = NULL;
    Fill_Path_tab(root, end, tab, 0);
}

struct liste *Search_Char(char *str, char c)
{
    struct liste *l = Createlist();
    int index;
    index = find_char(str, c, -1);
    while (index != -1)
    {
        l = Insert_list(l, index);
        index = find_char(str, c, index);
    }
    return l;
}

int array_length(struct node **tab)
{
    int i = 0;
    while (tab[i] != NULL)
    {
        i++;
    }
    return i;
}

void SWAP(struct node **T, int a, int b)
{
    struct node *tmp;
    tmp = T[a];
    T[a] = T[b];
    T[b] = tmp;
}

void invert_in_place(struct node **tab)
{
    int size = array_length(tab);
    int i = 0;
    while (i < ((size - 1) / 2))
    {
        SWAP(tab, i, (size - 1 - i)); // -1 ou -2 selon le array_length()
        i++;
    }
}

int common_prefix(struct node **tab1, struct node **tab2)
{
    if ((tab1 == NULL) || (tab2 == NULL))
    {
        return -1;
    }
    int i = 0;
    while ((tab1[i] != NULL) && (tab2[i] != NULL) && (tab1[i] == tab2[i]))
    {
        i++;
    }
    return i;
}

struct node **merge_arrays(struct node **tab1, struct node **tab2)
{
    if ((tab1 == NULL) || (tab2 == NULL))
    {
        return NULL;
    }
    int len1, len2;
    len1 = array_length(tab1);
    len2 = array_length(tab2);
    struct node **out = malloc(sizeof(struct node *) * (len1 + len2 + 1));
    for (int i = 0; i < len1; i++)
    {
        out[i] = tab1[i];
    }
    for (int i = 0; i < len2; i++)
    {
        out[len1 + i] = tab2[i];
    }
    out[len1 + len2] = NULL;
    return out;
}

struct node **Shortest_Path_Bintree(struct node *root, struct node *A,
                                    struct node *B)
{
    if ((root = NULL) || (A == NULL) || (B == NULL))
    {
        return NULL;
    }
    struct node **Path1 = Build_Path_RTN(root, A);
    struct node **Path2 = Build_Path_RTN(root, B);
    int prefixe = prefixe_commun(Path1, Path2);
    invert_in_place(Path1);
    Path1[array_length(Path1) - prefixe] = NULL;
    struct node **out = merge_arrays(*Path1, (Path2[prefixe]));
    free(Path1);
    free(Path2);
    return out;
}

int main()
{
    printf("rez = %d\n", find_char("test", 't', -1));
}
