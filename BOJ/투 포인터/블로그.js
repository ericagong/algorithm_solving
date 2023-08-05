// https://www.acmicpc.net/problem/21921
const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

const [N, X] = inputs.shift().split(" ").map(Number);
const v = inputs.shift().split(" ").map(Number);

let acc = v.slice(0, X).reduce((acc, curr) => acc + curr, 0);
let accMax = acc;
let cnt = 1;

for (let s = 0; s < N - X; s++) {
  let e = s + X - 1;
  acc -= v[s];
  e += 1;
  acc += v[e];
  if (acc > accMax) {
    accMax = acc;
    cnt = 1;
  } else if (acc === accMax) {
    cnt += 1;
  }
}

if (accMax === 0) {
  console.log("SAD");
} else {
  console.log(accMax);
  console.log(cnt);
}
