// https://school.programmers.co.kr/learn/courses/30/lessons/92334

function solution1(id_list, report, k) {
  const reported = new Map();
  const reporting = new Map();
  id_list.forEach((user) => {
    reporting.set(user, new Set());
    reported.set(user, new Set());
  });

  report.forEach((r) => {
    const [from, to] = r.split(' ');
    reporting.set(from, reporting.get(from).add(to));
    reported.set(to, reported.get(to).add(from));
  });
  // console.log(reporting)
  // console.log(reported)

  const blocked = id_list.filter((user) => reported.get(user).size >= k);
  // console.log(blocked)

  // 프로그래머스 환경에서는 아직 Set.prototype.intersection이 지원되지 않아, 아래와 같이 구현
  const result = id_list.map((user) => {
    const tos = reporting.get(user);
    return blocked.filter((to) => tos.has(to)).length;
  });
  // console.log(result)

  return result;
}

function solution2(id_list, report, k) {
  // 유저 A -> B로의 신고가 한 번만 신고 가능하므로 Set으로 중복 제거
  let reports = [...new Set(report)].map((a) => {
    return a.split(' ');
  });

  let reported = new Map(); // key = 신고 당한 유저 value = 신고당한 횟수
  for (const report of reports) {
    reported.set(report[1], reported.get(report[1]) + 1 || 1);
  }

  let reporting = new Map(); // key = 신고한 유저 value = 신고한 횟수
  for (const report of reports) {
    if (reported.get(report[1]) >= k) {
      reporting.set(report[0], reporting.get(report[0]) + 1 || 1);
    }
  }

  // 유저가 받은 메일 수 반환
  let answer = id_list.map((a) => reporting.get(a) || 0);
  return answer;
}
