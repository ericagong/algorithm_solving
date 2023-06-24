// https://school.programmers.co.kr/learn/courses/30/lessons/150368

function calc(users, emoticons, discounts) {
  let plus_mem = 0;
  let acc_rev = 0;
  users.forEach(([rate, price]) => {
    let user_rev = 0;
    for (let i = 0; i < emoticons.length; i++) {
      if (discounts[i] >= rate) {
        // 할인율 식 세울 때 주의: 가격 * (100-할인율) / 100
        const emoji_price = emoticons[i] * ((100 - discounts[i]) / 100);
        user_rev += emoji_price;
      }
      if (user_rev >= price) {
        // 비교 식 사전인지 사후인지 잘 파악
        user_rev = 0;
        plus_mem += 1;
        break;
      }
    }
    acc_rev += user_rev;
  });

  return [plus_mem, acc_rev];
}

const rates = [10, 20, 30, 40];
const discounts = [];
let results = [];
function dfs(cnt, users, emoticons) {
  if (cnt === emoticons.length) {
    const [plus_mem, acc_rev] = calc(users, emoticons, discounts);
    results.push([plus_mem, acc_rev]);
    return;
  }

  for (let i = 0; i < rates.length; i++) {
    discounts.push(rates[i]);
    dfs(cnt + 1, users, emoticons);
    discounts.pop();
  }
}

function solution(users, emoticons) {
  dfs(0, users, emoticons);
  results.sort((a, b) => {
    if (a[0] !== b[0]) return b[0] - a[0]; // 이모티콘 플러스 가입자 내림차순
    return b[1] - a[1]; // 이모티콘 매출 내림차순
  });
  return results[0];
}
