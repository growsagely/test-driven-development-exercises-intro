import { LinkedList, INode } from '../../linkedlist';

function LinkedListAcceptance(): void {
  const ll = new LinkedList<string>();
  // insert four strings into the list
  ll.insert('five');
  ll.insert('ten');
  ll.insert('fifteen');
  ll.insert('twenty');

  // traverse the list
  let node = ll.head();
  let tail: INode<string> | null = null;
  while (node !== null) {
    console.log(node.data);

    // delete the string fifteen from the list
    if (node.data === 'fifteen') ll.delete(node);

    // find the tail node
    if (node.next() === null) tail = node;
    node = node.next();
  }

  // traverse the list backwards
  while (tail !== null) {
    console.log(tail.data);
    tail = tail.previous();
  }

  // this search will return null because the string was deleted
  if (ll.search((x) => x === 'fifteen') === null)
    console.log('fifteen was not found');

  // this search will return the node that contains the string five
  const result = ll.search((x) => x === 'five');
  if (result !== null) console.log('five was found');
}

export default LinkedListAcceptance;
