#!/usr/bin/env python
# coding: utf-8

"""
https://leetcode.com/submissions/detail/86099998/
"""

def two_sum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """

    # 利用map来代替便利查找目标数字
    cache = dict()
    
    for (i, num) in enumerate(nums):
        cache[num] = i
        
    for (i, num) in enumerate(nums):
        # 从target中减去num得到需要查找的数字
        rem = target - num
        
        # 如果找到，并且非num本身，则返回
        if cache.has_key(rem) and cache[rem] != i:
            return [i, cache[rem]]
            
    return None