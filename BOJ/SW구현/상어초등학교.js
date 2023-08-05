// https://www.acmicpc.net/problem/21608

const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

const N = Number(inputs.shift());
const g = Array.from({ length: N }, () => new Array(N).fill(0));

const favs = new Map();
const orders = [];
for (let i = 0; i < N * N; i++) {
  const [num, ...fav] = inputs.shift().split(" ").map(Number);
  orders.push(num);
  favs.set(num, new Set(fav));
}

// 디버깅용 로거
// function log() {
//   for(let i = 0; i < g.length; i++) {
//     console.log(g[i].join(' '))
//   }
//   console.log()
// }

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];
// log()

// 모든 학생에 대해 적절한 자리 찾기
orders.forEach((num) => {
  const targets = [];
  for (let x = 0; x < N; x++) {
    for (let y = 0; y < N; y++) {
      if (g[x][y] !== 0) continue;

      let num_fav = 0;
      let num_empty = 0;
      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
        if (g[nx][ny] === 0) num_empty += 1;
        else if (favs.get(num).has(g[nx][ny])) num_fav += 1;
      }

      targets.push([num_fav, num_empty, x, y]);
    }
  }

  // 최적의 자리 선택 위해 문제 조건대로 정렬
  targets.sort((a, b) => {
    if (a[0] !== b[0]) return b[0] - a[0];
    if (a[1] !== b[1]) return b[1] - a[1];
    if (a[2] !== b[2]) return a[2] - b[2];
    return a[3] - b[3];
  });

  const [_, __, tx, ty] = targets[0];
  g[tx][ty] = num;
});

// log()

// 전체 만족도 계산
let satisfaction = 0;
for (let x = 0; x < N; x++) {
  for (let y = 0; y < N; y++) {
    const num = g[x][y];
    let num_fav = 0;

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
      if (favs.get(num).has(g[nx][ny])) num_fav += 1;
    }

    if (num_fav === 0) continue;
    else satisfaction += Math.pow(10, num_fav - 1);
  }
}

console.log(satisfaction);
