## Managing Process Intervals

BlockCore provides an `Interval` class that offers various methods for managing timed operations and process scheduling.

### Basic Usage

```typescript
import { Interval } from "./block-core";

// Run on next tick
Interval.RunNextTick(() => {
  console.log("Running on next tick");
});

// Run every second
const intervalId = Interval.SetInterval(() => {
  console.log("Running every second");
}, 1000);

// Run after 2 seconds
Interval.SetTimeout(() => {
  console.log("Running after delay");
}, 2000);
```

### Available Methods

#### Run Next Tick

Executes a function on the next game tick.

```typescript
const tickId = Interval.RunNextTick(() => {
  // Code to run on next tick
});
```

#### Set Interval

Runs a function repeatedly at specified intervals.

```typescript
const intervalId = Interval.SetInterval(() => {
  // Code to run repeatedly
}, 1000); // Runs every 1000ms (1 second)
```

#### Set Timeout

Runs a function after a specified delay.

```typescript
const timeoutId = Interval.SetTimeout(() => {
  // Code to run after delay
}, 2000); // Runs after 2000ms (2 seconds)
```

#### Always

Runs a function continuously on every tick.

```typescript
const alwaysId = Interval.Always(() => {
  // Code to run every tick
});
```

#### Clear Interval

Stops a running interval or timeout.

```typescript
Interval.ClearInterval(intervalId);
```

#### Sleep

Pauses execution for a specified duration.

```typescript
await Interval.Sleep(1000); // Pauses for 1 second
console.log("Continued after sleep");
```

#### Wait Next Tick

Waits for the next game tick before continuing.

```typescript
await Interval.WaitNextTick();
console.log("Continued on next tick");
```

### Common Use Cases

#### Delayed Actions

```typescript
// Delayed teleport
Interval.SetTimeout(() => {
  player.teleport(destination);
}, 3000);
```

#### Repeating Tasks

```typescript
// Score update every 5 seconds
Interval.SetInterval(() => {
  updateScoreboard();
}, 5000);
```

#### Sequential Operations

```typescript
async function sequence() {
  console.log("Start");
  await Interval.Sleep(1000);
  console.log("After 1 second");
  await Interval.Sleep(1000);
  console.log("After 2 seconds");
}
```

#### Continuous Monitoring

```typescript
Interval.Always(() => {
  checkPlayerPositions();
});
```

### Async/Await Usage

```typescript
async function gameSequence() {
  // Wait for next tick
  await Interval.WaitNextTick();

  // Do something
  performAction();

  // Wait 2 seconds
  await Interval.Sleep(2000);

  // Continue sequence
  completeAction();
}
```

### Notes

- All time values are in milliseconds
- Intervals are automatically converted to game ticks
- Each scheduled task returns a unique ID
- IDs can be used to clear intervals/timeouts
- `Always()` runs every tick without delay
- Async methods return promises
- Tasks can be cancelled using `ClearInterval()`
- Methods are optimized for game performance
