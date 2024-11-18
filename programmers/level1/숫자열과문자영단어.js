// https://school.programmers.co.kr/learn/courses/30/lessons/81301

function solution3(s) {
  let words = [
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
  let answer = s;

  for (let i = 0; i < words.length; i++) {
    let arr = answer.split(words[i]);
    answer = arr.join(i);
  }

  return Number(answer);
}

function solution2(s) {
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

// 1차 풀이
function solution1(s) {
  let str = s
    .replaceAll("zero", 0)
    .replaceAll("one", 1)
    .replaceAll("two", 2)
    .replaceAll("three", 3)
    .replaceAll("four", 4)
    .replaceAll("five", 5)
    .replaceAll("six", 6)
    .replaceAll("seven", 7)
    .replaceAll("eight", 8)
    .replaceAll("nine", 9);

  return Number(str);
}
