const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(inputs[0]);
const stores = inputs[1].split(' ').map(Number);
// console.log(N, stores)

const dp = Array(N).fill(0);
dp[0] = stores[0];
dp[1] = Math.max(stores[0], stores[1]);

for (let i = 2; i < N; i++) {
  dp[i] = Math.max(dp[i - 1], dp[i - 2] + stores[i]);
}

console.log(dp[N - 1]);
