const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = inputs[0].split(' ').map(Number);
const cakes = inputs[1].split(' ').map(Number);
// console.log(N, M, cakes)

let maxH = -Infinity;
function binarySearch(s, e, t) {
  while (s <= e) {
    const m = Math.floor((s + e) / 2);
    const cut = cakes.reduce((acc, curr) => acc + Math.max(curr - m, 0), 0);
    if (cut >= t) {
      s = m + 1;
      maxH = Math.max(maxH, m);
    } else e = m - 1;
  }
  return -1;
}

binarySearch(0, Math.pow(10, 9), M);
console.log(maxH);
