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

function solution1(friends, gifts) {
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

function solution2(friends, gifts) {
  const gives = friends.reduce((m, name) => {
    m.set(name, new Map(friends.map((name) => [name, 0])));
    return m;
  }, new Map([]));
  // console.log(gives)

  gifts.forEach((info) => {
    const [from, to] = info.split(' ');
    const target = gives.get(from);
    target.set(to, target.get(to) + 1 || 1);
  });
  // console.log(gives)

  const indexes = new Map([]);
  friends.forEach((name) => {
    let send = 0;
    let received = 0;
    for (let [from, tos] of gives.entries()) {
      for (let [to, num] of tos.entries()) {
        if (from === name) send += num;
        else if (to === name) received += num;
      }
    }
    const index = send - received;
    indexes.set(name, index);
  });
  // console.log(indexes)

  const assumed = friends.reduce((m, name) => {
    m.set(name, 0);
    return m;
  }, new Map([]));
  // console.log(assumed)
  for (let i = 0; i < friends.length; i++) {
    for (let j = 0; j < friends.length; j++) {
      if (i >= j) continue;
      const a = friends[i];
      const b = friends[j];
      const aTob = gives.get(a).get(b);
      const bToa = gives.get(b).get(a);
      if (aTob > bToa) assumed.set(a, assumed.get(a) + 1);
      else if (aTob < bToa) assumed.set(b, assumed.get(b) + 1);
      else {
        const aIdx = indexes.get(a);
        const bIdx = indexes.get(b);
        if (aIdx > bIdx) assumed.set(a, assumed.get(a) + 1);
        else if (aIdx < bIdx) assumed.set(b, assumed.get(b) + 1);
        else continue;
      }
    }
  }
  // console.log(assumed)
  return Math.max(...assumed.values());
}

function solution3(friends, gifts) {
  const length = friends.length;
  const giftPoints = new Array(length).fill(0);
  const index = {};
  const record = [];
  const points = new Array(length).fill(0);
  for (let i = 0; i < length; i++) {
    record[i] = new Array(length).fill(0);
    index[friends[i]] = i;
  }
  for (const gift of gifts) {
    const [from, to] = gift.split(' ');
    record[index[from]][index[to]] += 1;
    giftPoints[index[from]] += 1;
    giftPoints[index[to]] -= 1;
  }
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      if (record[i][j] > record[j][i]) {
        points[i] += 1;
      } else if (record[i][j] === record[j][i]) {
        if (giftPoints[i] > giftPoints[j]) {
          points[i] += 1;
        }
      }
    }
  }
  return Math.max(...points);
}
