const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const s = inputs[0].split('');
// console.log(s)

const alpha = [];
let sum = 0;
for (let i = 0; i < s.length; i++) {
  if (s[i].match(/[A-Z]/)) alpha.push(s[i]);
  else sum += Number(s[i]);
}

alpha.sort();
// console.log(alpha)

console.log(alpha.join('').concat(String(sum)));
