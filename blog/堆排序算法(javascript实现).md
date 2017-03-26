### 堆排序

```javascript
    function heapSort(arr) {
        build(arr);

        for (var i = arr.length - 1; i >= 1; i--) {
            swap(arr, 0, i);
            shiftdown(arr, i - 1);
        }
    }

    function swap(arr, i, j) {
        var temp;

        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    function build() {
        for (var i = arr.length / 2 >> 0; i >= 0; i--) {
            shiftdown(arr, i);
        }
    }

    function shiftdown() {

    }
```