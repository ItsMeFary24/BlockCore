# Project Overview

This project is a Minecraft Bedrock Addon that enhances gameplay by providing custom commands, form generation, and various utilities. The codebase is structured to facilitate easy management and extension of commands and forms.

# Current Version
- **Module**: 1.0.0-stable
- **Supported MC Version**: 1.21.30 

## Features

- **Custom Commands**: Allows players to execute commands with various functionalities, such as setting and teleporting to homes, viewing help information, and checking the module version.
- **Form Generation**: Provides a framework for creating and displaying different types of forms to players, including action forms, modal forms, and message forms.
- **Utilities**: Includes various utility classes for formatting, validation, and tick conversion, enhancing the overall functionality of the addon.

## Directory Structure

- `src/`: Contains the main source code for the addon.
  - `_Core/`: Core functionalities and utilities.
    - `Managers/`: Manages commands, events, and world interactions. 
    - `Operators/`: 
    - `Processors/`: Load events.
    - `Systems/`: Contains various systems like data collection and vector operations.
    - `Utilities/`: Utility classes for formatting, validation, and tick conversion.
    - `@types/`: Type definitions for TypeScript.
  - `Plugins/`: Contains custom commands and configurations.
    - `Custom Commands/`: Specific commands that players can use in the game.
    - `Better Ranks/`: Manages player ranks and their display.

## Installation

1. Clone the repository to your local machine.
2. Place the addon in the appropriate addons directory of your Minecraft Bedrock (Development Behavior Pack).
3. Done.

## Usage ( Default )

- Players can use commands prefixed with the specified command prefixes (e.g., `.`, `;`) to interact with the addon.
- Commands include:
  - `help`: Displays a list of available commands.
  - `version`: Shows the current version of the addon.
  - `sethome <name>`: Sets a home location.
  - `home <name>`: Teleports to the specified home.
  - `delhome <name>`: Deletes the specified home.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the [MIT License](./LICENSE). See the LICENSE file for more details.
