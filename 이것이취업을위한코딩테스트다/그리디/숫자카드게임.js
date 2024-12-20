const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = inputs[0].split(' ').map(Number);
const g = Array.from({ length: N }, (_, i) =>
  inputs[i + 1].split(' ').map(Number),
);
// console.log(g)

let max = -Infinity;
for (let i = 0; i < N; i++) {
  const rowMin = Math.min(...g[i]);
  max = Math.max(max, rowMin);
}
console.log(max);
