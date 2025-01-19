const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(inputs[0]);
const tools = inputs[1].split(' ').map(Number);
const M = Number(inputs[2]);
const orders = inputs[3].split(' ').map(Number);
// console.log(N, tools, M, orders)

tools.sort((a, b) => a - b);
// console.log(tools)

function binarySearch(arr, t, s, e) {
  while (s <= e) {
    const m = Math.floor((s + e) / 2);
    if (arr[m] === t) return 'yes';
    else if (arr[m] > t) e = m - 1;
    else s = m + 1;
  }
  return 'no';
}

const result = orders.map((item) => binarySearch(tools, item, 0, N - 1));
// console.log(result)

console.log(result.join(' '));

// 집합 자료형 기반 풀이

const fs2 = require('fs');
const inputs2 = fs2.readFileSync('/dev/stdin').toString().trim().split('\n');

const N2 = Number(inputs2[0]);
const items = new Set(inputs2[1].split(' ').map(Number));
const M2 = Number(inputs2[2]);
const orders2 = inputs2[3].split(' ').map(Number);
// console.log(N2, items, M2, orders2)

const result2 = orders2.map((item) => {
  if (items.has(item)) return 'yes';
  else return 'no';
});

console.log(result2.join(' '));
