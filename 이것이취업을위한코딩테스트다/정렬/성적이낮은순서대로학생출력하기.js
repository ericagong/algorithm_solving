// 이코테 정렬 p.180 성적이 낮은 순서로 학생 출력하기

const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(inputs[0]);
const scores = [];
for (let i = 0; i < N; i++) {
  const [name, score] = inputs[i + 1].split(' ');
  scores.push([name, Number(score)]);
}
// console.log(scores)

scores.sort((a, b) => a[1] - b[1]);
const result = scores.map((elem) => elem[0]);
console.log(result);
