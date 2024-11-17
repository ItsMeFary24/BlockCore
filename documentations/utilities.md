## Built-in Utilities

BlockCore provides several utility classes for common operations: `Formatter`, `TickConverter`, and `Validator`.

### Formatter

The `Formatter` class handles text and number formatting operations.

#### Text Formatting

```typescript
import { Formatter } from "./block-core";

// Create rainbow text
const rainbow = Formatter.rainbowText("Hello World");

// Format vector coordinates
const formattedVec = Formatter.rbgVec3(vector); // "§c10 §a20 §b30"
const plainVec = Formatter.rbgVec3(vector, true); // "10 20 30"
```

#### Number Formatting

```typescript
// Add thousands separators
Formatter.thousandsSeparator(1000000); // "1,000,000"

// Format with metric prefixes
Formatter.metricNumbers(1500); // "1.5k"
Formatter.metricNumbers(1500000); // "1.5M"
```

#### Duration Formatting

```typescript
// Convert duration string to milliseconds
Formatter.convertDuration("1h 30m"); // 5400000

// Convert milliseconds to duration string
Formatter.toDuration(5400000); // "1 hour 30 minutes"
Formatter.toDuration(5400000, { compactDuration: true }); // "1h 30m"

// Full duration with all units
Formatter.toDuration(5400000, { fullDuration: true });
```

### TickConverter

The `TickConverter` class handles game tick conversions.

```typescript
import { TickConverter } from "./block-core";

// Convert milliseconds to ticks (20 ticks per second)
const ticks = TickConverter.MsToTick(1000); // 20 ticks
```

### Validator

The `Validator` class provides type checking utilities.

#### Basic Type Checking

```typescript
import { Validator } from "./block-core";

// Basic types
Validator.isString("hello"); // true
Validator.isNumber(123); // true
Validator.isInteger(123.45); // false
Validator.isBoolean(true); // true
Validator.isObject({}); // true
Validator.isArray([]); // true
Validator.isNull(null); // true
Validator.isUndefined(undefined); // true
Validator.isError(new Error()); // true
```

#### Vector Type Checking

```typescript
// Minecraft vectors
Validator.isVector3({ x: 0, y: 0, z: 0 }); // true
Validator.isVector2({ x: 0, y: 0 }); // true
Validator.isVector(vector); // true

// BlockCore vectors
Validator.isVec3D(new Vec3D()); // true
Validator.isVec2D(new Vec2D()); // true
```

### Common Use Cases

#### Formatting Player Statistics

```typescript
// Format large numbers
const score = Formatter.metricNumbers(player.score); // "1.5k"

// Format duration played
const playTime = Formatter.toDuration(player.playTimeMs, {
  compactDuration: true,
}); // "2h 30m"
```

#### Time Conversion

```typescript
// Convert real time to game ticks
const intervalTicks = TickConverter.MsToTick(5000); // 100 ticks

// Set interval using ticks
system.runInterval(() => {
  // Run every 5 seconds
}, intervalTicks);
```

#### Type Validation

```typescript
function processVector(vec: unknown) {
  if (Validator.isVector3(vec)) {
    // Process 3D vector
  } else if (Validator.isVector2(vec)) {
    // Process 2D vector
  } else {
    throw new Error("Invalid vector");
  }
}
```

#### Complex Duration Formatting

```typescript
// Parse duration string
const duration = Formatter.convertDuration("1d 12h 30m");

// Format with options
const formatted = Formatter.toDuration(duration, {
  compactDuration: true,
  avoidDuration: ["ms", "s"], // Avoid showing milliseconds and seconds
});
```

### Notes

- Formatter supports multiple number formatting options
- Duration formatting supports various time units (y, w, d, h, m, s, ms)
- TickConverter uses Minecraft's 20 ticks per second
- Validator includes comprehensive type checking
- All utilities are static classes
- Color codes are automatically handled in text formatting
- Vector validation supports both Minecraft and BlockCore vector types
