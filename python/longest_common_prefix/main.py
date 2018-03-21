#!/usr/bin/env python
# coding: utf-8

"""
https://leetcode.com/submissions/detail/86181181/
"""

def longest_common_prefix(strs):
    """
    :type strs: List[str]
    :rtype: str
    """
    if len(strs) == 0:
        return ''

    if len(strs) == 1:
        return strs[0]

    p = strs[0][:]

    for i in xrange(1, len(strs)):
        s = strs[i]
        t = ''

        for j in xrange(min(len(p), len(s))):
            if p[j] == s[j]:
                t += p[j]
            else:
                break

        if t == '':
            return ''
        else:
            p = t

    return p