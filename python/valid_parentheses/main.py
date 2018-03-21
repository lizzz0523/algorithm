#!/usr/bin/env python
# coding: utf-8

"""
https://leetcode.com/submissions/detail/86217195/
"""

import re

def valid_parentheses(s):
    """
    :type s: str
    :rtype: bool
    """
    stack = []

    def valid(ch):
        if len(stack) == 0:
            return False

        if stack.pop() != ch:
            return False

        return True

    for i in xrange(len(s)):
        if s[i] == '(' or s[i] == '[' or s[i] == '{':
            stack.append(s[i])
        elif s[i] == ')':
            if not valid('('):
                return False

        elif s[i] == ']':
            if not valid('['):
                return False

        elif s[i] == '}':
            if not valid('{'):
                return False

    if len(stack) > 0:
        return False

    return True
