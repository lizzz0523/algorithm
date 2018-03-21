next = [
    {'x':  0, 'y':  1},
    {'x':  1, 'y':  0},
    {'x':  0, 'y': -1},
    {'x': -1, 'y':  0}
]

def dfs_short_path(a, lx, ly, sx, sy, tx, ty):
    b = [[0] * ly for i in range(lx)]
    r = { 'min': 99999 }

    def dfs(x, y, step):
        
        if x == tx and y == ty:
            if step < r['min']:
                r['min'] = step

            return

        for i in range(4):
            cx = x + next[i]['x']
            cy = y + next[i]['y']

            if cx >= lx or cy >= ly or cx < 0 or cy < 0:
                continue

            if a[cx][cy] == 0 or b[cx][cy] == 1:
                continue

            b[cx][cy] = 1
            dfs(cx, cy, step + 1)
            b[cx][cy] = 0

    b[sx][sy] = 1
    dfs(sx, sy, 0)
    b[sx][sy] = 0

    return r['min']


