// https://www.acmicpc.net/problem/13458

const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().split('\n');

const N = Number(inputs[0]);
const As = inputs[1].split(' ').map(Number);
const [B, C] = inputs[2].split(' ').map(Number);

function getNumber(a, b, c) {
  if (a <= b) return 1;
  else return Math.ceil((a - b) / c) + 1;
}

const result = As.reduce((acc, curr) => acc + getNumber(curr, B, C), 0);

console.log(result);
