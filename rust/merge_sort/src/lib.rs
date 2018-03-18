fn merge(arr: &mut [i32], l: usize, m: usize, r: usize, tmp: &mut [i32]) {
    let mut cp = 0; 
    let mut lp = l; // 指向待归并数组左边部分的第一个数据
    let mut rp = m; // 纸箱待归并数组右边部分的第一个数组

    // 如果数组的两个待归并部分仍有未归并元素
    // 则该循环一直继续，一旦某个部分已经完成归并
    // 则退出，这时仍有另一个部分的数组存在没有归并的元素
    while lp < m && rp < r {
        // 从两个部分中选取出大小的元素
        // 并放入到辅助数组中
        if arr[lp] <= arr[rp] {
            tmp[cp] = arr[lp];
            lp += 1;
        } else {
            tmp[cp] = arr[rp];
            rp += 1;
        }

        cp += 1;
    }

    // 如果左边部分未完成归并，则把剩下元素加入到辅助数组
    while lp < m {
        tmp[cp] = arr[lp];
        cp += 1;
        lp += 1;
    }

    // 如果右边部分未完成归并，则把剩下元素加入到辅助数组
    while rp < r {
        tmp[cp] = arr[rp];
        cp += 1;
        rp += 1;
    }

    // 最后把辅助数组中所有已经归并的元素复制回原来数组
    for i in l..r {
        arr[i] = tmp[i - l];
    }
}

fn inner_sort(arr: &mut [i32], l: usize, r: usize, tmp: &mut [i32]) {
    // l为数组待排序部分的左边界（闭边界）
    // r为数组待排序部分的右边界（开边界）

    // 当待排序的部分只有一个元素，则位基础情形，可以直接返回
    if r - l <= 1 {
        return;
    }

    // 否则把待排序的部分平均分成两个部分
    // 这里采用l + (r - l) / 2，而不是
    // (l + r) / 2是由于l和r均有可能为
    // 一个很多的整数，这样l + r的结果，就会溢出
    let m = l + (r - l) / 2;

    // 然后对左边部分排序
    inner_sort(arr, l, m, tmp);
    // 再对右边部分排序
    inner_sort(arr, m, r, tmp);
    // 最后把已经排序的两个部分进行归并
    merge(arr, l, m, r, tmp);
}

fn merge_sort(arr: &mut [i32]) {
    let l = 0;
    let r = arr.len();
    // 临时申请一片内存，用于存放中间结果
    let mut tmp = arr.to_vec();

    sort(arr, l, r, &mut tmp);
}

#[cfg(test)]
mod tests {
    use *;

    #[test]
    fn test_1() {
        let mut arr = vec![1, 5, 2, 9, 4];

        merge_sort(&mut arr);

        assert_eq!(arr, vec![1, 2, 4, 5, 9]);
    }
}
