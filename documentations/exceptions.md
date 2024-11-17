## Creating Custom Exceptions

BlockCore provides an `Exception` class for creating and throwing custom exceptions with enhanced functionality.

### Basic Usage

```typescript
import { Exception } from "./block-core";

// Throw a basic error
Exception.Build("Something went wrong");

// Throw an error with additional options
Exception.Build("Invalid operation", {
  code: "ERR_INVALID_OP",
  cause: "User input validation failed",
});

// Throw an error with context
Exception.BuildWithContext("Process failed", {
  userId: 123,
  operation: "save",
  timestamp: Date.now(),
});
```

### Exception Types

The system supports four types of exceptions:

- `Error` (default)
- `TypeError`
- `SyntaxError`
- `ReferenceError`

```typescript
// Throwing different types of errors
Exception.Build("Type mismatch", {}, "TypeError");
Exception.Build("Invalid syntax", {}, "SyntaxError");
Exception.Build("Undefined reference", {}, "ReferenceError");
```

### Building Exceptions

#### Basic Exception

```typescript
Exception.Build(
    message: string,
    options?: {
        cause?: unknown,
        code?: string,
        skip_stack?: number
    },
    type?: ExceptionType
);
```

#### Exception with Context

```typescript
Exception.BuildWithContext(
    message: string,
    context: Record<string, unknown>,
    type?: ExceptionType
);
```

### Advanced Usage

#### With Error Code

```typescript
try {
  Exception.Build("Database connection failed", {
    code: "ERR_DB_CONN",
    cause: "Connection timeout",
  });
} catch (error) {
  console.log(error.code); // "ERR_DB_CONN"
}
```

#### With Stack Trace Control

```typescript
Exception.Build("Process failed", {
  skip_stack: 2, // Skip first 2 stack frames
});
```

#### With Detailed Context

```typescript
Exception.BuildWithContext("User validation failed", {
  userId: "123",
  requestData: {
    email: "user@example.com",
    timestamp: Date.now(),
  },
  validationErrors: ["Invalid email format"],
});
```

### Common Use Cases

#### Input Validation

```typescript
function validateUser(user: unknown) {
  if (!user) {
    Exception.Build(
      "User object is required",
      {
        code: "ERR_INVALID_INPUT",
      },
      "TypeError",
    );
  }
}
```

#### API Error Handling

```typescript
async function apiRequest() {
  try {
    // API call
  } catch (error) {
    Exception.BuildWithContext("API request failed", {
      endpoint: "/users",
      method: "GET",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
}
```

#### System Errors

```typescript
function initializeSystem() {
  if (!config.isValid) {
    Exception.Build("System initialization failed", {
      cause: "Invalid configuration",
      code: "ERR_INIT_FAILED",
    });
  }
}
```

### Error Output Examples

Basic Error:

```
Error: Something went wrong
```

Error with Context:

```
Error: Process failed
Context:
{
  "userId": 123,
  "operation": "save",
  "timestamp": 1634567890123
}
```

### Notes

- All exceptions are thrown using `never` type for better TypeScript integration
- Stack traces are automatically captured and can be modified
- Context is formatted as pretty-printed JSON
- Custom error codes can be added for better error handling
- Supports cause chaining for error tracking
- Stack trace manipulation available through `skip_stack` option
