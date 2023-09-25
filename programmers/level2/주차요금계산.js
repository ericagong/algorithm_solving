// https://school.programmers.co.kr/learn/courses/30/lessons/92341?language=javascript

function solution(fees, records) {
  const [baseTime, baseFee, unitTime, unitFee] = fees;

  const recordMap = new Map();
  const timeMap = new Map();
  const feeArr = [];

  records.forEach((record) => {
    const [time, num, action] = record.split(" ");

    if (action === "IN") {
      recordMap.set(num, time);
    }
    if (action === "OUT") {
      // 입차시간 기록을 바탕으로 누적 시간 계산
      const [inHH, inMM] = recordMap.get(num).split(":").map(Number);
      recordMap.delete(num);

      const [outHH, outMM] = time.split(":").map(Number);
      const accTime = outHH * 60 + outMM - (inHH * 60 + inMM);
      timeMap.set(num, timeMap.get(num) + accTime || accTime);
    }
  });

  // 출차 기록이 없는 차량은 23:59에 출차한 것으로 간주
  if (recordMap.size !== 0) {
    const outTime = 23 * 60 + 59;
    for (const [num, time] of recordMap.entries()) {
      const [inHH, inMM] = time.split(":").map(Number);
      const inTime = inHH * 60 + inMM;
      const accTime = outTime - inTime;
      timeMap.set(num, timeMap.get(num) + accTime || accTime);
    }
  }

  // 전체 차량에 대한 요금 계산
  for (const [num, accTime] of timeMap.entries()) {
    let fee = 0;
    if (accTime <= baseTime) fee = baseFee;
    else fee = baseFee + Math.ceil((accTime - baseTime) / unitTime) * unitFee;

    feeArr.push([num, fee]);
  }

  // 차량 번호 기준 오름차순 정렬
  return feeArr.sort((a, b) => Number(a[0]) - Number(b[0])).map((v) => v[1]);
}

function toMinute(str) {
  const [HH, MM] = str.split(":").map(Number);
  return HH * 60 + MM;
}

function calculateTime(inTime, outTime) {
  return toMinute(outTime) - toMinute(inTime);
}

function solution2(fees, records) {
  const check = new Map();
  const time = new Map();

  records.forEach((record) => {
    const [timeStr, carStr, _] = record.split(" ");
    if (!check.has(carStr)) check.set(carStr, timeStr);
    else {
      const t = calculateTime(check.get(carStr), timeStr);
      time.set(carStr, time.get(carStr) + t || t);
      check.delete(carStr);
    }
  });

  for (const [carStr, inTime] of check.entries()) {
    const t = calculateTime(inTime, "23:59");
    time.set(carStr, time.get(carStr) + t || t);
  }

  const [BT, BF, UT, UF] = fees;
  const price = [];
  for (const [carStr, accTime] of time.entries()) {
    const overTime = accTime <= BT ? 0 : accTime - BT;
    const fee = BF + Math.ceil(overTime / UT) * UF;
    price.push([carStr, fee]);
  }

  return price
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .map((item) => item[1]);
}
