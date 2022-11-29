import { Stack } from '../stack';

describe('Stack', () => {
  let sut: Stack<number>;

  beforeEach(() => {
    sut = new Stack();
  });

  describe('constructor should', () => {
    test('initalize default values', () => {
      expect(sut.size()).toBe(0);
      expect(sut.capacity).toBe(Infinity);
    });

    test('accept a readonly capacity limit', () => {
      sut = new Stack(5);
      expect(sut.capacity).toBe(5);
    });
  });

  describe('push should', () => {
    test('accepts an item and increment the size', () => {
      sut.push(5);
      expect(sut.size()).toBe(1);
    });

    test('throw if capacity is exceeded', () => {
      sut = new Stack<number>(3);
      [1, 2, 3].forEach((x) => sut.push(x));
      expect(() => sut.push(4)).toThrow('stack overflow');
    });
  });

  describe('peek should', () => {
    test('return the item on top of the stack', () => {
      sut.push(12);
      sut.push(37);
      sut.push(138);

      const peeked = sut.peek();
      expect(peeked).toBe(138);
    });

    test('not change size', () => {
      sut.push(12);
      sut.push(37);
      sut.push(138);

      expect(sut.size()).toBe(3);
      sut.peek();
      sut.peek();
      expect(sut.size()).toBe(3);
    });

    test('throw if stack is empty', () => {
      expect(() => sut.peek()).toThrow('stack underflow');
    });
  });

  describe('pop should', () => {
    test('return items in FILO order', () => {
      [1, 2, 3].forEach((x) => sut.push(x));
      [3, 2, 1].forEach((x) => expect(sut.pop()).toBe(x));
    });

    test('throw if stack is empty', () => {
      expect(() => sut.pop()).toThrow('stack underflow');
    });
  });
});
