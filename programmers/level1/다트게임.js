// https://school.programmers.co.kr/learn/courses/30/lessons/17682

function solution1(dartResult) {
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

function solution2(dartResult) {
  const round = /\d+[SDT][#*]?/g;
  const rounds = dartResult.match(round);
  const scores = [0, 0, 0];

  for (let i = 0; i < 3; i++) {
    const score = Number(rounds[i].match(/\d+/));
    const bonus = rounds[i].match(/[SDT]/)[0];
    const option =
      rounds[i].replaceAll(/\d/g, '').replaceAll(/[SDT]/g, '') || ' ';
    // console.log(score, bonus, option)
    const t = bonus === 'S' ? 1 : bonus === 'D' ? 2 : 3;
    let curr = Math.pow(score, t);
    if (option === '*') {
      curr *= 2;
      if (i !== 0) scores[i - 1] *= 2;
    } else if (option === '#') curr *= -1;
    scores[i] = curr;
  }

  return scores.reduce((acc, curr) => acc + curr, 0);
}

function solution3(dartResult) {
  const bonus = { S: 1, D: 2, T: 3 },
    // undefined 값을 설정해두면 쉽게 계산 가능
    options = { '*': 2, '#': -1, undefined: 1 };

  let darts = dartResult.match(/\d.?\D/g);

  for (let i = 0; i < darts.length; i++) {
    // match 결과, group에 해당되는 요소들이 순서대로 결과 배열로 반환됨 (단, 1부터 그룹 매칭 시작)
    let split = darts[i].match(/(^\d+)(S|D|T)(\*|#)?/);
    let score = Math.pow(split[1], bonus[split[2]]) * options[split[3]];
    // console.log(split);

    if (split[3] === '*' && darts[i - 1]) darts[i - 1] *= options['*'];

    darts[i] = score;
  }

  return darts.reduce((acc, curr) => acc + curr, 0);
}
