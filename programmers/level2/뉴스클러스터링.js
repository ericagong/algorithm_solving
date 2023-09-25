// https://school.programmers.co.kr/learn/courses/30/lessons/17677

function getCount(str) {
  const count = new Map();
  for (let i = 0; i < str.length - 1; i++) {
    let word = str.slice(i, i + 2);
    if (word.match(/[^a-zA-Z]/g)) continue;
    word = word.toLowerCase();
    count.set(word, count.get(word) + 1 || 1);
  }
  return count;
}

function solution(str1, str2) {
  const cnt1 = getCount(str1);
  const cnt2 = getCount(str2);

  const words = new Set();
  for (const k of cnt1.keys()) {
    words.add(k);
  }
  for (const k of cnt2.keys()) {
    words.add(k);
  }

  let aAndB = 0;
  let aOrB = 0;
  words.forEach((word) => {
    const a = cnt1.get(word) || 0;
    const b = cnt2.get(word) || 0;
    aAndB += Math.min(a, b);
    aOrB += Math.max(a, b);
  });

  const MUL = 65536;
  if (aAndB === 0 && aOrB === 0) return 1 * MUL;
  else return Math.floor((aAndB / aOrB) * MUL);
}
