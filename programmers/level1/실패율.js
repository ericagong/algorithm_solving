// https://school.programmers.co.kr/learn/courses/30/lessons/42889

function solution(N, stages) {
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
