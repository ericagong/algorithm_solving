// https://school.programmers.co.kr/learn/courses/30/lessons/92341

function solution(fees, records) {
  const ins = new Map();
  const accum = new Map();

  records.forEach((record) => {
    const [time, carNumber, action] = record.split(' ');
    const [HH, MM] = time.split(':').map(Number);
    const now = HH * 60 + MM;
    const car = Number(carNumber);
    if (action === 'IN') {
      ins.set(car, now);
    } else if (action === 'OUT') {
      const inTime = ins.get(car);
      ins.delete(car);
      const stayTime = now - inTime;
      accum.set(car, accum.get(car) + stayTime || stayTime);
    }
  });

  for (const [car, inTime] of ins.entries()) {
    const OUT_TIME = 23 * 60 + 59;
    const stayTime = OUT_TIME - inTime;
    accum.set(car, accum.get(car) + stayTime || stayTime);
  }
  // console.log(accum)

  const [bt, bf, ut, uf] = fees;
  const result = [];
  for (const [car, time] of accum.entries()) {
    let fee = bf;
    if (time > bt) {
      const overTime = time - bt;
      const overFee = Math.ceil(overTime / ut) * uf;
      fee += overFee;
    }
    result.push([car, fee]);
  }
  // console.log(result)

  result.sort((a, b) => a[0] - b[0]);
  // console.log(result)

  return result.map((data) => data[1]);
}
