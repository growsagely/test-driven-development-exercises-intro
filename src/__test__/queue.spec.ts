import { Queue } from '../queue';

describe('Queue', () => {
  let sut: Queue<number>;

  beforeEach(() => {
    sut = new Queue();
  });

  describe('constructor should', () => {
    test('initalize default values', () => {
      expect(sut.size()).toBe(0);
      expect(sut.capacity).toBe(Infinity);
    });

    test('accept a readonly capacity limit', () => {
      sut = new Queue(5);
      expect(sut.capacity).toBe(5);
    });
  });

  describe('enqueue should', () => {
    test('accepts an item and increment the size', () => {
      sut.enqueue(5);
      expect(sut.size()).toBe(1);
    });

    test('throw if capacity is exceeded', () => {
      sut = new Queue<number>(3);
      [1, 2, 3].forEach((x) => sut.enqueue(x));
      expect(() => sut.enqueue(4)).toThrow('queue overflow');
    });
  });

  describe('peek should', () => {
    test('return the item on top of the queue', () => {
      sut.enqueue(12);
      sut.enqueue(37);
      sut.enqueue(138);

      const peeked = sut.peek();
      expect(peeked).toBe(12);
    });

    test('not change size', () => {
      sut.enqueue(12);
      sut.enqueue(37);
      sut.enqueue(138);

      expect(sut.size()).toBe(3);
      sut.peek();
      sut.peek();
      expect(sut.size()).toBe(3);
    });

    test('throw if queue is empty', () => {
      expect(() => sut.peek()).toThrow('queue underflow');
    });
  });

  describe('dequeue should', () => {
    test('return items in LIFO order', () => {
      [1, 2, 3].forEach((x) => sut.enqueue(x));
      [1, 2, 3].forEach((x) => expect(sut.dequeue()).toBe(x));
    });

    test('throw if queue is empty', () => {
      expect(() => sut.dequeue()).toThrow('queue underflow');
    });
  });
});
