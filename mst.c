/*
 * Copyright (C) 2018 Brent Bessemer.
 * All rights reserved.
 */

#include <stdlib.h>
#include <math.h>

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

edge_t kruskal_step (const graph_t *graph, unsigned *cmp_ids) {
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

    // Merge the two components.
    unsigned c1 = cmp_ids[min->v1];
    unsigned c2 = cmp_ids[min->v2];
    for (size_t j = 0; j < graph->n; j++) {
        if (cmp_ids[j] == c2) cmp_ids[j] = c1;
    }

    return *min;
}

edge_t prim_step (const graph_t *graph, unsigned *is_in_tree) {
    // Find the minimum edge for which the two endpoints are in separate
    // components.
    edge_t *min;
    *min = (edge_t){0, 0, ~0};
    for (size_t j = 0; j < graph->m; j++) {
        edge_t *test = graph->edges + j;
        if (test->w < min->w && is_in_tree[test->v1] ^ is_in_tree[test->v2]) {
            min = test;
        }
    }

    // Make sure both vertices are now in the tree.
    is_in_tree[min->v1] = 1;
    is_in_tree[min->v2] = 1;

    return *min;
}

typedef struct {
    unsigned char r, g, b, a;
} color_t;

static float smoothstep (float x, float min, float max) {
    x = (x - min) / (max - min);
    return x * x * (3 - 2 * x);
}

#define SQRT3_4 0.86602540378

void draw_circle (color_t *pixels, unsigned w, unsigned h, unsigned cx,
    unsigned cy, unsigned r, color_t color)
{
    for (int dy = -r; dy <= r; dy++) {
        unsigned offset = (cy + dy) * w;
        for (int dx = -r; dx <= r; dx++) {
            unsigned d2 = dx * dx + dy * dy;
            unsigned r2 = r * r;
            if (d2 <= r2 / 4 * 3) {
                pixels[offset + cx + dx] = color;
            } else if (d2 <= r2) {
                color_t real_color = color;
                real_color.a *= smoothstep(sqrtf(d2), r * SQRT3_4, r);
                pixels[offset + cx + dx] = real_color;
            }
        }
    }
}

static float line_distance (float x, float y, float x1, float y1,
    float x2, float y2)
{
    if (x1 == x2) return x - x1;
    else if (y1 == y2) return y - y1;
    else {
        float d = ((x2 - x1) * (y1 - y) - (x1 - x) * (y2 - y1))
           / sqrtf((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    }
}

void draw_line (color_t *pixels, unsigned w, unsigned h, unsigned x1,
    unsigned y1, unsigned x2, unsigned y2, unsigned width, color_t color)
{

}

void draw_graph (color_t *pixels, unsigned w, unsigned h, graph_t graph) {
    const unsigned cx = w / 2;
    const unsigned cy = h / 2;
    const unsigned big_r = (w < h ? w : h) / 5 * 2;
    const unsigned small_r = big_r * 7 / 100;
    unsigned line_width = big_r / 200;
    if (!line_width) line_width = 1;
    const color_t fill_color = (color_t){255, 0, 0, 255};
    const color_t stroke_color = (color_t){136, 136, 136, 255};

    memset(pixels, w * h * sizeof(*pixels), 0);

    for (unsigned i = 0; i < graph->m; i++) {
        draw_line(pixels, w, h,
            cx + big_r * cosf(2 * M_PI * graph->edges[i].v1 / graph->n),
            cy + big_r * sinf(2 * M_PI * graph->edges[i].v1 / graph->n),
            cx + big_r * cosf(2 * M_PI * graph->edges[i].v2 / graph->n),
            cy + big_r * sinf(2 * M_PI * graph->edges[i].v2 / graph->n),
            line_width, stroke_color);
    }

    for (unsigned i = 0; i < graph->n; i++) {
        draw_circle(pixels, w, h,
            cx + big_r * cosf(2 * M_PI * i / graph->n),
            cy + big_r * sinf(2 * M_PI * i / graph->n),
            small_r, fill_color);
    }
}
