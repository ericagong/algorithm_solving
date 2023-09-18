function calculate(users, discounts, emoticons) {
  let plusCnt = 0;
  let totalRev = 0;
  users.forEach((user) => {
    const [ud, up] = user;
    let tp = 0;
    discounts.forEach((ed, i) => {
      if (ud <= ed) tp += (emoticons[i] * (100 - ed)) / 100;
    });
    if (up <= tp) plusCnt += 1;
    else totalRev += tp;
  });
  return [plusCnt, totalRev];
}

const rates = [10, 20, 30, 40];
const cases = [];
function dfs(comb, users, emoticons) {
  if (comb.length === emoticons.length) {
    const [plusCnt, totalRev] = calculate(users, comb, emoticons);
    cases.push([plusCnt, totalRev]);
    return;
  }

  for (let i = 0; i < 4; i++) {
    comb.push(rates[i]);
    dfs(comb, users, emoticons);
    comb.pop();
  }
}

function solution(users, emoticons) {
  dfs([], users, emoticons);
  cases.sort((a, b) => {
    if (a[0] !== b[0]) return b[0] - a[0];
    else return b[1] - a[1];
  });

  return cases[0];
}
