const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [r, n] = inputs[0].split(' ').map(Number);
const words = inputs[1].split(' ').sort();
// console.log(r, n, words)

const vowels = ['a', 'e', 'i', 'o', 'u'];

const comb = [];
function dfs(r, d) {
  if (comb.length === r) {
    const vCount = comb.filter((ch) => vowels.includes(ch)).length;
    const cCount = comb.filter((ch) => !vowels.includes(ch)).length;

    if (vCount < 1) return;
    if (cCount < 2) return;

    console.log(comb.join(''));
    return;
  }
  for (let i = d; i < n; i++) {
    comb.push(words[i]);
    dfs(r, i + 1);
    comb.pop();
  }
}

dfs(r, 0);
