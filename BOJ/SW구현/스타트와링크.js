const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

const N = Number(inputs.shift());
const g = [];
for (let i = 0; i < N; i++) {
  g[i] = inputs.shift().split(" ").map(Number);
}

function log(graph) {
  console.log();
  for (let i = 0; i < graph.length; i++) {
    console.log(graph[i].join(" "));
  }
}

let total_sum = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    total_sum += g[i][j];
  }
}

const teamA = [];
const r = parseInt(N / 2);
let min_diff = Infinity;
let perms = [];
const p = [];
const visited = new Array(r).fill(false);

// teamC2 순열 추출
function get_perm(cnt, team) {
  if (cnt === 2) {
    perms.push([...p]); // perms.push(p)
    return;
  }

  for (let i = 0; i < team.length; i++) {
    if (visited[i]) continue;
    p.push(team[i]);
    visited[i] = true;
    get_perm(cnt + 1, team);
    p.pop();
    visited[i] = false;
  }
}

// teamA 조합 추출
function get_comb(cnt, startIdx) {
  if (cnt === r) {
    perms = [];
    get_perm(0, teamA);
    let teamA_sum = 0;
    perms.forEach(([mem1, mem2]) => {
      teamA_sum += g[mem1][mem2];
    });
    const teamB_sum = total_sum - teamA_sum;
    console.log(teamA_sum, teamB_sum);
    const temp_diff = Math.abs(teamA_sum - teamB_sum);
    min_diff = Math.min(min_diff, temp_diff);
    return;
  }

  for (let i = startIdx; i < N; i++) {
    teamA.push(i);
    get_comb(cnt + 1, i + 1);
    teamA.pop();
  }
}

get_comb(0, 0);
console.log(min_diff);
