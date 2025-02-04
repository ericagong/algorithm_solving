// https://school.programmers.co.kr/learn/courses/30/lessons/150370

function toDays(dateStr) {
  const [y, m, d] = dateStr.split('.').map(Number);
  return y * 12 * 28 + m * 28 + d;
}

function solution(today, terms, privacies) {
  today = toDays(today);

  /** map 선언과 초기화를 동시에 간편하게 하는 방법 */
  const termDays = terms.reduce((m, t) => {
    const [type, mm] = t.split(' ');
    m.set(type, Number(mm) * 28);
    return m;
  }, new Map([]));
  // console.log(today, m)

  return privacies
    .map((p, i) => {
      const [dateStr, type] = p.split(' ');
      const startDay = toDays(dateStr);
      return startDay + termDays.get(type) <= today ? i + 1 : null;
    })
    .filter((x) => x !== null); // 유효하지 않은 값 제거
}
