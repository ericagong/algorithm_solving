const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(inputs[0]);
const d = 796_796;

if (N === 1) console.log(1 % d);
else {
  const dp = Array(N + 1).fill(0);
  dp[0] = 0;
  dp[1] = 1;
  dp[2] = 3;
  for (let i = 3; i <= N; i++) {
    dp[i] = 2 * dp[i - 2] + dp[i - 1];
  }
  console.log(dp[N] % d);
}
