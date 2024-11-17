## Creating Databases and Collections

BlockCore provides two powerful data management systems: `DynamicDB` for persistent storage and `Collection` for in-memory data management.

### Dynamic Database (DynamicDB)

`DynamicDB` allows you to store persistent data associated with World, Entity, or Player objects.

#### Basic Usage

```typescript
import { DynamicDB } from "./block-core";

// Create a database for a player
const playerDB = new DynamicDB(player);

// Store data
playerDB.set("stats", {
  coins: 100,
  level: 5,
});

// Retrieve data
const stats = playerDB.get("stats");
console.log(stats.coins); // 100

// Update existing data
playerDB.push("stats", {
  coins: 150,
});
```

#### Methods

- **Basic Operations**

  ```typescript
  // Set data
  db.set(key: string, data: object): boolean

  // Get data
  db.get(key: string): object | undefined

  // Delete data
  db.delete(key: string): boolean

  // Check if key exists
  db.hasKey(key: string): boolean

  // Update existing data
  db.push(key: string, data: object): boolean
  ```

- **Database Management**

  ```typescript
  // Reset entire database
  db.reset(): void

  // Get storage usage in bytes
  db.bytes: number

  // Get all keys
  db.keys: string[]
  ```

- **Iteration Methods**

  ```typescript
  // Iterate through entries
  for (const [key, value] of db.entries()) {
    console.log(key, value);
  }

  // Iterate through values
  for (const value of db.values()) {
    console.log(value);
  }

  // Find specific data
  db.find((value, key) => value.coins > 100);

  // Execute function for each entry
  db.forEach((value, key) => {
    console.log(key, value);
  });
  ```

### Collection System

`Collection` extends JavaScript's Map with additional indexing and search capabilities.

#### Basic Usage

```typescript
import { Collection } from "./block-core";

// Create a typed collection
const users = new Collection<
  string,
  {
    id: string;
    name: string;
    score: number;
  }
>();

// Add items
users.set("user1", {
  id: "user1",
  name: "Alice",
  score: 100,
});

// Find by indexed property
const user = users.findIndexed("name", "Alice");

// Find using custom function
const highScoreUser = users.find((user) => user.score > 90);
```

#### Methods

- **Basic Operations**

  ```typescript
  // Set value
  collection.set(key, value);

  // Get value
  collection.get(key);

  // Delete value
  collection.delete(key);
  ```

- **Advanced Search**

  ```typescript
  // Find by indexed property
  collection.findIndexed(propertyName, value);

  // Find using custom function
  collection.find((value, key) => boolean);
  ```

### Examples

#### Player Statistics System

```typescript
// Create player database
const playerStats = new DynamicDB(player);

// Initialize stats
playerStats.set("stats", {
  coins: 0,
  kills: 0,
  deaths: 0,
});

// Update stats
playerStats.push("stats", {
  coins: playerStats.get("stats").coins + 10,
});
```

#### In-Memory Cache System

```typescript
const cache = new Collection<
  string,
  {
    key: string;
    data: any;
    timestamp: number;
  }
>();

// Add cached item
cache.set("user1", {
  key: "user1",
  data: { name: "Alice" },
  timestamp: Date.now(),
});

// Find expired cache items
const expired = cache.find((item) => Date.now() - item.timestamp > 3600000);
```

#### Combined Usage

```typescript
// Database for persistent storage
const db = new DynamicDB(world);

// Collection for active sessions
const sessions = new Collection<
  string,
  {
    id: string;
    player: string;
    lastActive: number;
  }
>();

// Save session to persistent storage
sessions.forEach((session, id) => {
  db.push("sessions", {
    [id]: session,
  });
});
```

### Notes

- DynamicDB data is persistent across game sessions
- Collection data exists only in memory
- Both systems support complex data structures
- Use DynamicDB for long-term storage
- Use Collection for temporary or indexed data
- Both systems provide type safety when using TypeScript
