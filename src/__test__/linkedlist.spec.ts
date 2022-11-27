import { LinkedList, INode } from '../linkedlist';

describe('LinkedList', () => {
  let sut: LinkedList<number>;

  beforeEach(() => {
    sut = new LinkedList<number>();
  });

  describe('constructor should', () => {
    test('create an linked list with an null head', () => {
      expect(sut.head()).toBeNull();
    });
  });

  describe('insert should', () => {
    test('throw if data is null or undefined', () => {
      /**
       * Forcing bad usage for the test
       * @ts-expect-error */
      expect(() => sut.insert(null)).toThrow('null or undefined parameter');
      /**
       * Forcing bad usage for the test
       * @ts-expect-error */
      expect(() => sut.insert(undefined)).toThrow(
        'null or undefined parameter'
      );
    });

    test('create a new node at head that contains the given data', () => {
      const expected = 138;

      sut.insert(expected);
      expect(sut.head()?.data()).toBe(expected);
    });

    test('create a node with null next and previous properties', () => {
      const expected = 138;

      sut.insert(expected);
      expect(sut.head()?.data()).toBe(expected);
      expect(sut.head()?.next()).toBeNull();
      expect(sut.head()?.previous()).toBeNull();
    });

    test('move current head to next and reset head', () => {
      const expected = 138;
      const expected2 = 1138;
      [expected, expected2].forEach((x) => sut.insert(x));

      expect(sut.head()?.data()).toBe(expected2);
      expect(sut.head()?.next()?.data()).toBe(expected);
    });

    test('set the new node as previous on head().next()', () => {
      [138, 1138].forEach((x) => sut.insert(x));

      expect(sut.head()?.next()?.previous()).toBe(sut.head());
    });

    test('return newly created node', () => {
      const expected = 138;

      const returned = sut.insert(expected);
      expect(returned.data()).toBe(expected);
    });
  });

  describe('delete should', () => {
    function deleteHead<T>(sut: LinkedList<T>): void {
      const head = sut.head();
      if (head === null) fail('head should not be null');
      else sut.delete(head);
    }

    function deleteNode<T>(sut: LinkedList<T>, node: INode<T> | null): void {
      if (node === null) fail('node should not be null');
      else sut.delete(node);
    }

    test('throw given a null or undefined node', () => {
      sut.insert(138);

      /**
       * Forcing bad usage for the test
       * @ts-expect-error */
      expect(() => sut.delete(null)).toThrow('null or undefined parameter');
      /**
       * Forcing bad usage for the test
       * @ts-expect-error */
      expect(() => sut.delete(undefined)).toThrow(
        'null or undefined parameter'
      );
    });

    test('remove the head given the head', () => {
      sut.insert(138);

      deleteHead(sut);
      expect(sut.head()).toBeNull();
    });

    test('set head.next() to null on tail given the tail', () => {
      [138, 1138, 11138].forEach((x) => sut.insert(x));

      deleteNode(sut, sut.head()?.next()?.next() ?? null);
      const tail = sut.head()?.next();

      expect(tail?.next()).toBeNull();
    });

    test('set head.previous() to null given the head', () => {
      const expected = 138;
      [expected, 1138].forEach((x) => sut.insert(x));

      deleteHead(sut);
      expect(sut.head()?.previous()).toBeNull();
    });

    test('remove the middle node given the middle node', () => {
      const head = 11138;
      const middle = 1138;
      const tail = 138;

      [tail, middle, head].forEach((x) => sut.insert(x));

      deleteNode(sut, sut.head()?.next() ?? null);

      expect(sut.head()?.data()).toBe(head);
      expect(sut.head()?.next()?.data()).toBe(tail);
      expect(sut.head()?.next()?.next()).toBeNull();
    });

    test('set next and previous links given the middle node', () => {
      const head = 11138;
      const middle = 1138;
      const tail = 138;

      [tail, middle, head].forEach((x) => sut.insert(x));
      deleteNode(sut, sut.head()?.next() ?? null);

      expect(sut.head()?.next()?.data()).toBe(tail);
      expect(sut.head()?.previous()).toBeNull();

      expect(sut.head()?.next()?.previous()?.data()).toBe(head);
      expect(sut.head()?.next()?.next()).toBeNull();
    });
  });

  describe('search should', () => {
    test('throw if comparator is null or undefined', () => {
      /**
       * Forcing bad usage for the test
       * @ts-expect-error */
      expect(() => sut.search(null)).toThrow('null or undefined parameter');
      /**
       * Forcing bad usage for the test
       * @ts-expect-error */
      expect(() => sut.search(undefined)).toThrow(
        'null or undefined parameter'
      );
    });

    test('return the node containing a value where the comparator evalutes to true', () => {
      [138, 1138, 11138].forEach((x) => sut.insert(x));

      const found = sut.search((x) => x === 138);
      expect(found?.data()).toBe(138);
    });

    test('return null if the comparator evalutes to false for all values', () => {
      [138, 1138, 11138].forEach((x) => sut.insert(x));

      const found = sut.search((x) => x === 233);
      expect(found).toBeNull();
    });
  });
});
