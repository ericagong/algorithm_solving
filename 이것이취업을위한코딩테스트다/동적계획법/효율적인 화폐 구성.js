const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = inputs[0].split(' ').map(Number);
const coins = Array.from({ length: N }, (_, i) => Number(inputs[i + 1]));
// console.log(N, M, coins)

const dp = Array(M + 1).fill(0);
coins.forEach((c) => (dp[c] = 1));
// console.log(dp)

for (let i = 1; i <= M; i++) {
  if (dp[i] !== 0) continue;
  let min = Infinity;
  coins.forEach((c) => {
    if (i - c > 0 && dp[i - c] !== -1) min = Math.min(min, dp[i - c] + 1);
  });

  dp[i] = min === Infinity ? -1 : min;
}

// console.log(dp)
console.log(dp[M]);
