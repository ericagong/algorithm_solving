// 7:11 - 17(로직) - 53(풀이)

// 유일성 확인: set 처리했을 때, 주어진 길이와 동일한지 파악
function is_unique(str, len, rel) {
  const keys = str.split(",").map(Number);

  const check = new Set();
  for (let i = 0; i < len; i++) {
    const vals = [];
    keys.forEach((key) => {
      vals.push(rel[i][key]);
    });
    check.add(vals.join(","));
  }

  if (check.size === len) {
    combs = combs.filter((comb) => {
      const setA = new Set(comb.split(","));
      const keyArr = str.split(",");
      let cnt = keyArr.length;
      for (let key of keyArr) {
        if (setA.has(key)) cnt -= 1;
      }
      return cnt !== 0;
    });

    return true;
  }
  return false;
}

// 최소성 확인: dfs로 모든 조합 구한 뒤, 후보키 발생하면 해당 키를 포함하는 조합 제외
let combs = [];
const comb = [];
function get_combs(cnt, startIdx, r, keys) {
  if (cnt === r) {
    combs.push(comb.join(","));
    return;
  }

  for (let i = startIdx; i < keys.length; i++) {
    comb.push(keys[i]);
    get_combs(cnt + 1, i + 1, r, keys);
    comb.pop();
  }
}

// 전체 조합에 대해 진행해 후보키 개수 확인
function solution(relation) {
  const keys = Array.from({ length: relation[0].length }, (_, i) => i);

  for (let r = 1; r <= keys.length; r++) {
    get_combs(0, 0, r, keys);
  }

  const len = relation.length;
  let num = 0;
  while (combs.length > 0) {
    const str = combs.shift();
    if (is_unique(str, len, relation)) num += 1;
  }

  console.log(num);
  return num;
}
