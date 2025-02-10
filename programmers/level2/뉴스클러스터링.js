// https://school.programmers.co.kr/learn/courses/30/lessons/17677
function getCount(str) {
  const cnt = new Map();
  for (let i = 0; i < str.length - 1; i++) {
    const curr = str.slice(i, i + 2);
    if (/[^A-Z]/.test(curr)) continue;
    cnt.set(curr, cnt.get(curr) + 1 || 1);
  }
  return cnt;
}

function solution(str1, str2) {
  str1 = str1.toUpperCase();
  str2 = str2.toUpperCase();
  const cnt1 = getCount(str1);
  const cnt2 = getCount(str2);
  let intersection = 0;
  let union = 0;
  for (let [k, v1] of cnt1.entries()) {
    if (!cnt2.has(k)) union += v1;
    else {
      const v2 = cnt2.get(k);
      const minV = Math.min(v1, v2);
      const maxV = Math.max(v1, v2);
      intersection += minV;
      union += maxV;
    }
  }
  for (let [k, v2] of cnt2.entries()) {
    if (cnt1.has(k)) continue;
    else union += v2;
  }

  return union === 0 ? 65536 : Math.trunc((intersection / union) * 65536);
}
