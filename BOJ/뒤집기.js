// https://www.acmicpc.net/problem/1439

const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const S = inputs[0].split('').map(Number);
let cnt0 = 0;
let cnt1 = 0;

let prev = '';
S.forEach((curr) => {
  if (curr !== prev) {
    if (curr === 0) cnt0 += 1;
    else cnt1 += 1;
    prev = curr;
  }
});

console.log(Math.min(cnt0, cnt1));
