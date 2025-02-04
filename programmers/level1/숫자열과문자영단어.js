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
