## Managing Events

BlockCore provides three types of event emitters to handle different kinds of game events: `AfterEvents`, `BeforeEvents`, and `SystemEvents`. Each emitter type handles specific event categories and provides a consistent interface for event handling.

### Event Types

#### After Events

After events are triggered after an action has occurred. They cannot be cancelled and are used for responding to events that have already happened.

```typescript
import { AfterEvents } from "./block-core";

// Listen for player join event
AfterEvents.on("plr_join", (event) => {
  // Handle player joining
});

// Listen for block break event
AfterEvents.on("plr_break_blk", (event) => {
  // Handle block breaking
});
```

#### Before Events

Before events are triggered before an action occurs. They can be cancelled to prevent the action from happening.

```typescript
import { BeforeEvents } from "./block-core";

// Listen for chat messages before they're sent
BeforeEvents.on("msg_send", (event) => {
  // Can cancel the message
  event.cancel = true;
});

// Listen for block placement before it happens
BeforeEvents.on("plr_place_blk", (event) => {
  // Handle block placement
});
```

#### System Events

System events are related to server and script functionality.

```typescript
import { SystemEvents } from "./block-core";

// Listen for script events
SystemEvents.on("script_evt_recv", (event) => {
  // Handle script event
});

// Listen for watchdog termination
SystemEvents.on("watchdog_term", (event) => {
  // Handle termination
});
```

### Available Events

#### After Events

- Block Events

  - `blk_expl` - Block explosion
  - `btn_push` - Button push
  - `pressure_pop` - Pressure plate pop
  - `pressure_push` - Pressure plate push
  - `lever_act` - Lever action
  - `trip_wire` - Tripwire trigger

- Player Events

  - `plr_join` - Player join
  - `plr_leave` - Player leave
  - `plr_spawn` - Player spawn
  - `plr_break_blk` - Player breaks block
  - `plr_place_blk` - Player places block
  - `plr_dim_chg` - Player changes dimension
  - `plr_emote` - Player emotes
  - `plr_game_mode_chg` - Player changes game mode

- Entity Events

  - `ent_die` - Entity dies
  - `ent_spawn` - Entity spawns
  - `ent_load` - Entity loads
  - `ent_rem` - Entity removes
  - `ent_hurt` - Entity gets hurt
  - `ent_hit_blk` - Entity hits block
  - `ent_hit_ent` - Entity hits entity

- Item Events
  - `item_use` - Item use
  - `item_use_on` - Item use on block
  - `item_complete` - Item use complete
  - `item_release` - Item release
  - `item_start` - Item use start
  - `item_stop` - Item use stop

#### Before Events

- `msg_send` - Chat message send
- `eff_add` - Effect add
- `ent_rem` - Entity remove
- `expl` - Explosion
- `plr_break_blk` - Player break block
- `plr_place_blk` - Player place block
- `plr_leave` - Player leave
- `weather_chg` - Weather change

#### System Events

- `script_evt_recv` - Script event received
- `watchdog_term` - Watchdog termination

### Usage Examples

```typescript
// After Events Example
AfterEvents.on("plr_join", (event) => {
  const player = event.player;
  player.sendMessage("Welcome to the server!");
});

// Before Events Example
BeforeEvents.on("plr_break_blk", (event) => {
  if (event.block.type === "minecraft:diamond_block") {
    event.cancel = true; // Prevent diamond blocks from being broken
  }
});

// System Events Example
SystemEvents.on("script_evt_recv", (event) => {
  console.warn(`Received script event: ${event.id}`);
});
```

### Event Handler Methods

All event emitters share these common methods:

```typescript
// Register an event listener
emitter.on(eventName, callback);

// Emit an event (internal use)
emitter.emit(eventName, ...args);
```

Note: Each event type provides type safety and intellisense support when using TypeScript, ensuring you're using the correct event names and handling the appropriate event data.
