// https://www.acmicpc.net/status?user_id=silver_pantheon&problem_id=21608&from_mine=1

const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(inputs[0]);
const order = [];
const favs = new Map([]);
for (let i = 0; i < N * N; i++) {
  const [num, ...fav] = inputs[i + 1].split(' ').map(Number);
  order.push(num);
  favs.set(num, new Set(fav));
}
// console.log(N, order, favs)

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];
const g = Array.from({ length: N }, () => Array(N).fill(0));

order.forEach((num) => {
  const targets = [];
  for (let cx = 0; cx < N; cx++) {
    for (let cy = 0; cy < N; cy++) {
      if (g[cx][cy] !== 0) continue;
      let empCnt = 0;
      let favCnt = 0;
      for (let i = 0; i < 4; i++) {
        const nx = cx + dx[i];
        const ny = cy + dy[i];
        if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
        if (g[nx][ny] === 0) empCnt += 1;
        else if (favs.get(num).has(g[nx][ny])) favCnt += 1;
      }
      targets.push([favCnt, empCnt, cx, cy]);
    }
  }

  const target = targets.sort((a, b) => {
    if (a[0] !== b[0]) return b[0] - a[0];
    if (a[1] !== b[1]) return b[1] - a[1];
    if (a[2] !== b[2]) return a[2] - b[2];
    return a[3] - b[3];
  })[0];

  const [_, __, tx, ty] = target;
  g[tx][ty] = num;
});
// function log(t) {
//   for(let i = 0; i < t.length; i++) {
//     console.log(t[i].join(' '))
//   }
//   console.log()
// }
// log(g)

let score = 0;
for (let cx = 0; cx < N; cx++) {
  for (let cy = 0; cy < N; cy++) {
    let favCnt = 0;
    for (let i = 0; i < 4; i++) {
      const nx = cx + dx[i];
      const ny = cy + dy[i];
      if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
      if (favs.get(g[cx][cy]).has(g[nx][ny])) favCnt += 1;
    }
    const cs = favCnt === 0 ? 0 : Math.pow(10, favCnt - 1);
    score += cs;
  }
}
console.log(score);
