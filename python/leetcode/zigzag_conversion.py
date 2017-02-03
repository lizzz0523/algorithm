#!/usr/bin/env python
# coding: utf-8

"""
https://leetcode.com/submissions/detail/86102719/
"""

def zigzag_conversion(s, numRows):
    """
    :type s: str
    :type numRows: int
    :rtype: str
    """

    # 如果numRows为1，则输入等于输出
    if numRows == 1:
        return s

    # 根据numRows，定义不同行字符串
    rows = ['' for i in range(numRows)]
    
    pos = 0 # 当前行光标
    dir = 1 # 下一行方向
    
    for i in xrange(len(s)):
        rows[pos] += s[i]
        pos += dir
        
        # 如果光标已经走到边上，则反向
        if pos == numRows - 1:
            dir = -1
        elif pos == 0:
            dir = 1
            
    return ''.join(rows)