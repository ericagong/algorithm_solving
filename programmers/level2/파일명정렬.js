// https://school.programmers.co.kr/learn/courses/30/lessons/17686?language=javascript#

const regex = /[\d]{1,5}/;
function solution(files) {
  const parsed = [];

  files.forEach((file) => {
    const matched = file.match(regex);

    const number = matched[0];
    const head = file.slice(0, matched.index);
    const tail = file.slice(matched.index + number.length);

    parsed.push([head, number, tail, file]);
  });

  parsed.sort((a, b) => {
    let [ha, na, ta] = a;
    let [hb, nb, tb] = b;

    // 1. 대소문자 구분 없이, 사전 오름차순 정렬
    ha = ha.toUpperCase();
    hb = hb.toUpperCase();
    // if(ha !== hb) return hb < ha
    if (ha !== hb) return ha < hb ? -1 : 1;
    // if(ha > hb) return 1
    // else if(ha < hb) return -1

    // 2. 앞의 숫자 0은 무시하고 숫자 오름차순 정렬
    na = Number(na);
    nb = Number(nb);
    if (na !== nb) return na - nb;

    // 3. 나머지는 순서대로 정렬
  });

  // 이름만 반환
  return parsed.map((v) => v[3]);
}

function solution2(files) {
  const NUMBER = /\d{1,5}/;
  const result = [];
  files.forEach((file) => {
    const h = file.split(NUMBER)[0].toLowerCase();
    const n = Number(file.match(NUMBER)[0]);
    result.push([file, h, n]);
  });

  result.sort((a, b) => {
    if (a[1] > b[1]) return 1;
    else if (a[1] < b[1]) return -1;
    else {
      if (a[2] !== b[2]) return a[2] - b[2];
      else return 0;
    }
  });

  return result.map((info) => info[0]);
}
