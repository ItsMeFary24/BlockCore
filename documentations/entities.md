## Manipulating Entities and Players## Manipulating Entities and Players

BlockCore provides two main classes for handling entities and players: `EntityActor` and `PlayerActor`. These classes offer convenient methods for manipulating and interacting with entities in the game.

### EntityActor

The `EntityActor` class provides basic functionality for all entities.

#### Tag Management

```typescript
// Check if entity has a tag
entity.hasTag(tagName: string): boolean

// Get all tags
entity.getTags(): string[]

// Add a single tag
entity.addTag(tagName: string): boolean

// Add multiple tags
entity.addTags(tagNames: string[]): boolean[]

// Remove a single tag
entity.removeTag(tagName: string): boolean

// Remove multiple tags
entity.removeTags(tagNames: string[]): boolean[]

// Filter tags
entity.filterTag(filter: (tag: string) => boolean): string[]

// Check if entity has tag starting with prefix
entity.hasTagStartingWith(prefix: string): boolean
```

#### Health Management

```typescript
// Get current health
entity.getHealth(): number

// Set health value
entity.setHealth(value: number): void

// Reset health to maximum
entity.resetHealth(): void
```

#### Command Execution

```typescript
// Run a single command
entity.runCommand(command: string, asAsync: boolean = false): CommandResult | Promise<CommandResult>

// Run multiple commands
entity.runCommands(commands: string[], asAsync: boolean = false): (CommandResult | Promise<CommandResult>)[]
```

#### Component Management

```typescript
// Get specific component
entity.getComponent(componentName: string)

// Get all components
entity.getComponents()

// Check if has component
entity.hasComponent(componentName: string): boolean
```

#### Entity Conditions

```typescript
// Check entity condition
entity.checkCondition(query: "falling" | "in_water" | "climbing" | "on_ground" | "sleeping" | "sneaking" | "swimming" | "sprinting"): boolean
```

### PlayerActor

The `PlayerActor` class extends `EntityActor` and provides additional player-specific functionality.

#### Player Information

```typescript
// Get player name
player.getName(): string

// Get/Set player name tag
player.getNameTag(): string
player.setNameTag(name: string): void

// Get player ID
player.getId(): string
```

#### Device Information

```typescript
// Get device type
player.getDevice(): PlatformType

// Check device type
player.isMobile: boolean
player.isDesktop: boolean
player.isConsole: boolean
```

#### Inventory Management

```typescript
// Get empty slots count
player.getEmptySlotsCount(): number

// Add item to inventory
player.addItem(item: ItemStack): void
```

#### Player Conditions

```typescript
// Check player condition
player.checkCondition(query: "flying" | "emoting" | "falling" | "gliding" | "in_water" | "jumping" | "climbing" | "on_ground" | "sleeping" | "sneaking" | "swimming" | "sprinting"): boolean
```

### Common Usage Examples

```typescript
// Tag management
player.addTag("vip");
player.addTags(["role:admin", "premium"]);
player.hasTag("vip"); // true

// Health manipulation
player.setHealth(20);
player.resetHealth();

// Command execution
player.runCommand("say Hello!");
player.runCommands(["effect @s speed 20 1", "gamemode c"]);

// Check conditions
player.checkCondition("sneaking");
player.checkCondition("swimming");

// Inventory
player.getEmptySlotsCount();
player.addItem(new ItemStack("minecraft:diamond"));
```

Note: Both `EntityActor` and `PlayerActor` provide an `unwrap()` method to access the underlying Minecraft API entity/player object if needed.
