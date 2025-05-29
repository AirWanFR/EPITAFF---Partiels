#include <stdio.h>
#include <stdlib.h>

struct node
{
    int cle;
    struct node *fg;
    struct node *fd;
};

struct liste
{
    int val;
    struct liste *next;
};

int RechercheABR(struct node *T, int val)
{
    if (T == NULL)
    {
        return -1;
    }
    if (T->cle == val)
    {
        return T->cle;
    }
    if (val > T->cle)
    {
        return (RechercheABR(T->fd, val));
    }
    else
    {
        return (RechercheABR(T->fg, val));
    }
}

int BSTsearchIter(struct node *T, int val)
{
    while ((T != NULL) && (T->cle != val))
    {
        if (val <= T->cle)
        {
            T = T->fg;
        }
        else
        {
            T = T->fd;
        }
    }

    if (T == NULL)
    {
        return -1;
    }
    else
    {
        return T->cle;
    }
    
}

struct node *insert_BST_Leaf(struct node *R, int val) // pas opti
{
    if (R == NULL)
    {
        R = malloc(sizeof(struct node));
        R->cle = val;
        R->fg = NULL;
        R->fd = NULL;
        return R;
    }
    if (val <= R->cle)
    {
        R->fg = insert_BST_Leaf(R->fg, val);
    }
    else
    {
        R->fd = insert_BST_Leaf(R->fd, val);
    }
    return R;
}

struct node *Insert_BST_Leaf2(struct node *R, int val)
{
    if (R == NULL)
    {
        R = malloc(sizeof(struct node *));
        R->cle = val;
        R->fg = NULL;
        R->fd = NULL;
        return (R);
    }
    if (val <= R->cle)
    {
        if (R->fg != NULL)
        {
            Insert_BST_Leaf2(R->fg, val);
        }
        else
        {
            R->fg = malloc(sizeof(struct node));
            R->fg->cle = val;
            R->fg->fd = NULL;
            R->fg->fg = NULL;
        }
    }
    else
    {
        if (R->fd != NULL)
        {
            Insert_BST_Leaf2(R->fd, val);
        }
        else
        {
            R->fd = malloc(sizeof(struct node));
            R->fd->cle = val;
            R->fd->fd = NULL;
            R->fd->fg = NULL;
        }
    }
    return R;
}

struct node *Biggest_Lowest(struct node *R)
{
    R = R->fg;
    while (R->fd != NULL)
    {
        R = R->fd;
    }
    return R;
}

struct node *Delete_BST(struct node *R, int val)
{
    if (R == NULL)
    {
        return NULL;
    }
    if (R->cle != val)
    {
        if (val <= R->cle)
        {
            R->fg = Delete_BST(R->fg, val);
        }
        else
        {
            R->fd = Delete_BST(R->fd, val);
        }
        return R;
    }
    if (R->cle == val)
    {
        if ((R->fg == NULL) && (R->fd == NULL))
        {
            free(R);
            return NULL;
        }
        if ((R->fg == NULL) && (R->fd != NULL)
            || (R->fg != NULL) && (R->fd == NULL))
        {
            struct node *tmp;
            if (R->fg == NULL)
            {
                tmp = R->fd;
            }
            else
            {
                tmp = R->fg;
            }
            free(R);
            return tmp;
        }
        if ((R->fg != NULL) && (R->fd != NULL))
        {
            struct node *tmp = Biggest_Lowest(R);
            int val_tmp = tmp->cle;
            R->cle = val_tmp;
            R->fg = Delete_BST(R->fg, val_tmp);
            return R;
        }
    }
}

