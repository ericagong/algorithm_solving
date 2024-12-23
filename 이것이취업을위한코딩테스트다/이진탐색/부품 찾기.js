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
