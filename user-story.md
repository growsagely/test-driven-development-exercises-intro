Title: Implement a Simple Queue Data Structure

**As a** software developer,
**I want** to create a simple queue data structure,
**So that** I can efficiently manage items in a first-in, first-out (FIFO) order.

**Acceptance Criteria:**
1. The queue should allow adding elements to the end (enqueue).
2. The queue should allow removing elements from the front (dequeue).
3. The queue should provide a way to view the front element without removing it
   (peek).
4. The queue should keep track of the number of elements it contains (size).
5. The queue should handle edge cases, such as attempting to dequeue or peek
   when the queue is empty, without causing errors.
6. The queue's performance for enqueue, dequeue, and peek operations should be
   efficient, ideally O(1) time complexity.

**Notes:**
- The implementation should be generic, allowing it to store any data type.
