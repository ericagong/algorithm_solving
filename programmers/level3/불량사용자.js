// https://school.programmers.co.kr/learn/courses/30/lessons/64064

function isMatch(bid, uid) {
  if (bid.length !== uid.length) return false;
  for (let i = 0; i < bid.length; i++) {
    if (bid[i] === "*") continue;
    if (bid[i] !== uid[i]) return false;
  }
  return true;
}

let answer = new Set();
function dfs(selected, banned_id, bannedMap) {
  if (selected.size === banned_id.length) {
    const comb = Array.from(selected).sort().join("-");
    answer.add(comb);
    return;
  }

  const idx = selected.size;
  const bid = banned_id[idx];
  const bannedList = bannedMap.get(bid);
  for (let i = 0; i < bannedList.length; i++) {
    const prevSize = selected.size;
    selected.add(bannedList[i]);
    const currSize = selected.size;
    if (prevSize === currSize) continue;
    dfs(selected, banned_id, bannedMap);
    selected.delete(bannedList[i]);
  }
}

function solution(user_id, banned_id) {
  const bannedMap = new Map();
  for (let i = 0; i < banned_id.length; i++) {
    const bid = banned_id[i];
    if (bannedMap.has(bid)) continue;
    const bannedList = [];
    user_id.forEach((uid) => {
      if (isMatch(bid, uid)) bannedList.push(uid);
    });
    bannedMap.set(bid, bannedList);
  }

  dfs(new Set(), banned_id, bannedMap);

  return answer.size;
}
