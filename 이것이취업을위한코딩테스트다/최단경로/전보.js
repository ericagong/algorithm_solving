class PriorityQueue {
  constructor(comparator = (a, b) => a - b) {
    this.queue = [];
    this.comparator = comparator; // 사용자 정의 비교 함수
  }

  push(value) {
    this.queue.push(value);
    let idx = this.queue.length - 1;
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      if (this.comparator(this.queue[parentIdx], value) <= 0) break;
      [this.queue[parentIdx], this.queue[idx]] = [
        this.queue[idx],
        this.queue[parentIdx],
      ];
      idx = parentIdx;
    }
  }

  pop() {
    if (this.queue.length === 1) return this.queue.pop();
    const top = this.queue[0];
    this.queue[0] = this.queue.pop();
    let idx = 0;
    while (true) {
      const left = 2 * idx + 1;
      const right = 2 * idx + 2;
      let smallest = idx;

      if (
        left < this.queue.length &&
        this.comparator(this.queue[left], this.queue[smallest]) < 0
      )
        smallest = left;
      if (
        right < this.queue.length &&
        this.comparator(this.queue[right], this.queue[smallest]) < 0
      )
        smallest = right;
      if (smallest === idx) break;
      [this.queue[idx], this.queue[smallest]] = [
        this.queue[smallest],
        this.queue[idx],
      ];
      idx = smallest;
    }
    return top;
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

function dijkstra(start) {
  const distances = Array(N).fill(Infinity);
  distances[start] = 0;
  const pq = new PriorityQueue((a, b) => a[0] - b[0]); // 최소힙
  pq.push([0, start]);

  while (!pq.isEmpty()) {
    const [currentDist, currentNode] = pq.pop();
    if (currentDist > distances[currentNode]) continue;

    for (const [nextNode, weight] of g[currentNode]) {
      const newDist = currentDist + weight;
      if (newDist < distances[nextNode]) {
        distances[nextNode] = newDist;
        pq.push([newDist, nextNode]);
      }
    }
  }

  return distances;
}

const distances = dijkstra(C - 1);
const reachedCnt = distances.filter((d) => d > 0 && d < Infinity).length;
const maxTime = Math.max(...distances.filter((d) => d < Infinity));

console.log(reachedCnt, maxTime);
