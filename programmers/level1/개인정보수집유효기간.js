//https: school.programmers.co.kr/learn/courses/30/lessons/150370

function getDays(date) {
  const [y, m, d] = date.split(".").map((item) => Number(item));
  return y * 28 * 12 + m * 28 + d;
}

function solution(today, terms, privacies) {
  const now = getDays(today);

  const policy = new Map([]);
  terms.forEach((item) => {
    let [term, due] = item.split(" ");
    policy.set(term, Number(due) * 28);
  });
  // console.log(policy)

  const result = [];
  privacies.forEach((p, i) => {
    const [date, term] = p.split(" ");
    if (getDays(date) + policy.get(term) <= now) {
      // console.log(p, i+1, getDays(date) + policy.get(term), now)
      result.push(i + 1);
    }
  });
  // console.log(result)
  return result;
}
