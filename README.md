# Test-Driven Development Workshop Exercises
This set of exercises aims to reinforce your understanding of the three laws of
test-driven development.

1. Write _NO production code_ except to pass a failing test.
1. Write _only enough of a test_ to demonstrate a failure.
1. Write _only enough production code_ to pass the test.

More concisely:

Red (make it fail) -> Green (make it pass) -> Refactor (make it pretty).

Done correctly, developers maintain a tight sub sixty second feedback loop. You
should feel comfortable with the concept by the end of these exercises.

The goal is to build a rudimentary, [doubly linked list](https://en.wikipedia.org/wiki/Doubly_linked_list) using TypeScript.
We will implement four methods:
- `head`: returns the first `node` in the list or `null` if no objects exist.
- `insert`: accepts a data item, generates a new `node` placing it at `head.`
- `delete`: accepts a `node` and removes it from the list by modifying its
    `next` and `previous` attributes.
- `search`: accepts a search predicate and returns the first item in the list
    that satisfies the predicate.

`node` objects hold data and have no logic. From the consumer's perspective,
they are immutable. They have three attributes:
- `data`: data passed to the linked list `insert` method.
- `next`: a pointer to the next `node` in the list.
- `previous`: a pointer to the previous `node` in the list.

Follow the instruction carefully as each step builds upon the last.

# Configure Your Environment
Find the take-home exercise GitHub repository: [here](https://github.com/growsagely/test-driven-development-exercises-intro/tree/take-home-exercises). For your convince, it has a pre-configured development container. There are two ways to access it easily: GitHub Code Spaces and using Visual Studio Code in conjunction with Docker locally. You also have the option to clone the repo and configure any editor you like (assuming you can do so without support). See the instructions below.

Once you can view the code in an editor, move to the next step.

## GitHub Code Spaces
1. Log into GitHub
1. Navigate to the [test-driven-development-exercises-intro]https://github.com/growsagely/test-driven-development-exercises-intro) repository
1. Open Codespaces
	![Codespace](./readme_img/codespace.png)

## Local Development Container
Requirements
- Git
- [Visual Studio Code](https://code.visualstudio.com/)
- [Docker](https://docs.docker.com/get-docker/)

1. Install the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) Visual Studio Code plugin.
1. Clone the exercise repository
    ``` bash
    git clone https://github.com/growsagely/test-driven-development-exercises-intro.git
    ```
1. Open the cloned folder with Visual Studio Code
1. Click the `Remote Window` button in the lower left-hand corner of the Visual Studio Code window.
   ![Open Container Window](./readme_img/open_container_window.png)
1. Select `Reopen in Container` from the select menu.
    ![Reopen in Container](./readme_img/reopen.png)
1. Be patient; the first time loading the container may take several minutes. Subsequent loads will be much faster.

# Auto-Run the Test Suite
1. Press `Ctrl+Shift+\` to open a terminal window in Visual Studio Code.
1. Type `npm run test:watch` to auto-run the test suite whenever a file changes. The terminal should display passing tests.
1. Open the file `src/__tests__/testsuite.spec.ts` file and change the code on line 3 from `expect(true).toBe(true);`  to `expect(true).toBe(false);`.
1. Verify that the terminal automatically displays a failing test.
1. Restore the test to a passing state.

# Code the Linked List
Requirements:

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
