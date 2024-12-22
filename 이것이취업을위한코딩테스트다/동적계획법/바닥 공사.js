const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(inputs[0]);

const dp = Array(N + 1).fill(0);
// console.log(dp)

dp[1] = 1;
dp[2] = 3;

for (let i = 3; i <= N; i++) {
  dp[i] = dp[i - 1] + 2 * dp[i - 2];
}
// console.log(dp)

console.log(dp[N] % 796_796);
