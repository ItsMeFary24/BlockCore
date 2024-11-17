## Managing Chunk Zones

BlockCore provides two classes for managing chunk zones: `Chunker` for 3D chunks and `ChunkerXZ` for 2D chunks in the XZ plane. These classes help you define and manage areas in your world.

### 3D Chunks (Chunker)

The `Chunker` class manages three-dimensional zones defined by start and end positions.

#### Basic Usage

```typescript
import { Chunker } from "./block-core";

// Create a new 3D chunk
const chunk = new Chunker(
  { x: 0, y: 0, z: 0 }, // Start position
  { x: 16, y: 256, z: 16 }, // End position
);

// Check if a position is inside the chunk
const isInside = chunk.isInsideOfChunk({ x: 8, y: 64, z: 8 }); // true

// Check if chunks overlap
const otherChunk = new Chunker(
  { x: 10, y: 0, z: 10 },
  { x: 26, y: 256, z: 26 },
);
const isOverlapping = chunk.isOverlapping(otherChunk); // true
```

#### Methods

- `isInsideOfChunk(pos: ChunkerPos): boolean`

  - Checks if a position is within the chunk boundaries
  - Position must have x, y, and z coordinates

- `isOverlapping(other: Chunker): boolean`

  - Checks if this chunk overlaps with another chunk
  - Returns true if any part of the chunks intersect

- `getData: { s_pos: ChunkerPos, e_pos: ChunkerPos }`
  - Gets the chunk's start and end positions

### 2D Chunks (ChunkerXZ)

The `ChunkerXZ` class manages two-dimensional zones in the XZ plane, useful for defining areas regardless of height.

#### Basic Usage

```typescript
import { ChunkerXZ } from "./block-core";

// Create a new 2D chunk
const chunk = new ChunkerXZ(
  { x: 0, z: 0 }, // Start position
  { x: 16, z: 16 }, // End position
);

// Check if a position is inside the chunk
const isInside = chunk.isInsideOfChunk({ x: 8, z: 8 }); // true

// Check if chunks overlap
const otherChunk = new ChunkerXZ({ x: 10, z: 10 }, { x: 26, z: 26 });
const isOverlapping = chunk.isOverlapping(otherChunk); // true
```

#### Methods

- `isInsideOfChunk(pos: ChunkerPosXZ): boolean`

  - Checks if a position is within the chunk boundaries
  - Position only needs x and z coordinates

- `isOverlapping(other: ChunkerXZ): boolean`

  - Checks if this chunk overlaps with another chunk
  - Returns true if any part of the chunks intersect

- `getData: { s_pos: ChunkerPosXZ, e_pos: ChunkerPosXZ }`
  - Gets the chunk's start and end positions

### Type Definitions

```typescript
interface ChunkerPos {
  x: number;
  y: number;
  z: number;
}

interface ChunkerPosXZ {
  x: number;
  z: number;
}
```

### Common Use Cases

1. Defining Protected Areas

```typescript
const spawnProtection = new ChunkerXZ({ x: -100, z: -100 }, { x: 100, z: 100 });

// Check if player is in protected area
const isProtected = spawnProtection.isInsideOfChunk(playerPosition);
```

2. Creating Building Zones

```typescript
const buildingZone = new Chunker(
  { x: 0, y: 0, z: 0 },
  { x: 100, y: 256, z: 100 },
);

// Check if block placement is allowed
const canBuild = buildingZone.isInsideOfChunk(blockPosition);
```

3. Detecting Zone Conflicts

```typescript
const zone1 = new ChunkerXZ({ x: 0, z: 0 }, { x: 50, z: 50 });
const zone2 = new ChunkerXZ({ x: 40, z: 40 }, { x: 90, z: 90 });

// Check if zones overlap
const hasConflict = zone1.isOverlapping(zone2);
```

### Notes

- Coordinates can be provided in any order - the system automatically determines min/max values
- Both classes handle coordinate calculations efficiently
- Useful for defining protection zones, build areas, or any other spatial boundaries
- ChunkerXZ is more performant when Y-axis checks aren't needed
