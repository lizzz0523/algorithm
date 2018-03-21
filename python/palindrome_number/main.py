#!/usr/bin/env python
# coding: utf-8

"""
https://leetcode.com/submissions/detail/86108156/
"""

def palindrome_number(x):
    """
    :type x: int
    :rtype: bool
    """

    # 对于负数，均为非回文
    if x < 0:
        return False
    
    # 对于10以下整数，都是回文
    if x < 10:
        return True
        
    y = 0
    
    while x:
        temp = y * 10 + x % 10
        
        y = temp
        x /= 10
        
        # 如果数字的个位为0，则非回文
        if y == 0:
            return False
        
        if x == y or x / 10 == y:
            return True
        
    return False