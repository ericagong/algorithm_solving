//https: school.programmers.co.kr/learn/courses/30/lessons/92334

function solution(id_list, report, k) {
  const reported = new Map([]);
  const mailed = new Map([]);

  id_list.forEach((id) => {
    reported.set(id, new Set());
    mailed.set(id, 0);
  });

  report.forEach((r) => {
    const [from, to] = r.split(" ");
    reported.set(to, reported.get(to).add(from));
  });

  for (const [to, froms] of reported.entries()) {
    if (froms.size >= k) {
      froms.forEach((user) => mailed.set(user, mailed.get(user) + 1));
    }
  }

  let result = [];
  for (const num of mailed.values()) {
    result.push(num);
  }

  return result;
}
