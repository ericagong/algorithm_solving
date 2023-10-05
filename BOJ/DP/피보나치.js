// https://www.acmicpc.net/problem/1003

const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

const T = Number(inputs.shift());
for (let i = 0; i < T; i++) {
  const N = Number(inputs.shift());

  dp0 = Array(N + 1).fill(0);
  dp1 = Array(N + 1).fill(0);

  dp0[0] = 1;
  dp1[0] = 0;
  dp0[1] = 0;
  dp1[1] = 1;

  for (let i = 2; i <= N; i++) {
    dp0[i] = dp0[i - 1] + dp0[i - 2];
    dp1[i] = dp1[i - 1] + dp1[i - 2];
  }

  console.log(dp0[N], dp1[N]);
}
