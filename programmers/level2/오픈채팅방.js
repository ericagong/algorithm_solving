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

function solution2(record) {
  const nicknames = new Map();
  const history = [];
  record.forEach((item) => {
    const [action, uid, nickname] = item.split(" ");
    if (!nicknames.has(uid)) nicknames.set(uid, nickname);
    else {
      if (action === "Enter") nicknames.set(uid, nickname);
    }
    if (action === "Change") nicknames.set(uid, nickname);
    else history.push([uid, action]);
  });

  const result = [];
  const inMsg = `님이 들어왔습니다.`;
  const outMsg = `님이 나갔습니다.`;
  history.forEach(([uid, action]) => {
    const postfix = action === "Enter" ? inMsg : outMsg;
    const nickname = nicknames.get(uid);
    result.push(nickname + postfix);
  });

  return result;
}
