## Creating Vectors

BlockCore provides two vector classes for handling 2D and 3D vector operations: `Vec2D` and `Vec3D`.

### 3D Vector (Vec3D)

The `Vec3D` class handles three-dimensional vector operations with x, y, and z components.

#### Basic Usage

```typescript
import { Vec3D } from "./block-core";

// Create a new 3D vector
const vector = new Vec3D(1, 2, 3);

// Basic operations
const v1 = new Vec3D(1, 0, 1);
const v2 = new Vec3D(0, 1, 0);

const sum = v1.add(v2); // Vec3D(1, 1, 1)
const diff = v1.subtract(v2); // Vec3D(1, -1, 1)
const scaled = v1.multiply(2); // Vec3D(2, 0, 2)
```

#### Available Methods

- **Basic Operations**

  ```typescript
  // Clone vector
  vector.clone(): Vec3D

  // Vector arithmetic
  vector.add(v: Vec3D): Vec3D
  vector.subtract(v: Vec3D): Vec3D
  vector.multiply(scalar: number): Vec3D
  vector.divide(scalar: number): Vec3D

  // Vector products
  vector.dot(v: Vec3D): number
  vector.cross(v: Vec3D): Vec3D

  // Vector properties
  vector.magnitude(): number
  vector.normalize(): Vec3D
  vector.distanceTo(v: Vec3D): number

  // Comparison
  vector.equals(v: Vec3D): boolean
  vector.toString(): string
  ```

### 2D Vector (Vec2D)

The `Vec2D` class handles two-dimensional vector operations with x and z components (useful for horizontal plane calculations).

#### Basic Usage

```typescript
import { Vec2D } from "./block-core";

// Create a new 2D vector
const vector = new Vec2D(1, 2);

// Basic operations
const v1 = new Vec2D(1, 0);
const v2 = new Vec2D(0, 1);

const sum = v1.add(v2); // Vec2D(1, 1)
const diff = v1.subtract(v2); // Vec2D(1, -1)
const scaled = v1.multiply(2); // Vec2D(2, 0)
```

#### Available Methods

- **Basic Operations**

  ```typescript
  // Clone vector
  vector.clone(): Vec2D

  // Vector arithmetic
  vector.add(v: Vec2D): Vec2D
  vector.subtract(v: Vec2D): Vec2D
  vector.multiply(scalar: number): Vec2D
  vector.divide(scalar: number): Vec2D

  // Vector products
  vector.dot(v: Vec2D): number

  // Vector properties
  vector.magnitude(): number
  vector.normalize(): Vec2D
  vector.distanceTo(v: Vec2D): number

  // Comparison
  vector.equals(v: Vec2D): boolean
  vector.toString(): string
  ```

### Common Use Cases

#### Player Movement

```typescript
import { Vec3D } from "./block-core";

// Calculate movement vector
const playerPos = new Vec3D(
  player.location.x,
  player.location.y,
  player.location.z,
);
const targetPos = new Vec3D(target.x, target.y, target.z);
const direction = targetPos.subtract(playerPos).normalize();
```

#### Distance Calculations

```typescript
import { Vec2D } from "./block-core";

// Calculate horizontal distance between points
const pos1 = new Vec2D(x1, z1);
const pos2 = new Vec2D(x2, z2);
const distance = pos1.distanceTo(pos2);
```

#### Vector Operations

```typescript
import { Vec3D } from "./block-core";

// Cross product for normal calculation
const v1 = new Vec3D(1, 0, 0);
const v2 = new Vec3D(0, 1, 0);
const normal = v1.cross(v2); // Vec3D(0, 0, 1)

// Dot product for angle calculation
const dot = v1.dot(v2); // 0
```

### Error Handling

Both vector classes include error handling for common issues:

```typescript
// Division by zero
const vector = new Vec3D(1, 1, 1);
vector.divide(0); // Logs error and returns original vector

// Normalizing zero vector
const zeroVector = new Vec3D(0, 0, 0);
zeroVector.normalize(); // Logs error and returns original vector
```

### Notes

- All operations return new vector instances (immutable operations)
- Both classes include comprehensive error checking
- Vec2D uses x and z coordinates for horizontal plane calculations
- Method chaining is supported for most operations
- All methods are optimized for performance
