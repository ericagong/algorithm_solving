// https://school.programmers.co.kr/learn/courses/30/lessons/17684?language=javascript

function solution(msg) {
  let result = [];

  let dict = new Map();

  // 뒤에서부터 효율적으로 인덱스 찾기 위해, dict의 key 중 가장 긴 길이 별도로 저장
  let max_len = 1;
  let indexes = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < indexes.length; i++) {
    dict.set(indexes[i], i + 1);
  }

  while (msg.length > 0) {
    let w = "";

    // w 찾기
    for (let i = max_len; i > 0; i--) {
      w = msg.slice(0, i);
      if (dict.has(w)) {
        // 	w에 해당하는 색인 번호 출력
        result.push(dict.get(w));
        break;
      }
    }

    // 입력에서 w 제거
    msg = msg.slice(w.length);

    // wc 사전 추가
    if (msg.length !== 0) {
      let key = w + msg[0];
      dict.set(key, dict.size + 1);

      max_len = Math.max(max_len, key.length); // 최장 길이 반영
    }
  }

  return result;
}

function solution2(msg) {
  const dict = new Map();
  let index = 1;
  for (alpha of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
    dict.set(alpha, index);
    index += 1;
  }

  const answer = [];
  while (msg) {
    let w;
    for (let i = msg.length; i > 0; i--) {
      w = msg.slice(0, i);
      if (dict.has(w)) {
        break;
      }
    }
    answer.push(dict.get(w));
    msg = msg.slice(w.length);
    const c = msg[0];
    if (c !== "") {
      dict.set(w + c, dict.size + 1);
    }
  }

  return answer;
}
