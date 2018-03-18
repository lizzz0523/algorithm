fn binary_search(arr: &[i32], v: i32) -> isize {
    let ll = 0;
    let rr = arr.len() - 1;
    let mut l = ll;
    let mut r = rr;

    while r >= l {
        // 这里使用l + (r - l) / 2代替(r + l) / 2
        // 这是由于防止r和l均为很大的数时，r + l会越界
        let m = l + (r - l) / 2;

        if arr[m] == v {
            return m as isize;
        } else if arr[m] > v {
            // 这里要检测m是否处于边界上
            // 如果m已经为0，则马上返回-1
            // 否则，由于m为usize，m - 1会越界
            if m == ll {
                return -1;
            }

            r = m - 1;
        } else if arr[m] < v {
            // 这里也要检测m是否处于边界上
            // 如果m已经为数组的尽头，则马上返回-1
            // 否则，我们假设这个数组很大，m + 1会越界
            if m == rr {
                return -1;
            }

            l = m + 1;
        }
    }

    return -1;
}

#[cfg(test)]
mod tests {
    use *;

    #[test]
    fn test_1() {
        let arr = [1, 2, 3, 5, 6];
        let i = binary_search(&arr, 2);

        assert_eq!(i, 1);
    }

    #[test]
    fn test_2() {
        let arr = [1, 2, 3, 5, 6];
        let i = binary_search(&arr, 6);

        assert_eq!(i, 4);
    }

    #[test]
    fn test_3() {
        let arr = [1, 2, 3, 5, 6];
        let i = binary_search(&arr, 1);

        assert_eq!(i, 0);
    }

    #[test]
    fn test_4() {
        let arr = [1, 2, 3, 5, 6];
        let i = binary_search(&arr, 8);

        assert_eq!(i, -1);
    }

    #[test]
    fn test_5() {
        let arr = [1, 2, 3, 5, 6];
        let i = binary_search(&arr, -1);

        assert_eq!(i, -1);
    }
}
