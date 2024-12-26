class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);
    let idx = this.heap.length - 1;
    while (idx > 0) {
      const parent = Math.floor((idx - 1) / 2);
      if (this.heap[parent] <= this.heap[idx]) break;
      [this.heap[parent], this.heap[idx]] = [this.heap[idx], this.heap[parent]];
      idx = parent;
    }
  }

  pop() {
    if (this.heap.length === 1) return this.heap.pop();
    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    let idx = 0;
    while (true) {
      let left = idx * 2 + 1;
      let right = idx * 2 + 2;
      let idx = 0;
      if (left < this.heap.length && this.heap[left] < this.heap[idx]) {
        smallest = left;
      }
      if (right < this.heap.length && this.heap[right] < this.heap[idx]) {
        smallest = right;
      }
      if (smallest === idx) break;
      [this.heap[idx], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[idx],
      ];
      idx = smallest;
    }
    return root;
  }

  size() {
    return this.heap.length;
  }
}
