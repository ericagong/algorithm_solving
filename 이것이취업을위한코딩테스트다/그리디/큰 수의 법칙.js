const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M, K] = inputs[0].split(' ').map(Number);
const nums = inputs[1].split(' ').map(Number);
// console.log(N, M, K)

nums.sort((a, b) => b - a);
const [max1, max2, ...rest] = nums;
// console.log(max1, max2)

const q = parseInt(M / K);
const result = max1 * (M - q) + max2 * q;
console.log(result);
