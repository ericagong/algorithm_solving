// replit: 입출력 방법
// 입력값: console에 입력값 입력하고 ctrl + D
// 출력값: console.log로 출력
const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().split('\n');

let [x, y] = inputs[0].split('');
x = x.charCodeAt(0) - 97;
y = Number(y) - 1;

const dx = [-2, -2, 2, 2, -1, 1, -1, 1];
const dy = [-1, 1, -1, 1, -2, -2, 2, 2];

let cnt = 0;
for (let i = 0; i < dx.length; i++) {
  const cx = x + dx[i];
  const cy = y + dy[i];
  if (cx >= 0 && cx < 8 && cy >= 0 && cy < 8) cnt += 1;
  else continue;
}

console.log(cnt);
