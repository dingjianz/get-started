const testAarry = [32, 65, 3, 54, 104, 77, 19];

//《------------------------------------------基础排序算法-------------------------------------------------------------》
//插入排序和选择排序要比冒泡排序快，插入排序是这三种算法中最快的。

// 1、插入排序
// 插入算法时间复杂度是O（n^2），空间复杂度是O（1）
// 工作原理: 遍历数组，遍历到i时，a0,a1...ai-1是已经排好序的，取出ai，从ai-1开始向前和每个比较大小，如果小于，则将此位置元素向后移动，继续先前比较，如果不小于，则放到正在比较的元素之后。可见相等元素比较是，原来靠后的还是拍在后边，所以插入排序是稳定的。
// 当待排序的数据基本有序时，插入排序的效率比较高，只需要进行很少的数据移动。
function insertSort(arr) {
  let len = arr.length;
  for (let i = 1; i < len; i++) {
    let temp = arr[i];
    let j = i - 1; // 默认已排序的元素
    while (j >= 0 && arr[j] > temp) {
      //在已排序好的队列中从后向前扫描
      arr[j + 1] = arr[j]; //已排序的元素大于新元素，将该元素移到一下个位置
      j--;
    }
    arr[j + 1] = temp;
  }
  return arr;
}
// console.log(insertSort(testAarry))

//=====================================================================================================================
// 2、选择排序
// 插入算法时间复杂度是O（n^2），空间复杂度是O（1）
// 工作原理: 遍历数组，遍历到i时，a0,a1...ai-1是已经排好序的，然后从i到n选择出最小的，记录下位置，如果不是第i个，则和第i个元素交换。此时第i个元素可能会排到相等元素之后，造成排序的不稳定
function selectSort(arr) {
  let k; // 最小值的索引
  let temp;
  let length = arr.length;
  for (let i = 0; i < length - 1; i++) {
    k = i;
    for (let j = i + 1; j < length; j++) {
      if (arr[j] < arr[k]) {
        k = j;
      }
    }
    temp = arr[k];
    arr[k] = arr[i];
    arr[i] = temp;
  }
  return arr;
}
// console.log(selectSort(testAarry));

//=====================================================================================================================
// 3、冒泡排序
// 工作原理: 相邻两节点进行比较，大的向后移一个，经过第一轮两两比较和移动，最大的元素移动到了最后，第二轮次大的位于倒数第二个，依次进行。
function bubbleSort(arr) {
  for (let j = 0; j < arr.length - 1; j++) {
    // 这里 i < arr.length - 1 ，要思考思考合适吗？我们下面继续说
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
      }
    }
  }
  return arr;
}

// 优化一
// 当第一次，找到最大数，放到最后，那么下一次，遍历的时候，是不是就不能把最后一个数算上了呢？因为他就是最大的了，不会出现，前一个数比后一个数大，要交换位置的情况，所以内层 for 循环的次数，改成 i < arr.length - 1 -j ，才合适
function bubbleSort1(arr) {
  for (let j = 0; j < arr.length - 1; j++) {
    // 这里要根据外层for循环的 j，逐渐减少内层 for循环的次数
    for (let i = 0; i < arr.length - 1 - j; i++) {
      if (arr[i] > arr[i + 1]) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
      }
    }
  }
  return arr;
}

// 优化二
// 加一个标志位，如果某次循环完后，没有任何两数进行交换，就将标志位设置为 true，表示排序完成，这样我们就可以减少不必要的排序，提高性能
function bubbleSort2(arr) {
  for (let j = 0; j < arr.length - 1; j++) {
    // 声明一个变量，作为标志位
    let done = true;
    for (let i = 0; i < arr.length - 1 - j; i++) {
      if (arr[i] > arr[i + 1]) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        done = false;
      }
    }
    if (done) {
      break;
    }
  }
  return arr;
}
// console.log(bubbleSort2(testAarry));

//《------------------------------------------高级排序算法-------------------------------------------------------------》
//=====================================================================================================================
// 4、快速排序
// 快排的核心思想“参照-划分-递归”
// 工作原理: 一、选择数组中间数作为基数，并从数组中取出此基数；
// 二、准备两个数组容器，遍历数组，逐个与基数比对，较小的放左边容器，较大的放右边容器；
// 三、递归处理两个容器的元素，并将处理后的数据与基数按大小合并成一个数组，返回。
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let pivotIndex = Math.floor(arr.length / 2);
  let pivot = arr.splice(pivotIndex, 1)[0]; // 设置中间元素为参照，并在数组中去掉中间元素
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([pivot], quickSort(right));
}

// 这两种方法的区别在于取不同的基准值
function qSort(arr) {
  if (arr.length == 0) {
    return [];
  }
  let lesser = [];
  let greater = [];
  let pivot = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      lesser.push(arr[i]);
    } else {
      greater.push(arr[i]);
    }
  }
  return qSort(lesser).concat(pivot, qSort(greater));
}
// console.log(quickSort(testAarry))

