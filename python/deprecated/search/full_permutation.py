def full_permutation(n):
    a = [0] * n
    b = [0] * n
    c = []

    def dfs(step):
        if step == n:
            c.append(a[:])
            return

        for i in range(n):
            # if i not use
            if b[i] == 0:
                b[i] = 1
                a[step] = i + 1
                dfs(step + 1)
                b[i] = 0

    dfs(0)

    return c