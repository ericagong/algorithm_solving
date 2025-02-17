// https://school.programmers.co.kr/learn/courses/30/lessons/42888?language=javascript

function solution(record) {
  const uids = new Map();
  const result = [];

  record.forEach((r) => {
    const [action, uid, nickname] = r.split(' ');
    if (action === 'Enter' || action === 'Change') uids.set(uid, nickname);
    if (action === 'Enter' || action === 'Leave') result.push([action, uid]);
  });

  return result.map((r) => {
    const [action, uid] = r;
    const nickname = uids.get(uid);
    if (action === 'Enter') return `${nickname}님이 들어왔습니다.`;
    if (action === 'Leave') return `${nickname}님이 나갔습니다.`;
  });
}
