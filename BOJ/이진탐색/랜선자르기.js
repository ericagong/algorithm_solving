// https://www.acmicpc.net/problem/1654

const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

const [K, N] = inputs.shift().split(" ").map(Number);
const lines = [];
for (let i = 0; i < K; i++) {
  lines.push(Number(inputs.shift()));
}
const maxLine = Math.max(...lines);

let len = 0;
function binarySearch(s, e) {
  while (s <= e) {
    const m = parseInt((s + e) / 2);

    let cnt = 0;
    lines.forEach((line) => {
      cnt += parseInt(line / m);
    });

    if (cnt >= N) {
      len = m;
      s = m + 1;
    } else e = m - 1;
  }
}

// 0부터 시작하면 안됨
binarySearch(1, maxLine);
console.log(len);
