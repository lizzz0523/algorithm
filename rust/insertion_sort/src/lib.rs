// 这里的插入排序，实际是一个双重循环的操作
// 即使内循环有可能提早退出，但最坏情况下
// 还是要执行N次循环，因此很容易判断出来
// 其运行时间为O(n^2)
fn insertion_sort_1(arr: &mut [i32]) {
    if arr.len() == 1 {
        return;
    }

    for i in 1..arr.len() {
        let v = arr[i];
        let mut j = i;

        // 这里要注意的是，j是usize类型的
        // 当j为0时，再进行减1操作，会panick
        // 因此一旦j为0了，就不再进行下一次迭代
        while arr[j - 1] > v {
            arr[j] = arr[j - 1];
            j -= 1;

            if j == 0 {
                break;
            }
        }

        arr[j] = v
    }
}

// 对上面算法的一个轻微的改进，是通过二分查找来寻找插入的位置
// 从运行时间上说，即使使用了二分查找，但由于还时需要循环移位
// 因此还是需要O(n^2)的时间，但由于减少了比较的次数，性能还是会有一点提升
fn insertion_sort_2(arr: &mut [i32]) {
    if arr.len() == 1 {
        return;
    }

    for i in 1..arr.len() {
        let v = arr[i];
        // rust中可以直接调用slice的binary_search实现二分查找
        // 其返回值是一个Result，如果找到则返回目标位置
        // 如果找不到，则返回最佳插入位置
        let k = match arr[0..i].binary_search(&v) {
            Ok(k) => k,
            Err(k) => k
        };

        for j in (k..i).rev() {
            arr[j + 1] = arr[j];
        }

        arr[k] = v;
    }
}

#[cfg(test)]
mod tests {
    use *;

    #[test]
    fn test_1() {
        let mut arr = [6, 7, 2, 9];
        insertion_sort_1(&mut arr);
        assert_eq!(arr, [2, 6, 7, 9]);
    }

    #[test]
    fn test_2() {
        let mut arr = [6, 7, 2, 9];
        insertion_sort_2(&mut arr);
        assert_eq!(arr, [2, 6, 7, 9]);
    }
}
