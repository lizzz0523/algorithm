def number_place(m):
    n = 3 * m
    a = [0] * n
    b = [0] * n
    c = []

    def num(a, b, c):
        n = 0;
        i = b;

        while i < c:
            n += n * 10 + a[i]
            i += 1

        return n

    def dfs(step):
        if step == n:
            if num(a, 0, m) + num(a, m, 2 * m) == num(a, 2 * m, 3 * m):
                c.append(a[:])
            return

        for i in range(n):
            if b[i] == 0:
                b[i] = 1
                a[step] = i
                dfs(step + 1)
                b[i] = 0

    dfs(0)

    return c

if __name__ == '__main__':
    n = number_place(2)

    print n