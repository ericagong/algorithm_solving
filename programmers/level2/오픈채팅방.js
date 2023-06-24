// https://school.programmers.co.kr/learn/courses/30/lessons/42888?language=javascript

function get_message(action, nickname) {
  switch (action) {
    case "Enter":
      return `${nickname}님이 들어왔습니다.`;
    case "Leave":
      return `${nickname}님이 나갔습니다.`;
  }
}

function solution(record) {
  const users = new Map();
  const actions = [];

  record.forEach((r) => {
    const [action, id, nickname] = r.split(" ");
    // Leave 일 때는 nickname 부재
    if (action === "Enter" || action === "Change") users.set(id, nickname);
    if (action !== "Change") actions.push([action, id]);
  });

  const result = [];
  actions.forEach(([action, id]) => {
    const nickname = users.get(id);
    result.push(get_message(action, nickname));
  });

  return result;
}
