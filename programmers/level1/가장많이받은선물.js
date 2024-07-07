//https: school.programmers.co.kr/learn/courses/30/lessons/258712

function solution(friends, gifts) {
  const gives = new Map([]);
  const totalGives = new Map([]);
  const totalGets = new Map([]);
  friends.forEach((name) => {
    gives.set(name, new Map([]));
    totalGives.set(name, 0);
    totalGets.set(name, 0);
  });

  gifts.forEach((info) => {
    const [from, to] = info.split(" ");
    gives.get(from).set(to, gives.get(from).get(to) + 1 || 1);
    totalGives.set(from, totalGives.get(from) + 1);
    totalGets.set(to, totalGets.get(to) + 1);
  });

  // console.log(gives)
  // console.log(totalGives)
  // console.log(totalGets)

  const expect = new Map([]);

  for (let i = 0; i < friends.length; i++) {
    for (let j = 0; j < friends.length; j++) {
      const A = friends[i];
      const B = friends[j];
      if (A === B) continue;

      const giveB = gives.get(A).get(B) || 0;
      const getB = gives.get(B).get(A) || 0;
      if (giveB > getB) expect.set(A, expect.get(A) + 1 || 1);
      else if ((giveB === 0 && getB === 0) || giveB === getB) {
        const indexA = totalGives.get(A) - totalGets.get(A);
        const indexB = totalGives.get(B) - totalGets.get(B);
        if (indexA > indexB) expect.set(A, expect.get(A) + 1 || 1);
      }
    }
  }

  // console.log(expect)

  let result = 0;
  for (const v of expect.values()) {
    result = result < v ? v : result;
  }

  return result;
}
