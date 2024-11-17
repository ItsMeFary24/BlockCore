## Binary Operator

BlockCore provides a `Binary` class that implements basic arithmetic operations using bitwise operations. These implementations are useful for understanding binary arithmetic or in scenarios where traditional arithmetic operations aren't preferred.

### Available Operations

#### Addition (ADDER)

Adds two numbers using binary operations.

```typescript
import { Binary } from "./block-core";

const sum = Binary.ADDER(5, 3); // Returns 8
```

How it works:

1. Uses bitwise AND (&) to find carry bits
2. Uses bitwise XOR (^) for addition without carry
3. Shifts carry left by 1 position
4. Repeats until no carry remains

#### Subtraction (SUBTRACTER)

Subtracts one number from another using binary operations.

```typescript
import { Binary } from "./block-core";

const difference = Binary.SUBTRACTER(10, 3); // Returns 7
```

How it works:

1. Uses bitwise NOT (~) and AND (&) to find borrow bits
2. Uses bitwise XOR (^) for subtraction without borrow
3. Shifts borrow left by 1 position
4. Repeats until no borrow remains

#### Division (DIVIDER)

Performs integer division using binary operations.

```typescript
import { Binary } from "./block-core";

const quotient = Binary.DIVIDER(15, 3); // Returns 5
```

How it works:

1. Implements long division algorithm in binary
2. Uses 31-bit precision
3. Processes bits from most significant to least significant
4. Builds quotient bit by bit

#### Multiplication (MULTIPLER)

Multiplies two numbers using binary operations.

```typescript
import { Binary } from "./block-core";

const product = Binary.MULTIPLER(4, 3); // Returns 12
```

How it works:

1. Optimizes by swapping operands if needed
2. Uses Russian Peasant multiplication algorithm
3. Repeatedly shifts and adds based on bits
4. Accumulates partial products

### Usage Examples

```typescript
import { Binary } from "./block-core";

// Addition
const sum = Binary.ADDER(25, 17);
console.log(sum); // 42

// Subtraction
const difference = Binary.SUBTRACTER(100, 45);
console.log(difference); // 55

// Division
const quotient = Binary.DIVIDER(156, 12);
console.log(quotient); // 13

// Multiplication
const product = Binary.MULTIPLER(23, 7);
console.log(product); // 161
```

### Notes

- All operations work with integer values
- Division returns only the quotient (no remainder)
- Operations may have different performance characteristics compared to native arithmetic
- Best used for educational purposes or specific binary arithmetic needs
- All methods are static and can be called directly from the Binary class

### Implementation Details

Each operation is implemented using only bitwise operators:

- `&` (AND)
- `|` (OR)
- `^` (XOR)
- `~` (NOT)
- `<<` (Left shift)
- `>>` (Right shift)

This makes them interesting examples of how arithmetic can be performed at the binary level without using traditional arithmetic operators.
