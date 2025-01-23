const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().split('\n');

const N = Number(inputs[0]);
const g = Array.from({ length: N + 1 }, () => []);
const indegree = Array(N + 1).fill(0);
const time = Array(N + 1).fill(0);
const result = Array(N + 1).fill(0);

const start = [];
for (let i = 1; i <= N; i++) {
  const [t, ...lectures] = inputs[i].split(' ').map(Number);
  lectures.pop();
  time[i] = t;
  indegree[i] = lectures.length;
  for (let j = 0; j < lectures.length; j++) {
    g[lectures[j]].push(i); // lecture[j]로 진입하는 노드들을 리스트에 반영
  }
  if (indegree[i] === 0) start.push(i);
}

const q = [];
start.forEach((n) => {
  q.push(n);
  result[n] = time[n];
});

while (q.length > 0) {
  const cn = q.shift();
  for (const node of g[cn]) {
    indegree[node] -= 1;
    result[node] = Math.max(result[node], result[cn] + time[node]);
    if (indegree[node] === 0) q.push(node);
  }
}

result.slice(1).forEach((r) => console.log(r));
