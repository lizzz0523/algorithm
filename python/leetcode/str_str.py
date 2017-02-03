#!/usr/bin/env python
# coding: utf-8

def gen_next(str):
    next = [-1] * len(str)

    for j in xrange(1, len(str)):
        i = next[j - 1]

        while str[i + 1] != str[j] and i >= 0:
            i = next[i]

        if str[i + 1] == str[j]:
            next[j] = i + 1
        else:
            next[j] = -1

    return next

def str_str(haystack, needle):
    """
    :type haystack: str
    :type needle: str
    :rtype: int
    """
    m = len(haystack)
    n = len(needle)
    i = -1

    if n == 0:
        return 0

    if m < n:
        return -1

    next = gen_next(needle)

    for j in xrange(m):
        while needle[i + 1] != haystack[j] and i >= 0:
            i = next[i]

        if needle[i + 1] == haystack[j]:
            i += 1

        if i == n - 1:
            return j - i

    return -1