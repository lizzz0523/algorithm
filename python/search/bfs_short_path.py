next = [
    {'x':  0, 'y':  1},
    {'x':  1, 'y':  0},
    {'x':  0, 'y': -1},
    {'x': -1, 'y':  0}
]

def bfs_short_path(a, lx, ly, sx, sy, tx, ty):
    b = [[0] * ly for i in range(lx)]
    
    queue = []
    head = 0
    tail = 0

    queue.append({'x': sx, 'y': sy, 'step': 0})
    tail += 1

    b[sx][sy] = 1

    flag = False;

    while (tail > head):
        x = queue[head]['x']
        y = queue[head]['y']
        step = queue[head]['step']

        for i in range(4):
            cx = x + next[i]['x']
            cy = y + next[i]['y']

            if cx >= lx or cy >= ly or cx < 0 or cy < 0:
                continue

            if a[cx][cy] == 0 or b[cx][cy] == 1:
                continue

            queue.append({'x': cx, 'y': cy, 'step': step + 1})
            tail += 1

            b[cx][cy] = 1

            if cx == tx and cy == ty:
                flag = True
                break

        if flag:
            break

        head += 1

    return queue[tail - 1]['step']