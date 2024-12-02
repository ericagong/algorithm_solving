const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M, K] = inputs[0].split(' ').map(Number);
const [max1, max2] = inputs[1]
  .split(' ')
  .map(Number)
  .sort((a, b) => b - a);

const q = Math.floor(M / (K + 1));
const r = M % (K + 1);
const result = (max1 * K + max2) * q + max1 * r;

console.log(result);
