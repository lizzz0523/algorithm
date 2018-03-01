use std::collections::HashSet;
use std::collections::BTreeSet;

// 通过数组的方式组织数据，如果发现数据已经在数组中存在，则忽略，否则插入到数组中
// 时间复杂度为O(n^2)
fn unique_1(arr: &[i8]) -> Vec<i8> {
    // 这里使用with_capacity方法，避免动态内存申请
    let mut vec = Vec::with_capacity(arr.len());

    for v in arr {
        let mut has = false;

        for t in &vec {
            if v == t {
                has = true;
                break;
            }
        }

        if !has {
            vec.push(*v)
        }
    }

    vec
}

// 通过集合(哈希表)的方式组织数据
// 时间复杂度为O(n)
// 但由于hash函数的优劣不同，导致哈希集合会退化为链表
// 时间复杂度下降为到O(n^2)
fn unique_2(arr: &[i8]) -> HashSet<i8> {
    // 这里使用with_capacity方法，避免动态内存申请
    let mut set = HashSet::with_capacity(arr.len());

    for v in arr {
        if !set.contains(v) {
            set.insert(*v);
        }
    }

    return set;
}

// 通过集合(B树)的方式组织数据
// 时间复杂度为O(nlogn)
fn unique_3(arr: &[i8]) -> BTreeSet<i8> {
    let mut set = BTreeSet::new();

    for v in arr {
        if !set.contains(v) {
            set.insert(*v);
        }
    }

    return set;
}

// 通过排序预处理，降低后续查找到工作的时间复杂度
// 时间复杂度为O(nlogn)
fn unique_4(arr: &mut [i8]) -> Vec<i8> {
    // 排序预处理
    arr.sort();
    
    let mut vec = Vec::with_capacity(arr.len());
    let mut r = 1;
    let mut l = 0;

    while r < arr.len() {
        if arr[r] != arr[l] {
            vec.push(arr[l]);
            l = r;
        }

        r = r + 1
    }

    if arr.len() != 0 {
        vec.push(arr[l]);
    }

    vec
}

// 基于基数排序方式，把数据作为数组下标直接操作数组记录数据出现的次数
// 类似开辟一个足够大的哈希表，然后例如hash(x) => x的进行哈希
// 时间复杂度O(n)
fn unique_5(arr: &[i8], max: usize) -> Vec<i8> {
    let mut rec = Vec::with_capacity(max);
    let mut vec = Vec::with_capacity(arr.len());
    
    for i in 0..max {
        rec.push(0);
    }

    for i in 0..arr.len() {
        rec[arr[i] as usize] = 1;
    }

    for i in 0..rec.len() {
        if rec[i] == 1 {
            vec.push(i as i8);
        }
    }

    vec
}

#[cfg(test)]
mod tests {
    use *;

    #[test]
    fn test_1() {
        let arr = vec![3, 9, 7, 9, 2, 1, 7, 2];
        let res = unique_1(&arr);

        assert_eq!(res, vec![3, 9, 7, 2, 1]);
    }

    #[test]
    fn test_2() {
        let arr = vec![3, 9, 7, 9, 2, 1, 7, 2];
        let res = unique_2(&arr);

        assert_eq!(res, [3, 9, 7, 2, 1].iter().cloned().collect());
    }

    #[test]
    fn test_3() {
        let arr = vec![3, 9, 7, 9, 2, 1, 7, 2];
        let res = unique_3(&arr);

        assert_eq!(res, [3, 9, 7, 2, 1].iter().cloned().collect());
    }

    #[test]
    fn test_4() {
        let mut arr = vec![3, 9, 7, 9, 2, 1, 7, 2];
        let res = unique_4(&mut arr);

        assert_eq!(res, vec![1, 2, 3, 7, 9]);
    }

    #[test]
    fn test_5() {
        let mut arr = vec![3, 9, 7, 9, 2, 1, 7, 2];
        let res = unique_5(&mut arr, 10);

        assert_eq!(res, vec![1, 2, 3, 7, 9]);
    }
}
