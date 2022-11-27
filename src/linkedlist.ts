interface INode<T> {
  data: () => T;
  next: () => INode<T> | null;
  previous: () => INode<T> | null;
}

class Node<T> implements INode<T> {
  constructor(
    private readonly _data: T,
    private _next: Node<T> | null = null,
    private _previous: Node<T> | null = null
  ) {}

  public data(): T {
    return this._data;
  }

  public next(): Node<T> | null {
    return this._next;
  }

  public previous(): Node<T> | null {
    return this._previous;
  }

  public updateNext(next: Node<T> | null): void {
    this._next = next;
  }

  public updatePrevious(previous: Node<T> | null): void {
    this._previous = previous;
  }
}

class LinkedList<T> {
  private readonly BAD_PARAMETER = new Error('null or undefined parameter');

  private _head: Node<T> | null = null;

  public head(): INode<T> | null {
    return this._head;
  }

  public insert(data: T): INode<T> {
    if (data === null || data === undefined) throw this.BAD_PARAMETER;

    const n = new Node(data, this._head);
    if (this._head !== null) this._head.updatePrevious(n);
    this._head = n;
    return n;
  }

  public delete(node: INode<T>): void {
    if (node === null || node === undefined) throw this.BAD_PARAMETER;

    if (this._head === node) {
      this._head = this._head.next();
      if (this._head !== null) this._head.updatePrevious(null);
    } else {
      const previous = (node as Node<T>).previous();
      const next = (node as Node<T>).next();

      if (previous !== null) previous.updateNext(next);
      if (next !== null) next.updatePrevious(previous);
    }
  }

  public search(comparator: (data: T) => boolean): INode<T> | null {
    if (comparator === null || comparator === undefined)
      throw this.BAD_PARAMETER;

    let current = this._head;
    while (current !== null) {
      if (comparator(current.data())) return current;
      current = current.next();
    }
    return null;
  }
}

export { LinkedList, INode };
