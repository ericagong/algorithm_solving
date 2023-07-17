// https://school.programmers.co.kr/learn/courses/30/lessons/92342

function get_11_arr(info, shoots, n) {
  const padding = new Array(10 - info.length).fill(0);
  const zero_shoot = n - shoots;

  let result = info.concat(padding);
  result.push(zero_shoot);

  return result;
}

const scores = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
let max_diff = -Infinity;
let can_win = false;
let max_strategy = [];
let total_shoot = 0;

function update_strategy(a_info, r_info, shoots, n) {
  let a_score = 0;
  let r_score = 0;

  scores.forEach((score, idx) => {
    if (r_info[idx]) r_score += score;
    else if (a_info[idx] !== 0) a_score += score;
  });

  const diff = r_score - a_score;

  // 어피치 점수가 더 높은 경우
  if (diff <= 0) return;

  // 라이언이 이길 수 있는 경우, 전략 업데이트
  if (!can_win) can_win = true;

  if (max_diff < diff) {
    max_diff = diff;
    max_strategy = [...r_info]; // 얕은 복사
    total_shoot = shoots;
  } else if (max_diff === diff) {
    const temp1 = get_11_arr(max_strategy, total_shoot, n);
    const temp2 = get_11_arr(r_info, shoots, n);

    for (let i = temp1.length - 1; i >= 0; i--) {
      if (temp1[i] === temp2[i]) continue;
      else if (temp1[i] > temp2[i]) break;
      // 더 낮은 점수를 많이 맞힌 전략으로 교체
      else {
        max_strategy = [...r_info];
        total_shoot = shoots;
      }
    }
  }
}

let perm = [];
let checks = 0;
function dfs(cnt, total, n, options, a_info) {
  if (n === total || cnt >= 10) {
    update_strategy(a_info, perm, total, n);
    checks += 1;
    return;
  }

  for (let i = 0; i < options[cnt].length; i++) {
    const need = options[cnt][i];
    if (need + total > n) continue;
    perm.push(need);
    total += need;
    dfs(cnt + 1, total, n, options, a_info);
    total -= need;
    perm.pop();
  }
}

function solution(n, info) {
  const options = info.map((num) => [num + 1, 0]);

  dfs(0, 0, n, options, info);

  if (!can_win) return [-1];

  max_strategy = get_11_arr(max_strategy, total_shoot, n);
  console.log(checks);
  return max_strategy;
}
