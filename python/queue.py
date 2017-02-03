class Queue(object):
    def __init__(self):
        self.list = []
        self.tail = 0
        self.head = 0

    def put(self, item):
        self.list.append(item)
        self.tail += 1

    def get(self):
        if self.head < self.tail:
            item = self.list[self.head]
            self.head += 1
        else:
            item = None

        return item

    def peek(self):
        if self.head < self.tail:
            return self.list[self.head]
        else:
            return None