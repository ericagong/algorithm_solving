const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = inputs[0].split(' ').map(Number);
const balls = inputs[1].split(' ').map(Number);
// console.log(N, M, balls)

let combs = 0;
for (let i = 0; i < balls.length - 1; i++) {
  const aw = balls[i];
  const cnt = balls.slice(i).filter((bw) => bw !== aw).length;
  combs += cnt;
}

console.log(combs);
