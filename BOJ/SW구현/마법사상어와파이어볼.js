const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

const [N, M, K] = inputs.shift().split(" ").map(Number);
let balls = new Map();
for (let i = 0; i < M; i++) {
  const [r, c, m, s, d] = inputs.shift().split(" ").map(Number);
  const info = [m, s, d];
  balls.set(`${r - 1},${c - 1}`, [info]); // 문제 1 - N 범위 잘 읽기
}

// d = 0 1 2 3 4 5 6 7
const dx = [-1, -1, 0, 1, 1, 1, 0, -1];
const dy = [0, 1, 1, 1, 0, -1, -1, -1];

function move(x, y, m, s, d) {
  const nx = (x + dx[d] * s + N) % N;
  const ny = (y + dy[d] * s + N) % N;

  const key = `${nx},${ny}`;
  const info = [m, s, d];

  if (moved_balls.has(key)) {
    const arr = [...moved_balls.get(key), info];
    moved_balls.set(key, arr);
  } else {
    moved_balls.set(key, [info]);
  }
}

function combine_and_divide(key) {
  const arr = moved_balls.get(key);

  if (arr.length <= 1) {
    divided_balls.set(key, arr);
    return;
  }

  // combine
  const tn = arr.length;
  let tm = 0;
  let ts = 0;
  let all_odd = true;
  let all_even = true;

  arr.forEach(([m, s, d]) => {
    tm += m;
    ts += s;
    if (d % 2 === 0) all_odd = false;
    else all_even = false;
  });

  const temp = [Math.floor(tm / 5), Math.floor(ts / tn)];
  const ds = all_even || all_odd ? [0, 2, 4, 6] : [1, 3, 5, 7];
  const divided = Array.from({ length: 4 }).map((_, idx) => [...temp, ds[idx]]); // empty는 map 안돌아간다
  const filtered = divided.filter(([mi]) => mi !== 0);

  divided_balls.set(key, filtered);
}

let time = 0;
let moved_balls = new Map();
let divided_balls = new Map();
while (time < K) {
  time += 1;

  moved_balls = new Map();
  for (const [key, value] of balls.entries()) {
    const [x, y] = key.split(",").map(Number);
    value.forEach(([m, s, d]) => move(x, y, m, s, d));
  }

  divided_balls = new Map();
  for (const key of moved_balls.keys()) {
    combine_and_divide(key);
  }

  balls = divided_balls;
}

let total_m = 0;
for (let value of balls.values()) {
  value.forEach(([m, _, __]) => (total_m += m));
}

console.log(total_m);
