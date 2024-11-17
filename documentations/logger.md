## Development Logger

BlockCore provides a robust logging system through the `Logger` class, designed for development and debugging purposes.

### Basic Usage

```typescript
import { Logger } from "./block-core";

// Create a logger instance
const logger = new Logger("both"); // Outputs to both console and game

// Log different types of messages
logger.Info({
  unit: "PlayerSystem",
  location: "onJoin",
  message: "Player joined the game",
});

logger.Success({
  unit: "Database",
  location: "save",
  message: "Data saved successfully",
});
```

### Log Types

#### Info Messages

For general information.

```typescript
logger.Info({
  unit: "System",
  location: "init",
  message: "System initialized",
});
```

#### Success Messages

For successful operations.

```typescript
logger.Success({
  unit: "Command",
  location: "execute",
  message: "Command executed successfully",
});
```

#### Warning Messages

For potential issues.

```typescript
logger.Warning({
  unit: "Network",
  location: "connect",
  message: "Connection unstable",
});
```

#### Danger Messages

For errors and critical issues.

```typescript
logger.Danger({
  unit: "FileSystem",
  location: "read",
  message: "Failed to read file",
});
```

### Output Types

The logger supports three output types:

- `"console"` - Logs to console only
- `"game"` - Logs to game chat only
- `"both"` - Logs to both console and game chat

```typescript
// Console only logger
const consoleLogger = new Logger("console");

// Game chat only logger
const gameLogger = new Logger("game");

// Both outputs logger
const bothLogger = new Logger("both");
```

### Development Mode Logger

A special static method for development-only logging:

```typescript
// Only logs if development mode is enabled in config
// Can return undefined if development mode is disabled
Logger.DevMode()?.Info({
  unit: "Debug",
  location: "test",
  message: "Debug message",
});
```

### Message Format

Log messages follow this format:

```
[STATUS] [Unit::Location] -> Message
```

Example outputs:

```
SUCCESS [Database::Save] -> Data saved successfully.
DANGER [Network::Connect] -> Connection failed.
INFO [System::Init] -> Loading complete.
WARNING [Cache::Update] -> Cache size exceeding limit.
```

### Common Use Cases

#### System Initialization

```typescript
const logger = new Logger("both");

logger.Info({
  unit: "System",
  location: "startup",
  message: "Initializing systems",
});

// After initialization
logger.Success({
  unit: "System",
  location: "startup",
  message: "All systems initialized",
});
```

#### Error Handling

```typescript
try {
  // Some operation
} catch (error) {
  logger.Danger({
    unit: "ErrorHandler",
    location: "processOperation",
    message: `Operation failed: ${error.message}`,
  });
}
```

#### Development Debugging

```typescript
Logger.DevMode()?.Info({
  unit: "Debug",
  location: "playerMove",
  message: `Player position: ${x}, ${y}, ${z}`,
});
```

### Configuration

The logger's behavior can be configured in your BlockCore configuration:

```typescript
development_mode: {
    enabled: true,
    debug_level: "both" // "console" | "game" | "both"
}
```

### Notes

- Colors are automatically handled for game chat output
- Console output strips color codes
- Messages are automatically formatted with proper punctuation
- Development mode logger only works when enabled in config
- Each log type uses appropriate console methods (info, warn, error)
- Logging is synchronous and thread-safe
