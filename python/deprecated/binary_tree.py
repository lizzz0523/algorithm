class BiTree(object):
    def __init__(self):
        self._size = 0
        self._root = None

    def __del__(self):
        self.destroy()
        self._size = 0
        self._root = None

    def destroy(self):
        self.remove_left(None)

    def insert_left(self, node, data):
        if node == None:
            if self.root() == None:
                self._root = BiTreeNode(data)
            else:
                return -1
        else:
            if self.left(node) == None:
                node._left = BiTreeNode(data)
            else:
                return -1

        self._size += 1

    def insert_right(self, node, data):
        if node == None:
            if self.root() == None:
                self._root = BiTreeNode(data)
            else:
                return -1
        else:
            if self.right(node) == None:
                node._right = BiTreeNode(data)
            else:
                return -1

        self._size += 1

    def remove_left(self, node):
        if self.size() == 0:
            return

        if node == None:
            root = self.root()
        else:
            root = self.left(node)

        if root != None:
            self.remove_left(root)
            self.remove_right(root)
            
            del root

            self._size -= 1

    def remove_right(self, node):
        if self.size() == 0:
            return

        if node == None:
            root = self.root()
        else:
            root = self.right(node)

        if root != None:
            self.remove_left(root)
            self.remove_right(root)
            
            del root

            self._size -= 1

    def merge(self, left, right, data):
        merge = BiTree()

        merge.insert_left(None, data)
        merge.root()._left = left.root()
        merge.root()._right = right.root()
        merge._size = merge.size() + left.size() + right.size()

        left._root = None
        left._size = 0

        right._root = None
        right._size = 0

    def size(self):
        return self._size

    def root(self):
        return self._root

    def is_eob(self, node):
        return node == None

    def is_left(self, node):
        return node._left == None and node._right == None

    def data(self, node):
        return node._data

    def left(self, node):
        return node._left

    def right(self, node):
        return node._right


class BiTreeNode(object):
    def __init__(self, data):
        self._data = data
        self._left = None
        self._right = None

    def __del__(self):
        self._data = None
        self._left = None
        self._right = None