//=====================================================================================================================
// 5、希尔排序
// 工作原理: 通过定义一个间隔序列来表示在排序过程中进行比较的元素之间有多远的间隔。我们可以动态定义间隔序列，不过对于大部分的实际应用场景，算法要用到的间隔序列可以提前定义好。
const gaps = [5, 3, 1];
function shellSort(arr) {
  for (let g = 0; g < gaps.length; ++g) {
    for (let i = gaps[g]; i < arr.length; ++i) {
      let temp = arr[i];
      let j = i;
      for (j; j >= gaps[g] && arr[j - gaps[g]] > temp; j -= gaps[g]) {
        arr[j] = arr[j - gaps[g]];
      }
      arr[j] = temp;
    }
  }
  return arr;
}
// console.log(shellSort(testAarry))

//=====================================================================================================================
// 6、归并排序
// 工作原理: 核心是分治算法，先进行划分，再进行排序归并，归并两个有序的数组，然后通过比较数据大小，先从最小的数据开始插入，最后合并得到第三个数组。
// 通常来讲（也不一定），归并排序会使用递归的算法来实现。然而，在JavaScript中这种方式不太可行，因为这个算法的递归深度对它来讲太深了。
function mergeSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  let middle = parseInt(arr.length / 2);
  let left = arr.slice(0, middle);
  let right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  while (left.length) {
    result.push(left.shift());
  }
  while (right.length) {
    result.push(right.shift());
  }
  return result;
}
// console.log(mergeSort(testAarry))

//=====================================================================================================================
// 7、二叉树排序
// 工作原理: 二叉树排序法借助了数据结构二叉排序树，二叉排序数满足三个条件：
//（1）若左子树不空，则左子树上所有结点的值均小于它的根结点的值；
//（2）若右子树不空，则右子树上所有结点的值均大于它的根结点的值；
//（3）左、右子树也分别为二叉排序树。
// 根据这三个特点，用中序遍历二叉树得到的结果就是排序的结果。
// 根据数据构建二叉排序树，然后中序遍历，排序时间复杂度为O(nlogn)，构建二叉树需要额外的O(n)的存储空间

//=====================================================================================================================
// 8、堆排序
// 堆是一个近似完全二叉树的结构，并同时满足堆积的性质：即子结点的键值或索引总是小于（或者大于）它的父节点。
let len;
function buildMaxHeap(arr) {
  //建堆
  len = arr.length;
  // [n/2-1]表示的是最后一个有子节点 (本来是n/2（堆从1数起），但是这里arr索引是从0开始，所以-1)
  for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
    maxHeapify(arr, i);
  }
  //对每一个节点（非叶节点），做堆调整
}
function maxHeapify(arr, i) {
  //堆调整
  let left = 2 * i + 1,
    right = 2 * i + 2,
    largest = i; //i为该子树的根节点

  if (left < len && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < len && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest != i) {
    //即上面的if中有一个生效了
    swap(arr, i, largest); //交换最大的为父节点
    maxHeapify(arr, largest); //交换后，原值arr[i]（往下降了）（索引保存为largest），
    //作为根时，子节点可能比它大，因此要继续调整
  }
}
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
function heapSort(arr) {
  buildMaxHeap(arr);
  for (let i = arr.length - 1; i > 0; i--) {
    swap(arr, 0, i);
    len--;
    maxHeapify(arr, 0);
  }
  return arr;
}
// console.log(heapSort(testAarry))

//=====================================================================================================================
// 9、基数排序
// 排序算法很特殊，它不需要直接对元素进行相互比较，也不需要将元素相互交换，你需要做的就是对元素进行“分类”。
// 先根据最后一位的大小排序，然后再比较倒数第二位，遇到空则补零，知道比较结束。

//《------------------------------------------排序的时间复杂度和空间复杂度----------------------------------------------》

//                              时间复杂度
//   类别     排序方法   平均情况    最好情况    最坏情况   空间复杂度   稳定性
// 插入排序   插入排序    O(n^2)      O(n)       O(n^2)      O(1)       稳定
// 插入排序   希尔排序    O(n^1.3)    O(n)       O(n^2)      O(1)      不稳定
// 选择排序   选择排序    O(n^2)      O(n^2)     O(n^2)      O(1)      不稳定
// 选择排序    堆排序    O(nlog2n)   O(nlog2n)  O(nlog2n)    O(1)      不稳定
// 交换排序   冒泡排序    O(n^2)      O(n)       O(n^2)      O(1)       稳定
// 交换排序   快速排序   O(nlog2n)   O(nlog2n)  O(n^2)    O(nlog2n)    不稳定
// 归并排序   归并排序   O(nlog2n)   O(nlog2n)  O(nlog2n)    O(1)       稳定
// 基数排序   基数排序   O(d(r+n))   O(d(rd+n)) O(d(r+n))  O(rd+n1)     稳定
// d: 代表长度， n：代表关键字个数， r：代表关键字基数
