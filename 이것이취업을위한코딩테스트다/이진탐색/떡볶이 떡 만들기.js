const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = inputs[0].split(' ').map(Number);
const cakes = inputs[1].split(' ').map(Number);
// console.log(N, M, cakes)

let s = 0;
let e = Math.pow(10, 9);
let max = -Infinity;
while (s <= e) {
  const h = Math.floor((s + e) / 2);
  const cutSum = cakes.reduce((acc, curr) => {
    if (curr > h) acc += curr - h;
    return acc;
  }, 0);
  if (cutSum < M) e = h - 1;
  else {
    max = Math.max(h, max);
    s = h + 1;
  }
}
console.log(max);
