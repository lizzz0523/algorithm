use std::collections::HashMap;

// 递归+查表 Tn -> O(n); Sn -> O(n)
fn fibonacci_1(i: usize, v: &mut HashMap<usize, f64>) -> f64 {
    if let Some(&r) = v.get(&i) {
        r
    } else {
        let r: f64;

        if i == 0 {
            r = 0.0;
        } else if i == 1 {
            r = 1.0;
        } else {
            r = fibonacci_1(i - 1, v) + fibonacci_1(i - 2, v);
        }

        v.insert(i, r);

        r
    }
}

// 直接查表 Tn -> O(n); Sn -> O(n)
fn fibonacci_2(t: usize) -> f64 {
    if t == 0 {
        0.0
    } else if t == 1 {
        1.0
    } else {
        let mut v = Vec::with_capacity(t);
        v.push(0.0);
        v.push(1.0);

        for i in 2..t + 1 {
            let r = v[i - 1] + v[i - 2];
            v.push(r);
        }

        v[t]
    }
}

// 对表中数据只保存最近两项 Tn -> O(n); Sn -> O(1)
fn fibonacci_3(t: usize) -> f64 {
    if t == 0 {
        0.0
    } else if t == 1 {
        1.0
    } else {
        let mut p = (0.0, 1.0);

        for _ in 2..t + 1 {
            p = (p.1, p.0 + p.1);
        }

        p.1
    }
}

// 通过纯计算机的方法，我们只能把算法的效率压缩到线性时间
// 如果要再进一步压缩，就需要动用数学方法
/*
    首先我们要把fibonacci递推关系转化成矩阵的形式
    |fn+1| = |1, 1||fn  | = |1, 1|^n|f1| = A^n|f1|
    |fn  |   |1, 0||fn-1|   |1, 0|  |f0|      |f0|

    这时，我们可以得到（通过归纳证明）
    |fn+1, fn  | = |1, 1|^n = A^n
    |fn  , fn-1|   |1, 0|

    因此，计算fn，就可以转化为计算一个矩阵的n次方
    这时，我们假设n = 2m，那么
    |f2m+1, f2m  | = A^2m = A^mA^m = |fm+1, fm  ||fm+1, fm  |
    |f2m,   f2m-1|                   |fm,   fm-1||fm,   fm-1|
    
    即有
    |f2m+1, f2m  | = |fm+1fm+1 + fmfm, (fm+1 + fm-1)fm|
    |f2m,   f2m-1|   |(fm+1 + fm-1)fm, fmfm + fm-1fm-1|

    得到
    f2m+1 = fm+1fm+1 + fmfm
    f2m   = (fm+1 + fm-1)fm

    所以，假设我们的fibonacci(n) -> (fn, fn+1)
    当n为奇数，n = 2m+1
    f2m+1 = fm+1fm+1 + fmfm
    f2m+2 = (fm+2 + fm)fm+1 = (fm+1 + fm + fm)fm+1
    而fm+1, fm可以通过fibonacci(m) -> (fm, fm+1)计算所得

    当n为偶数，n = 2m
    f2m   = (fm+1 + fm-1)fm = (fm+1 + fm+1 - fm)fm
    f2m+1 = fm+1fm+1 + fmfm
    而fm+1, fm同样可以通过fibonacci(m) -> (fm, fm+1)计算所得
 */
fn fibonacci_4(t: usize) -> (f64, f64) {
    if t == 0 {
        (0.0, 1.0)
    } else if t % 2 == 1 {
        let f = fibonacci_4(t / 2);
        (f.1 * f.1 + f.0 * f.0, (f.1 + f.0 + f.0) * f.1)
    } else {
        let f = fibonacci_4(t / 2);
        ((f.1 + f.1 - f.0) * f.0, f.1 * f.1 + f.0 * f.0)
    }
}

#[cfg(test)]
mod tests {
    use *;

    #[test]
    fn test_1() {
        let mut v: HashMap<usize, f64> = HashMap::new();
        assert_eq!(fibonacci_1(10, &mut v), 55.0);
    }

    #[test]
    fn test_2() {
        assert_eq!(fibonacci_2(10), 55.0);
    }

    #[test]
    fn test_3() {
        assert_eq!(fibonacci_3(10), 55.0);
    }

    #[test]
    fn test_4() {
        assert_eq!(fibonacci_4(10).0, 55.0);
    }
}
