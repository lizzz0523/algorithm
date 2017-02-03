#!/usr/bin/env python
# coding: utf-8

"""
https://leetcode.com/submissions/detail/86105315/
"""

def reverse_integer(x):
    """
    :type x: int
    :rtype: int
    """
    sign = 1 if x >= 0 else -1
    x = abs(x)
    y = 0
    
    while x:
        temp = y * 10 + x % 10
        
        if abs(temp) > 0x7FFFFFFF:
            return 0
        
        y = temp
        x /= 10
            
    return sign * y