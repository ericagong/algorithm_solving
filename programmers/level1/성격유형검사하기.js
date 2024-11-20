// https://school.programmers.co.kr/learn/courses/30/lessons/118666

function solution_hardCoding(survey, choices) {
  const s = [3, 2, 1, 0, 1, 2, 3];
  const m = new Map([
    ['R', 0],
    ['T', 0],
    ['C', 0],
    ['F', 0],
    ['J', 0],
    ['M', 0],
    ['A', 0],
    ['N', 0],
  ]);

  choices.forEach((c, i) => {
    if (c < 4) m.set(survey[i][0], m.get(survey[i][0]) + s[c - 1]);
    else if (c > 4) m.set(survey[i][1], m.get(survey[i][1]) + s[c - 1]);
  });

  let result = '';
  result += m.get('R') >= m.get('T') ? 'R' : 'T';
  result += m.get('C') >= m.get('F') ? 'C' : 'F';
  result += m.get('J') >= m.get('M') ? 'J' : 'M';
  result += m.get('A') >= m.get('N') ? 'A' : 'N';
  return result;
}

function solution_findRule(survey, choices) {
  const MBTI = {};
  const types = ['RT', 'CF', 'JM', 'AN'];

  types.forEach((type) => type.split('').forEach((char) => (MBTI[char] = 0)));

  choices.forEach((choice, index) => {
    const [disagree, agree] = survey[index];

    MBTI[choice > 4 ? agree : disagree] += Math.abs(choice - 4);
  });

  return types.map(([a, b]) => (MBTI[b] > MBTI[a] ? b : a)).join('');
}
