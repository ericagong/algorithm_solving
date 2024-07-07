//https: school.programmers.co.kr/learn/courses/30/lessons/118666

function solution(survey, choices) {
  const scores = new Map([
    ["R", 0],
    ["T", 0],
    ["C", 0],
    ["F", 0],
    ["J", 0],
    ["M", 0],
    ["A", 0],
    ["N", 0],
  ]);

  choices.forEach((c, i) => {
    const [s0, s1] = survey[i];
    if (c < 4) scores.set(s0, scores.get(s0) + (4 - c));
    if (c > 4) scores.set(s1, scores.get(s1) + (c - 4));
  });

  // console.log(scores)

  let result = "";
  result += scores.get("R") >= scores.get("T") ? "R" : "T";
  result += scores.get("C") >= scores.get("F") ? "C" : "F";
  result += scores.get("J") >= scores.get("M") ? "J" : "M";
  result += scores.get("A") >= scores.get("N") ? "A" : "N";

  return result;
}
