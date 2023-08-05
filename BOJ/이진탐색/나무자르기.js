// https://www.acmicpc.net/problem/2805

const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

const [N, M] = inputs.shift().split(" ").map(Number);
const trees = inputs.shift().split(" ").map(Number);

const maxTree = Math.max(...trees);

let h = 0;
function binarySearch(s, e) {
  while (s <= e) {
    const m = parseInt((s + e) / 2);

    let cut = 0;
    trees.forEach((tree) => {
      if (tree > m) cut += tree - m;
    });

    if (cut >= M) {
      h = m;
      s = m + 1;
    } else e = m - 1;
  }
}

binarySearch(0, maxTree);
console.log(h);
