// https://school.programmers.co.kr/learn/courses/30/lessons/81301

function solution1(s) {
  const nums = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ];
  nums.forEach((num, idx) => {
    s = s.replaceAll(num, idx);
  });

  return Number(s);
}

function solution2(s) {
  let str = s
    .replaceAll('zero', 0)
    .replaceAll('one', 1)
    .replaceAll('two', 2)
    .replaceAll('three', 3)
    .replaceAll('four', 4)
    .replaceAll('five', 5)
    .replaceAll('six', 6)
    .replaceAll('seven', 7)
    .replaceAll('eight', 8)
    .replaceAll('nine', 9);

  return Number(str);
}

function solution3(s) {
  let words = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ];
  let answer = s;

  for (let i = 0; i < words.length; i++) {
    let arr = answer.split(words[i]);
    answer = arr.join(i);
  }

  return Number(answer);
}
