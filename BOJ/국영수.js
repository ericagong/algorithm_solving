// https://www.acmicpc.net/problem/10825

const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split('\n');

let N = Number(input[0]);
let students = [];

for (let i = 1; i <= N; i++) {
  const [name, korean, english, math] = input[i].split(' ');
  students.push({
    name: name,
    korean: Number(korean),
    english: Number(english),
    math: Number(math),
  });
}

let rank = [];
students = students.sort((a, b) => {
  if (a.korean !== b.korean) return b.korean - a.korean;
  else if (a.english !== b.english) return a.english - b.english;
  else if (a.math !== b.math) return b.math - a.math;
  else return a.name > b.name ? 1 : -1;
});
students.map((students) => rank.push(students.name));

console.log(rank.join('\n'));
