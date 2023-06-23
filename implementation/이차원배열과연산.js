// https://www.acmicpc.net/problem/17140

const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

const [r, c, k] = inputs.shift().split(" ").map(Number);
let g = [];
for (let i = 0; i < 3; i++) {
  g[i] = inputs.shift().split(" ").map(Number);
}

function change(size) {
  let temp = [];
  let max_len = -Infinity;

  for (let i = 0; i < size; i++) {
    let count = new Map();
    g[i].forEach((item) => {
      count.set(item, count.get(item) + 1 || 1);
    });
    count.delete(0);

    let sorted = [];
    for (const [key, value] of count.entries()) {
      sorted.push([key, value]);
    }

    sorted.sort((a, b) => {
      if (a[1] !== b[1]) return a[1] - b[1]; // 등장 횟수 오름차순
      return a[0] - b[0]; // 수 크기 오름차순
    });

    let changed = [];
    sorted.forEach((elem) => {
      changed = changed.concat(...elem);
    });

    // 100 넘으면 자르기
    if (changed.length > 100) changed.splice(0, 100);

    temp[i] = changed;
    max_len = Math.max(max_len, changed.length);
  }

  temp = temp.map((row) => {
    const pad_size = max_len - row.length;
    const pad = new Array(pad_size).fill(0);
    return row.concat(pad);
  });

  return temp;
}

function transpose(graph) {
  const r_size = graph.length;
  const c_size = graph[0].length;

  let temp = Array.from({ length: c_size }, () => new Array(r_size));

  for (let i = 0; i < r_size; i++) {
    for (let j = 0; j < c_size; j++) {
      temp[j][i] = graph[i][j];
    }
  }

  return temp;
}

function cut(graph) {
  return graph.slice(0, 100).map((elem) => elem.slice(0, 100));
}

let time = 0;

while (true) {
  g = cut(g);
  let r_size = g.length;
  let c_size = g[0].length;

  if (time > 100) {
    console.log(-1);
    break;
  }

  // 런타임 에러 방지 필요
  if (r - 1 < r_size && c - 1 < c_size && g[r - 1][c - 1] === k) {
    console.log(time);
    break;
  }

  if (r_size >= c_size) {
    g = change(r_size);
  } else {
    g = transpose(g);
    g = change(c_size);
    g = transpose(g);
  }

  time += 1;
}
