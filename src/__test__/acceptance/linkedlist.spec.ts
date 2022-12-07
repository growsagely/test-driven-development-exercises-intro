import { LinkedList } from '../../linkedlist';
import { Stack } from '../../stack';

describe('linked list', () => {
  test('', () => {
    const llData = new Stack<string>();

    const ll = new LinkedList<string>();
    // insert four strings into the list
    ll.insert('five');
    ll.insert('ten');
    ll.insert('fifteen');
    ll.insert('twenty');

    // traverse the list
    let node = ll.head();
    while (node !== null) {
      llData.push(node.data);

      // delete the string fifteen from the list
      if (node.data === 'fifteen') ll.delete(node);

      node = node.next();
    }

    // this search will return null because the string was deleted
    if (ll.search((x) => x === 'fifteen') === null)
      llData.push('fifteen was not found');

    // this search will return the node that contains the string five
    const result = ll.search((x) => x === 'five');
    if (result !== null) llData.push(result.data);

    expect(llData.pop()).toBe('five');
    expect(llData.pop()).toBe('fifteen was not found');
    expect(llData.pop()).toBe('five');
    expect(llData.pop()).toBe('ten');
    expect(llData.pop()).toBe('fifteen');
    expect(llData.pop()).toBe('twenty');
  });
});
