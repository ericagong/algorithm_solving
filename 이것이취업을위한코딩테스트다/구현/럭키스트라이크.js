const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const nums = inputs[0].split('').map(Number);
// console.log(nums)

if (nums.length % 2 !== 0) console.log('READY');
else {
  const totalSum = nums.reduce((acc, curr) => acc + curr, 0);
  const halfSum = nums
    .slice(0, Math.floor(nums.length / 2))
    .reduce((acc, curr) => acc + curr, 0);
  if (totalSum / 2 === halfSum) console.log('LUCKY');
  else console.log('READY');
}
