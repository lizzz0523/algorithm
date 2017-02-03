#!/usr/bin/env python
# coding: utf-8

"""
https://leetcode.com/submissions/detail/86176931/
"""

def roman_to_integer(s):
    """
    :type s: str
    :rtype: int
    """
    cache = dict()
    cache['I'] = 1
    cache['V'] = 5
    cache['X'] = 10
    cache['L'] = 50
    cache['C'] = 100
    cache['D'] = 500
    cache['M'] = 1000

    x = 0
    s = s[::-1]

    for i in xrange(len(s)):
        x += cache[s[i]]

        if s[i] == 'V' or s[i] == 'X':
            cache['I'] = -1
        elif s[i] == 'L' or s[i] == 'C':
            cache['X'] = -10
        elif s[i] == 'D' or s[i] == 'M':
            cache['C'] = -100

    return x