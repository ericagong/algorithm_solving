// https://school.programmers.co.kr/learn/courses/30/lessons/17682

function solution(dartResult) {
  const rule = /(?<score>\d+)(?<bonus>[SDT])(?<option>[#*]?)/g;
  const matches = [...dartResult.matchAll(rule)];
  const scores = Array(3).fill(0);
  // console.log(matches)

  for (let i = 0; i < matches.length; i++) {
    const { score, bonus, option } = matches[i].groups;
    // console.log(score, bonus, option)
    const times = bonus === 'S' ? 1 : bonus === 'D' ? 2 : 3;
    let curr = Math.pow(Number(score), times);
    if (option === '*') {
      curr *= 2;
      if (i !== 0) scores[i - 1] *= 2;
    } else if (option === '#') curr *= -1;
    scores[i] = curr;
  }
  // console.log(scores)
  return scores.reduce((acc, curr) => acc + curr, 0);
}
