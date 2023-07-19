// https://www.acmicpc.net/problem/14889

const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

const N = Number(inputs.shift());
const g = [];
for (let i = 0; i < N; i++) {
  g[i] = inputs.shift().split(" ").map(Number);
}

const all = Array(N)
  .fill(0)
  .map((_, idx) => idx);
const teamA = [];
let pairs = [];
let min_diff = Infinity;

function get_team(cnt, startIdx) {
  if (cnt === parseInt(N / 2)) {
    get_pair(teamA, 0, 0);
    const pairsA = [...pairs];
    pairs = [];

    const setA = new Set(teamA);
    const teamB = [];
    all.forEach((member) => {
      if (!setA.has(member)) teamB.push(member);
    });

    get_pair(teamB, 0, 0);
    const pairsB = [...pairs];
    pairs = [];

    const scoreA = get_score(pairsA);
    const scoreB = get_score(pairsB);
    const diff = Math.abs(scoreA - scoreB);

    min_diff = Math.min(min_diff, diff);

    return;
  }

  for (let i = startIdx; i < N; i++) {
    teamA.push(i);
    get_team(cnt + 1, i + 1);
    teamA.pop();
  }
}

let pair = [];
function get_pair(team, cnt, startIdx) {
  if (cnt === 2) {
    pairs.push([...pair]); // 중요
    return;
  }

  for (let i = startIdx; i < team.length; i++) {
    pair.push(team[i]);
    get_pair(team, cnt + 1, i + 1);
    pair.pop();
  }
}

function get_score(pairs) {
  let score = 0;
  pairs.forEach(([i, j]) => {
    score += g[i][j] + g[j][i];
  });
  return score;
}

get_team(0, 0);

console.log(min_diff);
