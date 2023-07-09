// https://school.programmers.co.kr/learn/courses/30/lessons/150369#

function remove_zeros(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] !== 0) break;
    else arr.pop();
  }
}

function move_truck(arr, cap) {
  let space = cap;
  while (arr.length > 0) {
    const curr = arr.pop();
    if (curr <= space) {
      space -= curr;
    } else {
      arr.push(curr - space);
      space = 0;
      break;
    }
  }
}

function solution(cap, n, deliveries, pickups) {
  remove_zeros(deliveries);
  remove_zeros(pickups);

  let distance = 0;
  while (deliveries.length > 0 || pickups.length > 0) {
    const d = Math.max(deliveries.length, pickups.length);
    distance += 2 * d;

    move_truck(deliveries, cap);
    move_truck(pickups, cap);
  }

  return distance;
}
