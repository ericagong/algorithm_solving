const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, X] = inputs.shift().split(' ').map(Number);
const nums = inputs.shift().split(' ').map(Number);

function findFirstIndex(arr, target) {
  let s = 0,
    e = arr.length - 1,
    result = -1;

  while (s <= e) {
    const m = Math.floor((s + e) / 2);

    if (arr[m] < target) {
      s = m + 1;
    } else if (arr[m] > target) {
      e = m - 1;
    } else {
      result = m; // 현재 찾은 인덱스를 저장
      e = m - 1; // 더 앞쪽을 탐색
    }
  }

  return result;
}

function findLastIndex(arr, target) {
  let s = 0,
    e = arr.length - 1,
    result = -1;

  while (s <= e) {
    const m = Math.floor((s + e) / 2);

    if (arr[m] < target) {
      s = m + 1;
    } else if (arr[m] > target) {
      e = m - 1;
    } else {
      result = m; // 현재 찾은 인덱스를 저장
      s = m + 1; // 더 뒤쪽을 탐색
    }
  }

  return result;
}

// 첫 번째 등장 위치와 마지막 등장 위치 찾기
const firstIndex = findFirstIndex(nums, X);
const lastIndex = findLastIndex(nums, X);

// 개수 계산 (없으면 -1 출력)
const count = firstIndex === -1 ? -1 : lastIndex - firstIndex + 1;
console.log(count);
