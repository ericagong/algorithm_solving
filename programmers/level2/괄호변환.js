// https://school.programmers.co.kr/learn/courses/30/lessons/60058?language=javascript

// 균형잡힌 괄호인지 확인
function is_balanced(s) {
  let cnt1 = 0;
  let cnt2 = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") cnt1 += 1;
    else if (s[i] === ")") cnt2 += 1;
  }
  return cnt1 === cnt2;
}

// 올바른 괄호인지 확인
function is_right(s) {
  let cnt = 0;
  for (let i = 0; i < s.length; i++) {
    if (cnt < 0) return false;
    if (s[i] === "(") cnt += 1;
    else if (s[i] === ")") cnt -= 1;
  }
  return cnt === 0;
}

function solution(p) {
  // 1
  if (p.length === 0) return p;

  // 예외처리: 올바른 괄호이면 그대로 리턴
  if (is_right(p)) return p;

  // 2
  let ei = 2;
  let u = p.slice(0, ei);
  while (ei < p.length && !is_balanced(u)) {
    ei += 2;
    u = p.slice(0, ei);
  }
  let v = p.slice(ei);

  // 3
  if (is_right(u)) return u + solution(v);
  // 4
  // 템플릿 리터럴과 map, join으로 처리
  else
    return `(${solution(v)})${[...u.slice(1, u.length - 1)]
      .map((c) => (c === "(" ? ")" : "("))
      .join("")}`;
  // replaceAll로 처리
  return (
    "(" +
    solution(v) +
    ")" +
    u
      .slice(1, u.length - 1)
      .replaceAll("(", ".")
      .replaceAll(")", "(")
      .replaceAll(".", ")")
  );
}

function isBalanced(str) {
  const cnt1 = str.replaceAll("(", "").length;
  const cnt2 = str.replaceAll(")", "").length;
  return cnt1 === cnt2;
}

function isRight(str) {
  let cnt = 0;
  for (let i = 0; i < str.length; i++) {
    const w = str[i];
    if (w === "(") cnt += 1;
    else {
      if (cnt <= 0) return false;
      else cnt -= 1;
    }
  }
  return cnt === 0;
}

function solution2(p) {
  if (isRight(p)) return p;

  if (p === "") return "";

  // while문 잘 활용
  let ei = 2;
  let u = p.slice(0, ei);
  while (ei < p.length && !isBalanced(u)) {
    ei += 2;
    u = p.slice(0, ei);
  }
  let v = p.slice(ei);

  if (isRight(u)) return u + solution(v);

  const revU = u
    .slice(1, u.length - 1)
    .replaceAll("(", "*")
    .replaceAll(")", "(")
    .replaceAll("*", ")");

  return "(" + solution(v) + ")" + revU;
}
