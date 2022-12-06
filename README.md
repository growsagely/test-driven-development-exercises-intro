# Test-Driven Development Workshop Exercises
This set of exercises aims to reinforce your understanding of the three laws of
test-driven development.

1. Write _NO production code_ except to pass a failing test.
1. Write _only enough of a test_ to demonstrate a failure.
1. Write _only enough production code_ to pass the test.

More concisely:

Red (make it fail) -> Green (make it pass) -> Refactor (make it pretty).

The Red-Green-Refactor cycle enables developers to maintain a tight
sub-sixty-second feedback loop. These exercises strengthen your understanding by
explicitly walking you through several loops while building a rudimentary
[doubly linked list](https://en.wikipedia.org/wiki/Doubly_linked_list) using
TypeScript.  Next, you'll be able to apply your learning by completing the
implementation solo. Let's get started.

# Configure Your Environment
For your convince, this repository has a pre-configured development container.
There are two ways to access it easily: GitHub Codespaces and using Visual
Studio Code in conjunction with Docker. You also have the option to clone the
repo and configure any editor you like (assuming you can do so without support).
See the instructions below.

Once you can view the code in an editor, move to the next section.

## GitHub Codespaces
Prerequisites
- GitHub account

Configuration Steps
1. Log into GitHub
1. Navigate to the
   [test-driven-development-exercises-intro]https://github.com/growsagely/test-driven-development-exercises-intro)
   repository
1. Open Codespaces

	![Codespace](./readme_img/codespace.png)

## Local Development Container
Prerequisites
- GitHub account
- Git
- [Visual Studio Code](https://code.visualstudio.com/)
- [Docker](https://docs.docker.com/get-docker/)

Configuration Steps
1. Install the [Dev
   Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
   Visual Studio Code plugin.
1. Clone the exercise repository
    ``` bash
    git clone https://github.com/growsagely/test-driven-development-exercises-intro.git
    ```
1. Open the cloned folder with Visual Studio Code
1. Click the `Remote Window` button in the lower left-hand corner of the Visual
   Studio Code window.

   ![Open Container Window](./readme_img/open_container_window.png)
1. Select `Reopen in Container` from the select menu.
    ![Reopen in Container](./readme_img/reopen.png)
1. Be patient; the first time loading the container may take several minutes.
   Subsequent loads will be much faster.

# Auto-Run the Test Suite
1. Verify that you are working from the `take-home-exercises` branch.
1. Press `Ctrl+Shift+\` to open a terminal window in Visual Studio Code.
1. Type `npm run test:watch` to auto-run the test suite whenever a file changes.
   The terminal should display passing tests.
1. Open the file `src/__tests__/testsuite.spec.ts` file and change the code on
   line 3 from `expect(true).toBe(true);`  to `expect(true).toBe(false);`.
1. Verify that the terminal automatically displays a failing test.
1. Restore the test to a passing state.

# Code the Linked List
## Requirements
The goal is to build a rudimentary, [doubly linked
list](https://en.wikipedia.org/wiki/Doubly_linked_list) using TypeScript. It
should be constrained to a single type of data and expose four methods:
- `head`: returns the first `node` in the list or `null` if no objects exist.
- `insert`: accepts a data item, generates a new `node` placing it at `head.`
- `delete`: accepts a `node` and removes it from the list by modifying its
    `next` and `previous` attributes.
- `search`: accepts a search predicate and returns the first item in the list
    that satisfies the predicate.

From the consumer's perspective, `node` objects are immutable data structures
with no logic. They have three attributes:
- `data`: object passed to the linked list `insert` method.
- `next`: pointer to the next `node` in the list.
- `previous`: pointer to the previous `node` in the list.

Below is an example of a linked list's intended use.

```typescript
const ll = new LinkedList<string>();
// insert four strings into the list
ll.insert('five');
ll.insert('ten');
ll.insert('fifteen');
ll.insert('twenty');

// traverse the list
let node = ll.head();
while (node !== null) {
    // log each string
    console.log(node.data);

    // delete the string fifteen from the list
    if (node.data === 'fifteen') ll.delete(node);

    node = node.next();
}

// this search will return null because the string was deleted
if (ll.search((x) => x === 'fifteen') === null) console.log('fifteen was not found');

// this search will return the node that contains the string five
const result = ll.search((x) => x === 'five');
if (result !== null) console.log(result.data);
```

Executing the code above should produce the following console output:

``` bash
twenty
fifteen
ten
five
fifteen was not found
five
```

Don't be alarmed if these seems a bit disorienting. The point of this workshop
is to learn TDD, the linked list is just a training conduit. Follow the
instruction carefully as each step builds upon the last.


## Loop 1
### Red
The most straightforward failing test we can write is to try to import the
linked list.

1. Create a file `src/__tests__/linkedlist.spec.ts`
1. Add the following code
	```typescript
	import { LinkedList } from '../linkedlist';
	```
### Green
1. Create a file `src/linkedlist.ts`
1. Add the following code
	```typescript
	class LinkedList {};

	export { LinkedList };
	```

We don't have any failing tests at this point, but the test suite isn't passing
either. You should have the following failure: `Your test suite must contain at
least one test.` It's a stretch to call this green, but let's avoid dogmatism.

### Refactor
N/A

## Loop 2
### Red
Let's write a test to see if `head` is `null` immediately after constructing a
linked list. We'll assume that `head` is a function that returns a `Node`
object. Outside actors could modify it if it were a property, breaking
encapsulation. Add the following code to the test file.

```typescript
describe('Linked List', () => {
  describe('constructor should', () => {
    test('initalize the head to null', () => {
      const sut = new LinkedList();
      expect(sut.head()).toBeNull();
    });
  });
});
```

The result should be the following test failure.

``` bash
src/__test__/linkedlist.spec.ts:7:18 - error TS2339: Property 'head' does not exist on type 'LinkedList'.
```

### Green
Update the code to make the test pass.

```diff
+ class Node {}

class LinkedList {
+   head(): Node | null {
+     return null;
+   }
}

export { LinkedList };
```
### Refactor
Don't worry; we'll get to some sweet refactoring soon, just not yet.

## Loop 3
### Red
Next, we'll code the insert method. It's usually best to begin with degenerate
test cases. An easy one is the case of a null or undefined input. The TypeScript
type system forbids such input parameters, but they are still possible at
runtime, so it's best to test for them explicitly. Add the following code to the
test file.

```typescript
  describe('insert should', () => {
    test('thorw if data is null or undefined', () => {
      const sut = new LinkedList();
      expect(() => sut.insert(null)).toThrow('null or undefined parameter');
      expect(() => sut.insert(undefined)).toThrow('null or undefined parameter');
    });
  });
```

The tests should be failing.

### Green
Update the code to make the test pass.

```diff
class Node {}

class LinkedList {
  head(): Node | null {
    return null;
  }

+  insert(data: any): void {
+    if (data === null || data === undefined)
+      throw new Error('null or undefined parameter');
+  }
}

export { LinkedList };
```

### Refactor
Now there's is an opportunity for refactoring. Instead of accepting an `any`,
let's convert our `LinkedList` and `Node` to generics.

```diff
- class Node {}
+ class Node<T> {}

- class LinkedList {
+ class LinkedList<T> {
  head(): Node | null {
    return null;
  }

-  insert(data: any): void {
+  insert(data: T): void {
    if (data === null || data === undefined)
      throw new Error('null or undefined parameter');
  }
}
```

Also, both tests have duplicate code. Let's refactor that up to a `beforeEach`
block. Additionally, with the addition of the generic type, we'll need to add
comments to disable TypeScript errors.
```diff
import { LinkedList } from '../linkedlist';

describe('Linked List', () => {
+  let sut: LinkedList<number>;

+  beforeEach(() => {
+    sut = new LinkedList();
+  });

  describe('constructor should', () => {
    test('initalize the head to null', () => {
-     const sut = new LinkedList();
      expect(sut.head()).toBeNull();
    });
  });

  describe('insert should', () => {
    test('thorw if data is null or undefined', () => {
-      const sut = new LinkedList();
+     /**
+      * Forcing bad usage for the test
+      * @ts-expect-error */
      expect(() => sut.insert(null)).toThrow('null or undefined parameter');
+     /**
+      * Forcing bad usage for the test
+      * @ts-expect-error */
      expect(() => sut.insert(undefined)).toThrow(
        'null or undefined parameter'
      );
    });
  });
});
```

## Loop 4
Continuing with the insert method, let's write a test that validates that the
first item passed to insert is placed on a `Node` object at `head`. Create the
test below within the `insert should` describe block.

### Red

```typescript
    test('create new node at head containing data given first insert item', () => {
      const expected = 138;
      sut.insert(expected);
      expect(sut.head()?.data).toBe(expected);
    });
```

The tests should be failing.

### Green
Create the following code to pass the test. Notice that `data` is a `readonly`
property of the Node object. Such constraints are not strictly enforceable at
runtime, but consumers of the library will be aware of the intended usage.

```diff
class Node<T> {
+  constructor(readonly data: T) {}
}

class LinkedList<T> {
+  private _head: Node<T> | null = null;

  head(): Node<T> | null {
-    return null;
+    return this._head;
  }

  insert(data: T): void {
    if (data === null || data === undefined)
      throw new Error('null or undefined parameter');

+    this._head = new Node(data);
  }
}

export { LinkedList };
```

### Refactor

Sorry, no sweet refactoring this time around.

## Loop 5
### Red
A doubly linked list's defining capability is navigating to the next and
previous item. Let's define a `next` and `previous` function on the `Node`
object that should return null initially.

As an aside, `next` and `previous` are functions because we want them to be
internally mutable but immutable externally. Much of the complexity of the
implementation is attempting to keep consumers from modifying the invariants.

Create the test below within the `insert should` describe block.

```typescript
    test('create new node at head containing null next and previous', () => {
      sut.insert(138);
      expect(sut.head()?.next()).toBeNull();
      expect(sut.head()?.previous()).toBeNull();
    });
```

The tests should be failing.

### Green
Modify the `Node` class as show below.

```diff
class Node<T> {
  constructor(readonly data: T) {}

+  next(): Node<T> | null {
+    return null;
+  }

+  previous(): Node<T> | null {
+    return null;
+  }
}
```

### Refactor
Sorry, no sweet refactoring this time around.

## Loop 6
### Red
At this point, you should be getting into the flow of TDD. We'll start
implementing logic. When you insert an item into a linked list, and `head` is
not null, the new item becomes `head`, and the old item becomes `head().next()`.
Create the test below within the `insert should` describe block.

```typescript
    test('move head to next and create new head given non null head', () => {
      const head = 138;
      const next = 1138;
      [next, head].forEach((x) => sut.insert(x));

      expect(sut.head()?.data).toBe(head);
      expect(sut.head()?.next()?.data).toBe(next);
    });
```

The tests should be failing.

### Green
Modify the code to make the tests pass.

```diff
class Node<T> {
-  constructor(readonly data: T) {}
+  constructor(readonly data: T, readonly _next: Node<T> | null = null) {}

  next(): Node<T> | null {
-    return null;
+   return this._next;
  }

  previous(): Node<T> | null {
    return null;
  }
}

class LinkedList<T> {
  private _head: Node<T> | null = null;

  head(): Node<T> | null {
    return this._head;
  }

  insert(data: T): void {
    if (data === null || data === undefined)
      throw new Error('null or undefined parameter');

-    this._head = new Node(data);
+    const n = new Node(data, this._head);
+    this._head = n;
  }
}

export { LinkedList };
```

### Refactor
Sorry, no sweet refactoring this time around.

## Loop 7
### Red
Next, we need a similar test for the previous link. Create the code below within
the `insert should` describe block.

```typescript
    test('update previous given non null head', () => {
      [138, 1138].forEach((x) => sut.insert(x));

      expect(sut.head()?.next()?.previous()).toBe(sut.head());
    });
```

The tests should be failing.

### Green
Modify the code to make the tests pass.

```diff
class Node<T> {
  constructor(
-  constructor(readonly data: T, readonly _next: Node<T> | null = null) {}
+    readonly data: T,
+    readonly _next: Node<T> | null = null,
+    private _previous: Node<T> | null = null
  ) {}

  next(): Node<T> | null {
    return this._next;
  }

  previous(): Node<T> | null {
-   return null;
+   return this._previous;
  }

+ updatePrevious(previous: Node<T> | null): void {
+   this._previous = previous;
+ }
}

class LinkedList<T> {
  private _head: Node<T> | null = null;

  head(): Node<T> | null {
    return this._head;
  }

  insert(data: T): void {
    if (data === null || data === undefined)
      throw new Error('null or undefined parameter');

    const n = new Node(data, this._head);
+   if (this._head !== null) this._head.updatePrevious(n);
    this._head = n;
  }
}

export { LinkedList };
```

### Refactor
There is some definite refactoring required. To pass the tests, `Node` exposed a
method rendering `previous` mutable. That's fine inside the `LinkedList` module;
however, consumers should understand that it's not acceptable to modify the
invariants. Let's remedy this by exposing an interface without these extra
methods. Internally to the module, we'll use `Node`, and externally we'll expose
`INode`.

```diff
+interface INode<T> {
+  readonly data: T;
+  next: () => INode<T> | null;
+  previous: () => INode<T> | null;
+}

-class Node<T> implements INode<T> {
+class Node<T> implements INode<T> {
  constructor(
    readonly data: T,
    readonly _next: Node<T> | null = null,
    private _previous: Node<T> | null = null
  ) {}

  next(): Node<T> | null {
    return this._next;
  }

  previous(): Node<T> | null {
    return this._previous;
  }

  updatePrevious(previous: Node<T> | null): void {
    this._previous = previous;
  }
}

class LinkedList<T> {
  private _head: Node<T> | null = null;

-  head(): Node<T> | null {
+  head(): INode<T> | null {
    return this._head;
  }

  insert(data: T): void {
    if (data === null || data === undefined)
      throw new Error('null or undefined parameter');

    const n = new Node(data, this._head);
    if (this._head !== null) this._head.updatePrevious(n);
    this._head = n;
  }
}

export { LinkedList };
```

## Loop 8
### Red
We'll walk through one more loop, and then you can work through the rest of the
linked list data structure. Let's start coding the delete function. As before,
we'll begin with degenerate cases. Add the following describe block to the test
file.

```typescript
  describe('delete should', () => {
    test('thorw if node is null or undefined', () => {
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
```

The tests should be failing.

### Green
Modify the code to make the tests pass.

```diff
class LinkedList<T> {
  private _head: Node<T> | null = null;

  head(): INode<T> | null {
    return this._head;
  }

  insert(data: T): void {
    if (data === null || data === undefined)
      throw new Error('null or undefined parameter');

    const n = new Node(data, this._head);
    if (this._head !== null) this._head.updatePrevious(n);
    this._head = n;
  }

+  delete(node: INode<T>): void {
+    if (node === null || node === undefined)
+      throw new Error('null or undefined parameter');
+  }
}

export { LinkedList };
```

### Refactor
There is some duplicate code that presents an excellent chance for refactoring.

```diff
class LinkedList<T> {
  private _head: Node<T> | null = null;

+  private nullGuard(parameter: any): void {
+    if (parameter === null || parameter === undefined)
+      throw new Error('null or undefined parameter');
+  }

  head(): INode<T> | null {
    return this._head;
  }

  insert(data: T): void {
-    if (data === null || data === undefined)
-      throw new Error('null or undefined parameter');
+    this.nullGuard(data);

    const n = new Node(data, this._head);
    if (this._head !== null) this._head.updatePrevious(n);
    this._head = n;
  }

  delete(node: INode<T>): void {
-    if (node === null || node === undefined)
-      throw new Error('null or undefined parameter');
+    this.nullGuard(node);
  }
}

export { LinkedList };
```

# Finish the Implementation
There are two remaining implementation tasks:

- delete
- search

Complete the implementation strictly following the three laws of TDD. Refer back
to the requirements for implementation details. Try running the example code in
the requirements and verify the output matches. Here are a few tips to consider.

- You may need different test cases for deleting first, last, and middle
    `Node`s.
- You may need to cast `INode` to `Node` inside the `delete` method.
- Make sure to test the state of the `next` and `previous` attributes when you
    delete a node.
- You may need to modify `Node` to make `next` internally mutable the same way
    `previous` is.
- If you get stuck on implementation details, you can refer to the linked list
    in the main branch, but please only do this as a last resort.

Hopefully, the exercises instilled an instinct for the Red-Green-Refactor cycle.
TDD helps programmers break problems down into smaller, more manageable chunks.
If you get stuck, ask yourself, what's the most straightforward test I can write
to show progress? That is often enough to drive you forward. Please reach out to
Dale Alleshouse if you have any questions at all.

Once your implementation is complete, schedule a 1:1 meeting with Dale
Alleshouse to review your code.
