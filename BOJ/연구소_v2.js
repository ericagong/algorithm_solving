const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

const [N, M] = inputs.shift().split(" ").map(Number);
const og = [];
for (let i = 0; i < N; i++) {
  og[i] = inputs.shift().split(" ").map(Number);
}

let maxSafe = -Infinity;
function evaluateCombs(lastIdx, empties, walls) {
  if (walls.length === 3) {
    let tg = JSON.parse(JSON.stringify(og));

    walls.forEach(([x, y]) => {
      tg[x][y] = 1;
    });

    vs.forEach(([vx, vy]) => {
      v = Array.from(Array(N), () => Array(M).fill(false));
      spreadVirus(vx, vy, tg, v);
    });

    maxSafe = Math.max(calculate(tg), maxSafe);
    return;
  }

  for (let i = lastIdx; i < empties.length; i++) {
    walls.push(empties[i]);
    evaluateCombs(i + 1, empties, walls);
    walls.pop();
  }
}

const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];
function spreadVirus(x, y, tg, v) {
  if (x < 0 || x >= N || y < 0 || y >= M) return;
  if (tg[x][y] === 1) return;
  if (v[x][y]) return;

  tg[x][y] = 2;
  v[x][y] = true;

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];
    spreadVirus(nx, ny, tg, v);
  }
}

function calculate(g) {
  let safeArea = 0;
  for (let row of g) {
    row.forEach((item) => {
      if (item === 0) safeArea += 1;
    });
  }
  return safeArea;
}

const es = [];
const vs = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (og[i][j] === 0) es.push([i, j]);
    if (og[i][j] === 2) vs.push([i, j]);
  }
}

evaluateCombs(0, es, []);
console.log(maxSafe);
