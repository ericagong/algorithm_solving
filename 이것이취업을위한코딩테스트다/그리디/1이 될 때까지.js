const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let [N, K] = inputs[0].split(' ').map(Number);

let cnt = 0;
while (N !== 1) {
  if (N % K === 0) {
    N /= K;
    cnt += 1;
  } else {
    const r = N % K;
    N -= r;
    cnt += r;
  }
}
console.log(cnt);
