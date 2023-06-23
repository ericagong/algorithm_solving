// https://blog.naver.com/boostcamp_official/223085597916

const calcPad = (type, idx) => {
  let r = 0;
  switch (type) {
    case "BOOL":
      return "";
    case "SHORT":
      r = idx % 2;
      if (r === 0) return "";
      return ".".repeat(2 - r);
    case "FLOAT":
      r = idx % 4;
      if (r === 0) return "";
      return ".".repeat(4 - r);
    case "INT":
      r = idx % 8;
      if (r === 0) return "";
      return ".".repeat(8 - r);
    case "LONG":
      r = idx % 8;
      if (r == 0) return "";
      return ".".repeat(8 - r);
  }
};

const getArr = (str) => {
  let arr = [];
  while (str.length > 8) {
    let temp = str.slice(0, 8);
    arr.push(temp);
    str = str.slice(8);
  }
  arr.push(str.padEnd(8, "."));
  return arr;
};

function solution(arr) {
  const sizeObj = {
    BOOL: "#",
    SHORT: "##",
    FLOAT: "####",
    INT: "########",
    LONG: "################",
  };

  let result = sizeObj[arr[0]];
  let idx = result.length - 1;
  for (let i = 1; i < arr.length; i++) {
    result += calcPad(arr[i], idx + 1);
    result += sizeObj[arr[i]];
    idx = result.length - 1;
  }

  // console.log(result)
  if (result.length > 128) return "HALT";
  let temp_arr = getArr(result);
  return temp_arr.join(",");
}

console.log(solution(["INT", "INT", "BOOL", "SHORT", "LONG"]));
console.log(solution(["INT", "SHORT", "FLOAT", "INT", "BOOL"]));
console.log(solution(["FLOAT", "SHORT", "BOOL", "BOOL", "BOOL", "INT"]));
console.log(
  solution([
    "BOOL",
    "LONG",
    "SHORT",
    "LONG",
    "BOOL",
    "LONG",
    "BOOL",
    "LONG",
    "SHORT",
    "LONG",
    "LONG",
  ])
);
