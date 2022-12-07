import AcceptaceCritera from './linkedlist.acceptance';

describe('linked list', () => {
  test('writes expected messages to console', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    AcceptaceCritera();

    expect(consoleSpy).toHaveBeenNthCalledWith(1, 'twenty');
    expect(consoleSpy).toHaveBeenNthCalledWith(2, 'fifteen');
    expect(consoleSpy).toHaveBeenNthCalledWith(3, 'ten');
    expect(consoleSpy).toHaveBeenNthCalledWith(4, 'five');
    expect(consoleSpy).toHaveBeenNthCalledWith(5, 'five');
    expect(consoleSpy).toHaveBeenNthCalledWith(6, 'ten');
    expect(consoleSpy).toHaveBeenNthCalledWith(7, 'twenty');
    expect(consoleSpy).toHaveBeenNthCalledWith(8, 'fifteen was not found');
    expect(consoleSpy).toHaveBeenNthCalledWith(9, 'five was found');
    expect(consoleSpy).toHaveBeenCalledTimes(9);
  });
});
