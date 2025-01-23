const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = inputs[0].split(' ').map(Number);
const coins = Array.from({ length: N }, (_, i) => Number(inputs[i + 1]));
// console.log(N, M, coins)

const dp = Array(M + 1).fill(Infinity);
coins.forEach((coin) => (dp[coin] = 1));
// console.log(dp)

for (let i = 1; i <= M; i++) {
  for (const coin of coins) {
    if (i - coin > 0) dp[i] = Math.min(dp[i], dp[i - coin] + 1);
  }
}

// console.log(dp)
console.log(dp[M] === Infinity ? -1 : dp[M]);
