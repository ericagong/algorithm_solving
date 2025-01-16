const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [M, N] = inputs[0].split(' ').map(Number);
const isPrime = Array(N + 1).fill(true);
isPrime[0] = isPrime[1] = false;
// console.log(M, N, isPrime)

for (let i = 2; i * i <= N; i++) {
  if (isPrime[i] === false) continue;
  for (let j = i * i; j <= N; j += i) {
    isPrime[j] = false;
  }
}
// console.log(isPrime)

for (let i = M; i <= N; i++) {
  if (isPrime[i] === true) console.log(i);
}
