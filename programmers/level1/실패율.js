// https://school.programmers.co.kr/learn/courses/30/lessons/42889

function solution(N, stages) {
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
