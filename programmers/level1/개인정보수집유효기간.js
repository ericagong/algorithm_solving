// https://school.programmers.co.kr/learn/courses/30/lessons/150370

function solution(today, terms, privacies) {
  // 오늘 날짜 계산
  const [yy, mm, dd] = today.split(".");
  const CURR = Number(yy) * 12 * 28 + Number(mm) * 28 + Number(dd);

  // 개인 정보 타입별 유효기간 계산
  let dict = {};
  terms.forEach((term) => {
    const [type, period] = term.split(" ");
    dict[type] = Number(period) * 28;
  });

  // 개인 정보별 유효기간 파기 여부 계산
  let result = [];
  for (let i = 0; i < privacies.length; i++) {
    const [date, termType] = privacies[i].split(" ");
    const [year, month, day] = date.split(".");
    const START = Number(year) * 12 * 28 + Number(month) * 28 + Number(day);
    if (CURR - START >= dict[termType]) {
      result.push(i + 1);
    }
  }

  return result;
}
