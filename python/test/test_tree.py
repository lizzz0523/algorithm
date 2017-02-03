#!/usr/bin/env python
# coding: utf-8

from unittest import TestCase
from binary_tree import BiTree
from tree.maximum_distance import maximum_distance

class TreeTest(TestCase):
    def test_maximum_distance(self):
        bitree = BiTree()

        bitree.insert_left(None, 4)
        bitree.insert_left(bitree.root(), 3)
        bitree.insert_right(bitree.root(), 2)

        self.assertEquals(maximum_distance(bitree), 2)
