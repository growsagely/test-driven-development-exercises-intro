interface INode<T> {
  readonly data: T;
  next: () => INode<T> | null;
  previous: () => INode<T> | null;
}

class Node<T> implements INode<T> {
  constructor(
    readonly data: T,
    private _next: Node<T> | null,
    private _previous: Node<T> | null = null
  ) {}

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

  // any is OK here because it's just a null guard
  // eslint-disable-next-line
  private nullGuard(parameter: any): void {
    if (parameter === null || parameter === undefined) throw this.BAD_PARAMETER;
  }

  public head(): INode<T> | null {
    return this._head;
  }

  public insert(data: T): INode<T> {
    this.nullGuard(data);

    const n = new Node(data, this._head);
    if (this._head !== null) this._head.updatePrevious(n);
    this._head = n;
    return n;
  }

  public delete(node: INode<T>): void {
    this.nullGuard(node);

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
    this.nullGuard(comparator);

    let current = this._head;
    while (current !== null) {
      if (comparator(current.data)) return current;
      current = current.next();
    }
    return null;
  }
}

export { LinkedList, INode };
