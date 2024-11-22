const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(inputs[0]);
const nums = inputs.slice(1).map(Number);
// console.log(N, nums)

nums.sort((a, b) => b - a);
// console.log(nums)

const result = nums.join(' ');
console.log(result);
console.log(selectSort(nums));
console.log(insertSort(nums));
console.log(quickSort(nums));

function selectSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let maxIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] < arr[j]) maxIdx = j;
    }
    let temp = arr[i];
    arr[i] = arr[maxIdx];
    arr[maxIdx] = temp;
  }
  return arr;
}

function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j >= 0; j--) {
      if (arr[j] > arr[j - 1]) {
        let temp = arr[j - 1];
        arr[j - 1] = arr[j];
        arr[j] = temp;
      } else break;
    }
  }
  return arr;
}

function quickSort(arr) {
  if (arr.length <= 1) return arr;

  const pivot = arr[0];
  const others = arr.slice(1);

  const lessOrEqual = others.filter((elem) => elem <= pivot);
  const greater = others.filter((elem) => elem > pivot);

  return quickSort(greater).concat(pivot, quickSort(lessOrEqual));
}
