#!/usr/bin/env python
# coding: utf-8

"""
https://leetcode.com/problems/remove-nth-node-from-end-of-list/
"""

class ListNode(object):
    def __init__(self, x):
        self.val = x
        self.next = None

def print_list(head):
    res = []
    node = head

    while node:
        res.append(node.val)
        node = node.next

    return str(res)

def remove_nth_node(head, n):
    """
    :type head: ListNode
    :type n: int
    :rtype: ListNode
    """
    temp = None
    node = head
    i = 0
    
    while node != None:
        if i == n:
            temp = head
        elif i > n:
            temp = temp.next
            
        node = node.next
        i += 1
        
    if temp != None:
        temp.next = temp.next.next
    elif i == n:
        head = head.next
        
    return head