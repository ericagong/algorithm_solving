const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(inputs[0]);

let cnt = 0;
for (let h = 0; h <= N; h++) {
  for (let m = 0; m < 60; m++) {
    for (let s = 0; s < 60; s++) {
      const time = String(h).concat(m, s);
      if (time.includes('3')) cnt += 1;
    }
  }
}

console.log(cnt);
