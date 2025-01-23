const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, K] = inputs[0].split(' ').map(Number);
const arr1 = inputs[1].split(' ').map(Number);
const arr2 = inputs[2].split(' ').map(Number);
// console.log(N, K, arr1, arr2)

arr1.sort((a, b) => a - b);
arr2.sort((a, b) => b - a);
// console.log(arr1, arr2)

for (let i = 0; i < K; i++) {
  if (arr1[i] < arr2[i]) [arr1[i], arr2[i]] = [arr2[i], arr1[i]];
  else break;
}

const sum = arr1.reduce((acc, curr) => acc + curr, 0);
console.log(sum);
