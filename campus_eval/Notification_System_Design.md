# Stage 1

## Objective
Maintain the top 'n' (e.g., 10) priority notifications efficiently as new notifications stream in over time, based on weight (`Placement` > `Result` > `Event`) and `recency` (Timestamp).

## Approach

A naive approach would be to add all incoming notifications to an array and sort the entire array every time we need the top 10. However, this is extremely inefficient (O(N log N) where N is the total number of notifications ever received). 

The optimal approach is to use a **Min-Heap (Priority Queue)** of a fixed size `n`.

### Step-by-Step Implementation:

1. **Define Priority Logic**: 
   Create a comparison function that determines which of two notifications is "less important".
   - First, compare by weight (Placement=3, Result=2, Event=1).
   - If weights are equal, compare by timestamp (older is less important).

2. **Initialize Min-Heap**:
   Maintain a Min-Heap data structure that holds exactly `n` (e.g., 10) notifications. The Min-Heap will be ordered such that the *least important* notification among the top 10 is always at the root of the heap.

3. **Processing New Notifications**:
   As a new notification streams in:
   - **If the heap size < n**: Simply insert the new notification into the heap.
   - **If the heap size == n**: Compare the new notification with the root of the heap.
     - If the new notification is *more important* than the root, extract the root (remove it from the heap) and insert the new notification.
     - If the new notification is *less important* than the root, discard it (it doesn't make the top 10).

### Time Complexity
- **Insertion**: Inserting into a heap of size `n` takes O(log n) time.
- Since `n` is a small constant (e.g., 10), the time to process each incoming notification is effectively **O(1)**.
- Maintaining the top 10 across a stream of `M` notifications will take **O(M log n)**, which is vastly superior to the O(M log M) required for sorting the entire set.

### Space Complexity
- The space complexity is **O(n)** because the heap only ever stores exactly `n` items at a time, preventing memory exhaustion even if millions of notifications stream in.
