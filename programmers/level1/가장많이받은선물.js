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
    const [from, to] = info.split(' ');
    gives.get(from).set(to, gives.get(from).get(to) + 1 || 1);
    totalGives.set(from, totalGives.get(from) + 1);
    totalGets.set(to, totalGets.get(to) + 1);
  });
  // console.log(gives);

  const indexes = new Map([]);
  friends.forEach((name) => {
    indexes.set(name, totalGives.get(name) - totalGets.get(name));
  });
  // console.log(indexes);

  const expect = new Map([]);
  for (let i = 0; i < friends.length; i++) {
    expect.set(friends[i], 0);
    for (let j = 0; j < friends.length; j++) {
      if (i <= j) continue;
      const A = friends[i];
      const B = friends[j];
      const giveB = gives.get(A).get(B) || 0;
      const getB = gives.get(B).get(A) || 0;
      if (giveB > getB) expect.set(A, expect.get(A) + 1 || 1);
      else if (giveB < getB) expect.set(B, expect.get(B) + 1 || 1);
      else {
        const indexA = indexes.get(A);
        const indexB = indexes.get(B);
        if (indexA > indexB) expect.set(A, expect.get(A) + 1 || 1);
        else if (indexA < indexB) expect.set(B, expect.get(B) + 1 || 1);
      }
    }
  }
  // console.log(expect);

  return Math.max(...expect.values());
}
