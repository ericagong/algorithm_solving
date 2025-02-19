// https://school.programmers.co.kr/learn/courses/30/lessons/150368

const discounts = [10, 20, 30, 40];
const perms = [];
function getPermutations(perm, n) {
  if (perm.length === n) {
    perms.push([...perm]);
    return;
  }

  for (let i = 0; i < discounts.length; i++) {
    perm.push(discounts[i]);
    getPermutations(perm, n);
    perm.pop();
  }
}

function solution(users, emoticons) {
  getPermutations([], emoticons.length);
  let maxCount = -Infinity;
  let maxRevenue = -Infinity;
  perms.forEach((eds) => {
    let cnt = 0;
    let fp = 0;
    users.forEach((user) => {
      const [ud, up] = user;
      let tp = 0;
      emoticons.forEach((ep, i) => {
        if (ud <= eds[i]) tp += ((100 - eds[i]) * ep) / 100;
      });
      if (tp >= up) cnt += 1;
      else fp += tp;
    });
    if (maxCount < cnt) {
      maxCount = cnt;
      maxRevenue = fp;
    } else if (maxCount === cnt && maxRevenue < fp) {
      maxCount = cnt;
      maxRevenue = fp;
    }
  });

  return [maxCount, maxRevenue];
}
