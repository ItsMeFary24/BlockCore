## Creating Custom Commands

BlockCore provides a powerful command builder and register system that allows you to create custom commands with ease. This guide will walk you through the process of creating a custom command using BlockCore.

### CommandBuilder

The main class for building and managing custom commands.

#### Methods

- `Build(command: CommandBuilder): void`

  Builds and registers a new command.

  | Parameter           | Type              | Description                                    |
  | ------------------- | ----------------- | ---------------------------------------------- |
  | `options.register`  | `CommandRegister` | The command registration configuration         |
  | `options.onExecute` | `Function`        | Callback function executed when command is run |

### CommandRegister

Class for configuring command properties.

#### Methods

- `setName(name: string): CommandRegister`

  Sets the command name.

- `setDescription(desc: string): CommandRegister`

  Sets the command description. Defaults to "No Description."

- `setCategory(cname: string): CommandRegister`

  Sets the command category. Defaults to "Global"

- `setPerms(perms: string[]): CommandRegister`

  Sets required permissions tags.

- `setAliases(alias: string[]): CommandRegister`

  Sets alternative command names.

- `setUsage(usage: string[]): CommandRegister`

  Sets command usage instructions.

- `setExample(eg: string[]): CommandRegister`

  Sets example command usages.

- `setInputs(inputs: InputTypes): CommandRegister`

  Sets expected input types for command arguments.

  ```typescript
  type InputTypes = {
    [argumentIndex: number]: ("string" | "boolean" | "number" | "playername")[];
  };
  ```

  Input type `playername` is a special type that only accepts player names starting with "@".

#### `onExecute` Callback Properties

The callback function receives an object with these properties:

| Property      | Type          | Description                          |
| ------------- | ------------- | ------------------------------------ |
| `sender`      | `PlayerActor` | The player who executed the command  |
| `getInput`    | `Function`    | Gets parsed input at specified index |
| `core_config` | `Object`      | Access to core configuration         |
| `logger`      | `Logger`      | Logger instance for debugging        |

Example usage:

```typescript
CommandBuilder.Build({
  register: new CommandRegister()
    .setName("example")
    .setInputs({ 0: ["string"] }),
  onExecute: ({ sender, getInput }) => {
    const first_input = getInput(0); // Get first argument
    const player = sender.unwrap();
    player.sendMessage(`Got input: ${first_input}`);
  },
});
```

Note: The `CommandBuilder` class provides a convenient way to create and register custom commands, while the `CommandRegister` class allows you to configure the command properties.
