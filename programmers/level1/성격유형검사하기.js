
// https://school.programmers.co.kr/learn/courses/30/lessons/118666

function solution(survey, choices) {
  let dict = { R: 0, T: 0, C: 0, F: 0, J: 0, M: 0, A: 0, N: 0 };
  const score = [0, 3, 2, 1, 0, 1, 2, 3];

  for (let i = 0; i < survey.length; i++) {
    if (choices[i] <= 3) {
      dict[survey[i][0]] += score[choices[i]];
    } else if (choices[i] >= 5) {
      dict[survey[i][1]] += score[choices[i]];
    }
  }

  let result = "";
  if (dict["R"] >= dict["T"]) result += "R";
  else result += "T";
  if (dict["C"] >= dict["F"]) result += "C";
  else result += "F";
  if (dict["J"] >= dict["M"]) result += "J";
  else result += "M";
  if (dict["A"] >= dict["N"]) result += "A";
  else result += "N";

  return result;
}
