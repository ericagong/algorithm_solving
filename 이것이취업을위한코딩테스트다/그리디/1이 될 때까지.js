const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let [N, K] = inputs[0].split(' ').map(Number);

let cnt = 0;
while (N >= K) {
  let remainder = N % K;
  cnt += remainder;
  N -= remainder;

  N /= K;
  cnt += 1;
}

cnt += N - 1;

console.log(cnt);
