const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = inputs[0].split(' ').map(Number);
const g = Array.from({ length: N }, (_, i) =>
  inputs[i + 1].split(' ').map(Number),
);
// console.log(N, M, g)

let max = -Infinity;
for (let i = 0; i < N; i++) {
  max = Math.max(...g[i]);
}

console.log(max);
