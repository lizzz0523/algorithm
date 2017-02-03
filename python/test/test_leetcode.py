#!/usr/bin/env python
# coding: utf-8

from unittest import TestCase
from leetcode.two_sum import two_sum
from leetcode.zigzag_conversion import zigzag_conversion
from leetcode.reverse_integer import reverse_integer
from leetcode.string_to_integer import string_to_integer
from leetcode.palindrome_number import palindrome_number
from leetcode.roman_to_integer import roman_to_integer
from leetcode.longest_common_prefix import longest_common_prefix
from leetcode.remove_nth_node import remove_nth_node, print_list, ListNode
from leetcode.valid_parentheses import valid_parentheses
from leetcode.str_str import str_str

class LeetCodeTest(TestCase):
    def test_two_sum(self):
        self.assertEquals(two_sum([1, 2, 3], 5), [1, 2])
        self.assertEquals(two_sum([1, 2, 3], 6), None)
        self.assertEquals(two_sum([], 6), None)

    def test_zigzag_conversion(self):
        self.assertEquals(zigzag_conversion('PYASDLFJADS', 1), 'PYASDLFJADS')
        self.assertEquals(zigzag_conversion('PYASDLFJADS', 3), 'PDAYSLJDAFS')
        self.assertEquals(zigzag_conversion('', 3), '')

    def test_reverse_integer(self):
        self.assertEquals(reverse_integer(0), 0)
        self.assertEquals(reverse_integer(123), 321)
        self.assertEquals(reverse_integer(-123), -321)
        self.assertEquals(reverse_integer(2147483647), 0)
        self.assertEquals(reverse_integer(-2147483647), 0)

    def test_string_to_integer(self):
        self.assertEquals(string_to_integer('0'), 0)
        self.assertEquals(string_to_integer('123'), 123)
        self.assertEquals(string_to_integer('-123'), -123)
        self.assertEquals(string_to_integer('123adsw'), 123)
        self.assertEquals(string_to_integer('asdf123'), 0)
        self.assertEquals(string_to_integer('2147483648'), 2147483647)
        self.assertEquals(string_to_integer('-2147483648'), -2147483648)

    def test_palindrome_number(self):
        self.assertTrue(palindrome_number(12321))
        self.assertTrue(palindrome_number(0))
        self.assertTrue(palindrome_number(1))
        self.assertTrue(palindrome_number(9))
        self.assertFalse(palindrome_number(10))
        self.assertFalse(palindrome_number(12100))
        self.assertFalse(palindrome_number(-121))

    def test_roman_to_integer(self):
        self.assertEquals(roman_to_integer('VII'), 7)
        self.assertEquals(roman_to_integer('IV'), 4)
        self.assertEquals(roman_to_integer('MCMXCVI'), 1996)

    def test_longest_common_prefix(self):
        self.assertEquals(longest_common_prefix(['abcdd', 'abcde', 'abccc']), 'abc')
        self.assertEquals(longest_common_prefix([]), '')
        self.assertEquals(longest_common_prefix(['aa', 'a']), 'a')
        self.assertEquals(longest_common_prefix(['ca', 'a']), '')

    def test_remove_nth_node(self):
        node1 = ListNode(1)
        node2 = ListNode(2)
        node1.next = node2

        self.assertEquals(print_list(remove_nth_node(node1, 1)), '[1]')

    def test_valid_parentheses(self):
        self.assertTrue(valid_parentheses('()'))
        self.assertTrue(valid_parentheses('([])'))
        self.assertFalse(valid_parentheses('()['))

    def test_str_str(self):
        # self.assertEquals(str_str('abc', 'a'), 0)
        # self.assertEquals(str_str('abc', 'b'), 1)
        # self.assertEquals(str_str('abc', 'd'), -1)
        self.assertEquals(str_str('mississippi', 'pi'), 9)