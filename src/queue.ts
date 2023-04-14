class Queue<T> {
  private readonly UNDERFLOW_ERROR = new Error('queue underflow');
  private readonly OVERFLOW_ERROR = new Error('queue overflow');
  private readonly data: T[] = [];

  constructor(readonly capacity = Infinity) {}

  size(): number {
    return this.data.length;
  }

  enqueue(item: T): void {
    if (this.size() === this.capacity) throw this.OVERFLOW_ERROR;
    this.data.push(item);
  }

  dequeue(): T {
    if (this.size() === 0) throw this.UNDERFLOW_ERROR;
    return this.data.shift() as T;
  }

  peek(): T {
    if (this.size() === 0) throw this.UNDERFLOW_ERROR;
    return this.data[0];
  }
}

export { Queue };
