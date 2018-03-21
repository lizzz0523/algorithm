#!/usr/bin/env python
# coding: utf-8

from unittest import TestCase
from search.full_permutation import full_permutation
from search.dfs_short_path import dfs_short_path
from search.bfs_short_path import bfs_short_path

class SearchTest(TestCase):
    def test_full_permutation(self):
        n = 3

        self.assertEquals(full_permutation(n), [
            [ 1, 2, 3 ],
            [ 1, 3, 2 ],
            [ 2, 1, 3 ],
            [ 2, 3, 1 ],
            [ 3, 1, 2 ],
            [ 3, 2, 1 ]
        ])

    def test_dfs_short_path(self):
        a = [
            [ 1, 1, 0, 1 ],
            [ 1, 1, 1, 1 ],
            [ 1, 1, 0, 1 ],
            [ 1, 0, 1, 1 ],
            [ 1, 1, 1, 0 ]
        ]
        lx, ly = 5, 4
        sx, sy = 0, 0
        tx, ty = 3, 2

        self.assertEquals(dfs_short_path(a, lx, ly, sx, sy, tx, ty), 7)

    def test_bfs_short_path(self):
        a = [
            [ 1, 1, 0, 1 ],
            [ 1, 1, 1, 1 ],
            [ 1, 1, 0, 1 ],
            [ 1, 0, 1, 1 ],
            [ 1, 1, 1, 0 ]
        ]
        lx, ly = 5, 4
        sx, sy = 0, 0
        tx, ty = 3, 2

        self.assertEquals(bfs_short_path(a, lx, ly, sx, sy, tx, ty), 7)