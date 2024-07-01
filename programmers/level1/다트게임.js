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

// solution2
function solution2(dartResult) {
  const rule = /(\d){1,2}(S|D|T)(#|\*)?/g;
  const rounds = dartResult.match(rule);
  const scores = new Array(3).fill(0);

  for (let i = 0; i < scores.length; i++) {
    let s = parseInt(rounds[i]);
    const [b, o] = rounds[i].split(/\d/).join("");

    if (b === "S") s = Math.pow(s, 1);
    else if (b === "D") s = Math.pow(s, 2);
    else if (b === "T") s = Math.pow(s, 3);

    if (o === "*") {
      s = s * 2;
      if (i !== 0) scores[i - 1] = scores[i - 1] * 2;
    } else if (o === "#") s = s * -1;

    scores[i] = s;
  }

  return scores.reduce((acc, cur) => acc + cur, 0);
}
