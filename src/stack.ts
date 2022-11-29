class Stack<T> {
  private readonly UNDERFLOW_ERROR = new Error('stack underflow');
  private readonly OVERFLOW_ERROR = new Error('stack overflow');
  private readonly data: T[] = [];

  private isEmpty(): boolean {
    return this.data.length === 0;
  }

  private atCapacity(): boolean {
    return this.size() === this.capacity;
  }

  constructor(readonly capacity = Infinity) {}

  push(item: T): void {
    if (this.atCapacity()) throw this.OVERFLOW_ERROR;
    this.data.push(item);
  }

  pop(): T | undefined {
    if (this.isEmpty()) throw this.UNDERFLOW_ERROR;
    return this.data.pop();
  }

  peek(): T {
    if (this.isEmpty()) throw this.UNDERFLOW_ERROR;
    return this.data[this.size() - 1];
  }

  size(): number {
    return this.data.length;
  }
}

export { Stack };
