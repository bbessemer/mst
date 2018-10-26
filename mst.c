/*
 * Copyright (C) 2018 Brent Bessemer.
 * All rights reserved.
 */

#include <stdlib.h>

typedef unsigned short vertex_t;

typedef struct {
    vertex_t v1, v2;
    unsigned int weight;
} edge_t;

typedef struct {
    unsigned int n; // order (number of vertices)
    unsigned int m; // size (number of edges)
    edge_t *edges;
} graph_t;

void random_graph (graph_t *graph, unsigned n, float d, unsigned w_max) {
    srand(time(NULL));
    size_t i = 0;
    graph->edges = malloc((n * (n - 1) / 2) * sizeof(edge_t));
    for (vertex_t v1 = 0; v1 < n; v1++) {
        for (vertex_t v2 = v1 + 1; j < n; v2++) {
            if (rand() / (float)INT_MAX < d) {
                graph->edges[i++] = (edge_t){v1, v2, rand() % w_max};
            }
        }
    }
    graph->n = n;
    graph->m = i;
    graph->edges = realloc(graph->edges, graph->m * sizeof(edge_t));
}

void kruskal_step (graph_t *graph, edge_t *tree_edges, unsigned *cmp_ids,
    unsigned step_i)
{
    // Find the minimum edge for which the two endpoints are in separate
    // components.
    edge_t *min;
    *min = (edge_t){0, 0, ~0};
    for (size_t j = 0; j < graph->m; j++) {
        edge_t *test = graph->edges + j;
        if (test->w < min->w && cmp_ids[test->v1] != cmp_ids[test->v2]) {
            min = test;
        }
    }

    // Add that edge to the tree.
    tree_edges[step_i] = *min;

    // Merge the two components.
    unsigned c1 = cmp_ids[min->v1];
    unsigned c2 = cmp_ids[min->v2];
    for (size_t j = 0; j < graph->n; j++) {
        if (cmp_ids[j] == c2) cmp_ids[j] = c1;
    }
}

void prim_step (graph_t *graph, edge_t *tree_edges, vertex_t *tree_verts,
    unsigned step_i)
{

}
