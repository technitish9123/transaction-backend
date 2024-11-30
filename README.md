# Time and Space Complexity Analysis

## **Time Complexity**

### **1. Fetching Transactions**
- Each API call retrieves transactions concurrently using `Promise.all`.
- Let:
  - \( M \): Number of APIs (e.g., Normal, ERC20, ERC1155).
  - \( N \): Total number of transactions fetched across all APIs.

Fetching all transactions takes:
\[
O(N)
\]

---

### **2. Processing Transactions**
For each transaction:
1. **Filtering**:
   - Filtering (e.g., `tokenName.includes("stETH")`) is \( O(1) \) per transaction.
2. **Deduplication**:
   - Using a `Map` for deduplication provides \( O(1) \) insertion and lookup.
3. **Transformation**:
   - Transforming each transaction into the `TransactionType` format is \( O(1) \) per transaction.

Processing \( N \) transactions takes:
\[
O(N)
\]

---

### **3. Sorting Transactions**
After deduplication, \( U \) unique transactions remain (\( U \leq N \)).

Sorting these transactions by `timestamp` takes:
\[
O(U \log U)
\]

---

### **Total Time Complexity**
Combining all steps:
\[
O(N) + O(U \log U)
\]

Since \( U \leq N \), the total time complexity simplifies to:
\[
O(N \log N)
\]

---

## **Space Complexity**

### **1. Deduplication Map**
- A `Map` stores \( U \) unique transactions.
- Each transaction entry includes:
  - A hash key (\( O(1) \)).
  - Transaction data (\( O(1) \)).

Space for the deduplication map is:
\[
O(U)
\]

---

### **2. Intermediate Results**
- Transactions are processed directly into the `Map`, minimizing the use of intermediate arrays or buffers.
- Intermediate space usage is:
\[
O(1)
\]

---

### **3. Final Output**
The output array contains \( U \) unique transactions.

Space for the output array is:
\[
O(U)
\]

---

### **Total Space Complexity**
Combining all components:
\[
O(U)
\]

---

## **Summary**

| Complexity Type   | Value            |
|--------------------|------------------|
| **Time Complexity** | \( O(N \log N) \) |
| **Space Complexity** | \( O(U) \)        |

---

## **Definitions**
- \( N \): Total number of transactions fetched from all APIs.
- \( U \): Number of unique transactions after deduplication (\( U \leq N \)).

---

## **Key Notes**
1. **Sorting dominates** the time complexity when \( U \) is large.
2. **Space efficiency** is achieved by processing transactions directly into the `Map` without intermediate arrays.
3. The algorithm is highly scalable, even with large datasets.
