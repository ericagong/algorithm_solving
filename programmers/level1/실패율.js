// https://school.programmers.co.kr/learn/courses/30/lessons/42889

function solution1(N, stages) {
  const totalPlayers = stages.length;
  const players = Array.from({ length: N + 1 }).fill(0);

  stages.forEach((stg) => (players[stg - 1] += 1));

  let accum = totalPlayers;
  const rates = players.map((curr, idx) => {
    const stg = idx + 1;
    if (curr === 0) return [stg, 0];
    const rate = curr / accum;
    accum -= curr;
    return [stg, rate];
  });

  return rates
    .slice(0, N)
    .sort((a, b) => b[1] - a[1])
    .map((item) => item[0]);
}

function solution2(N, stages) {
  const result = [];
  for (let i = 1; i <= N; i++) {
    const reach = stages.filter((stage) => stage >= i).length;
    const curr = stages.filter((stage) => stage === i).length;
    const calc = reach === 0 ? 0 : curr / reach;
    result.push([i, calc]); // [스테이지 번호, 실패율]
  }

  return result
    .sort((a, b) => {
      if (a[1] !== b[1]) return b[1] - a[1]; // 실패율 내림차순
      return a[0] - b[0]; // 스테이지 번호 오름차순
    })
    .map((elem) => elem[0]);
}

function solution3(N, stages) {
  let curPlayers = new Array(N).fill(0);

  for (let stage of stages) {
    if (stage > N) continue;
    else {
      curPlayers[stage - 1] += 1;
    }
  }

  let totalPlayers = stages.length;
  let arr = Array.from({ length: N }, () => [0, 0]); // [실패율, 스테이지 번호]

  for (let i = 0; i < curPlayers.length; i++) {
    arr[i][1] = i + 1;
    arr[i][0] = curPlayers[i] === 0 ? 0 : curPlayers[i] / totalPlayers;
    totalPlayers -= curPlayers[i];
  }

  return arr
    .sort((a, b) => {
      if (a[0] !== b[0]) return b[0] - a[0]; // 실패율 내림차순
      return a[1] - b[1]; // 스테이지 번호 오름차순
    })
    .map((item) => item[1]);
}
