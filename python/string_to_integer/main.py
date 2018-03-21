#!/usr/bin/env python
# coding: utf-8

"""
https://leetcode.com/submissions/detail/86106929/
"""

def string_to_integer(str):
    """
    :type str: str
    :rtype: int
    """
    str = str.strip()
    
    if str == '':
        return 0
        
    sign = -1 if str[0] == '-' else 1

    if str[0] == '-' or str[0] == '+':
        str = str[1:]

    y = 0

    for i in xrange(len(str)):
        c = ord(str[i])

        if c < 48 or c > 57:
            return sign * y
        else:
            y = y * 10 + (c - 48)

        # 这里只是为了满足leetcode对整型的限制，python本身没有这个限制
        # python对int的限制在sys.maxint，对于64位系统则是2^64
        if y > 0x7FFFFFFF:
            return sign * (0x7FFFFFFF if sign > 0 else 0x80000000)

    return sign * y