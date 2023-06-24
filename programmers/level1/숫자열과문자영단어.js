// https://school.programmers.co.kr/learn/courses/30/lessons/81301

function solution(s) {
  const words = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  for (let i = 0; i < words.length; i++) {
    s = s.replaceAll(words[i], numbers[i]);
  }

  return Number(s);
}
