def maximum_distance(bitree):
    root = bitree.root()
    cache = { 'max': 0 }


    def tree_dept(node):
        if node == None:
            return 0

        left_dept = tree_dept(bitree.left(node))
        right_dept = tree_dept(bitree.right(node))

        if left_dept + right_dept > cache['max']:
            cache['max'] = left_dept + right_dept

        return (left_dept if left_dept > right_dept else right_dept) + 1



    if root == None:
        # empty tree
        return 0
    else:
        tree_dept(root)
        return cache['max']