const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(inputs[0]);
const storage = inputs[1].split(' ').map(Number);
// console.log(N, storage)

const dp = Array(N + 1).fill(0);
// console.log(dp)

dp[0] = 0;
dp[1] = Math.max(dp[0], storage[0]);
for (let i = 2; i <= N; i++) {
  dp[i] = Math.max(dp[i - 1], dp[i - 2] + storage[i - 1]);
}

// console.log(dp)
console.log(dp[N]);
