const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const X = Number(inputs[0]);

const dp = Array(X + 1).fill(0);
// console.log(dp)

dp[1] = 0;
for (let i = 2; i <= X; i++) {
  let min = Infinity;
  if (i % 5 === 0) min = Math.min(dp[i / 5] + 1, min);
  if (i % 3 === 0) min = Math.min(dp[i / 3] + 1, min);
  if (i % 2 === 0) min = Math.min(dp[i / 2] + 1, min);
  min = Math.min(dp[i - 1] + 1, min);
  dp[i] = min;
}

// console.log(dp)
console.log(dp[X]);
