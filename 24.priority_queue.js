class PriorityQueue {
  constructor(compare) {
    this.compare = compare;
    this.queue = [];
  }

  size() {
    return this.queue.length;
  }

  peek() {
    return this.queue[0];
  }

  add(element) {
    this.queue.push(element);
    this.indexUpdate(this.size() - 1);
  }

  poll() {
    const ret = this.peek();
    this.queue[0] = this.queue[this.size() - 1];
    this.queue.pop();
    this.heapify(0);

    return ret;
  }

  heapify(i) {
    this.compare(1, 2) < 0 ? this.minHeapify(i) : this.maxHeapify(i);
  }

  minHeapify(i) {
    let min = i;
    const l = this.left(i);
    const r = this.right(i);

    if (this.queue[l] != undefined && this.queue[l] < this.queue[min]) {
      this.swapValues(min, l);
      min = l;
    }

    if (this.queue[r] != undefined && this.queue[r] < this.queue[min]) {
      this.swapValues(min, r);
      min = r;
    }

    if (min !== i) this.minHeapify(min);
  }

  maxHeapify(i) {
    let max = i;
    const l = this.left(i);
    const r = this.right(i);

    if (this.queue[l] != undefined && this.queue[l] > this.queue[max]) {
      this.swapValues(max, l);
      max = l;
    }

    if (this.queue[r] != undefined && this.queue[r] > this.queue[max]) {
      this.swapValues(max, r);
      max = r;
    }

    if (max !== i) this.maxHeapify(max);
  }

  left(i) {
    return i * 2 + 1;
  }

  right(i) {
    return i * 2 + 2;
  }

  parent(i) {
    return Math.ceil(i / 2) - 1;
  }

  swapValues(a, b) {
    const temp = this.queue[a];
    this.queue[a] = this.queue[b];
    this.queue[b] = temp;
  }

  maxIndexUpdate(p, i) {
    if (this.queue[p] > this.queue[i]) {
      this.swapValues(p, i);
      this.maxIndexUpdate(this.parent(p), p);
    }
  }

  minIndexUpdate(p, i) {
    if (this.queue[p] < this.queue[i]) {
      this.swapValues(p, i);
      this.minIndexUpdate(this.parent(p), p);
    }
  }

  indexUpdate(i) {
    const p = this.parent(i);
    if (p === i) return;

    this.compare(1, 2) < 0
      ? this.maxIndexUpdate(p, i)
      : this.minIndexUpdate(p, i);
  }
}
