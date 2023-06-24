// https://school.programmers.co.kr/learn/courses/30/lessons/17682

function solution(dartResult) {
  const bonus = { S: 1, D: 2, T: 3 },
    // undefined 값을 설정해두면 쉽게 계산 가능
    options = { "*": 2, "#": -1, undefined: 1 };

  let darts = dartResult.match(/\d.?\D/g);

  for (let i = 0; i < darts.length; i++) {
    // match 결과, group에 해당되는 요소들이 순서대로 결과 배열로 반환됨 (단, 1부터 그룹 매칭 시작)
    let split = darts[i].match(/(^\d{1,})(S|D|T)(\*|#)?/);
    let score = Math.pow(split[1], bonus[split[2]]) * options[split[3]];
    // console.log(split);

    if (split[3] === "*" && darts[i - 1]) darts[i - 1] *= options["*"];

    darts[i] = score;
  }

  return darts.reduce((acc, curr) => acc + curr, 0);
}
