<div align="center">
  <img src="https://i.imgur.com/SC3cMPU_d.webp?maxwidth=760&fidelity=grand" alt="Thumbnail">

![Module Version](https://img.shields.io/badge/1.1.0-none?color=142336&style=for-the-badge&label=Stable&labelColor=142336)
![Space](https://img.shields.io/badge/·-none?color=142336&style=for-the-badge)
![Minecraft Version](https://img.shields.io/badge/1.21.40-none?color=142336&style=for-the-badge&label=Minecraft&labelColor=142336)

  <p align="center">
    <strong>BlockCore</strong> is a powerful script wrapper for the Bedrock Scripting API. This wrapper helps you maintain clean code and simplifies interactions with the Bedrock Scripting API. It includes a variety of classes, managers, and utilities for your development needs.
    </br>
    </br>
    <a href="https://github.com/VoxlDevv/BlockCore">View Repository </a>
    ·
    <a href="https://github.com/VoxlDevv/BlockCore/issues">Report a Bug</a>
    ·
    <a href="https://github.com/VoxlDevv/BlockCore/issues">Request a Feature</a>

  </p>

---

[![MIT License](https://img.shields.io/github/license/VoxlDevv/BlockCore?style=for-the-badge&color=2E4F4F&labelColor=2E4F4F)](LICENSE)
[![Discord Server](https://img.shields.io/discord/1125432627382460498?color=1A4870&label=Discord&labelColor=1A4870&style=for-the-badge)](https://discord.gg/ffZHPHRBhY)
[![GitHub Releases](https://img.shields.io/github/downloads/VoxlDevv/BlockCore/total?style=for-the-badge&color=FF6363&labelColor=FF6363)](https://github.com/VoxlDevv/BlockCore/releases/latest)

---

</div>

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Development](#development)
- [Plugin Example](#plugin-example)
- [Configuration](#configuration)
- [Commands](#commands)
- [License](#license)

---

# Looking for documentation? Check out the [documentation](./documentations/list.md) folder.

---

## Installation

To install the BlockCore addon, follow these steps:

1. **Download the Repository**:
   Download the repository as a ZIP file.

2. **Extract the ZIP File**:
   Extract the contents of the downloaded ZIP file and copy the extracted folder.

3. **Navigate to the Minecraft Bedrock Directory**:
   Open your Minecraft Bedrock installation directory.

4. **Locate the `development_behavior_pack` Folder**:
   Find the `development_behavior_pack` folder within the Minecraft directory and paste the copied folder inside it.

---

## Usage

To use the BlockCore addon, follow these steps:

1. **Create a New World or Edit an Existing World**:
   You can either create a new world or modify an existing one.

2. **Access the Experimental Menu**:
   Navigate to the Experimental menu in the world settings:

   ![](https://i.imgur.com/MuZfNrw_d.webp?maxwidth=384&fidelity=grand)

3. **Enable the `Beta APIs`**:
   Make sure to enable the `Beta APIs` option:

   ![](https://i.imgur.com/HrogvBu.png)

**NOTE**: _If you plan to apply any scripting-related modifications to your world, please make a backup copy of your world beforehand. I am not responsible for any issues that may arise!_

---

## Features

BlockCore offers a variety of powerful features to enhance your development experience:

1. **Custom Commands**: Easily create and manage custom commands for your addon.
2. **Event Manager**: Handle events efficiently with a dedicated event management system.
3. **Form Generator (JSON-Based)**: Generate forms using a simple JSON structure for user interactions.
4. **Binary Operator**: Utilize binary operations for advanced data manipulation.
5. **Chunk Manager**: Manage chunks effectively for optimized performance in your projects.
6. **Data Collection**: Support for both database and collection data management.
7. **Vector Support (2D & 3D)**: Work with 2D and 3D vectors for spatial calculations and manipulations.
8. **Process Interval**: Control the timing of processes to ensure smooth execution.
9. **Development Logger**: Keep track of development activities and debug information with a built-in logger.
10. **Utilities**: Access a range of utility functions to simplify common tasks.

---

## Development

We highly recommend using `TypeScript` for developing the addon, as `BlockCore` is built on top of it. TypeScript provides strong typing, which helps catch errors during development and improves code quality.

### Getting Started with TypeScript

1. **Clone this repository**:

   ```bash
   git clone https://github.com/VoxlDevv/BlockCore.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd $DIR/BlockCore
   ```

   Replace `$DIR` with the path where you cloned the repository.

3. **Install dependencies**:

   You can install dependencies using either of the following package managers:

   - **NPM**:

     ```bash
     npm install
     ```

   - **Bun**:
     ```bash
     bun install
     ```

4. **Build the code**:

   You can build the project using either of the following methods:

   - **NPM**:

     ```bash
     npm run build
     ```

     For development mode, use:

     ```bash
     npm run dev
     ```

   - **Bun**:

     ```bash
     bun run build
     ```

     For development mode, use:

     ```bash
     bun run dev
     ```

Make sure you have Node.js and TypeScript installed on your machine to run the above commands successfully.

---

## Plugin Example

### Custom Command

To create a custom command, follow these steps:

1. **Create a New File**:
   Navigate to the BlockCore Plugin directory, open the **Custom Commands** folder, and create a new file named `some.ts` (or any name you prefer).

   ```typescript
   // some.ts

   import { CommandBuilder, CommandRegister } from "../block-core";

   CommandBuilder.Build({
     register: new CommandRegister().setName("some"), // Registering a new command called "some".
     onExecute: ({ sender }) => {
       // This callback is triggered when the player executes the "some" command.
       sender.sendMessage("Hello There!"); // Send a message to the player after the command is executed.
     },
   });
   ```

2. **Import the Command**:
   To make the command available in the system, import the file into the `Execute.ts` file located in the **Custom Commands** folder. Add the file entry as follows:

   ```typescript
   const command_entry = [
     // ... Existing entries

     // Add your own file entry (without file extensions)
     "./some",
   ];
   ```

By following these steps, you can successfully create and register a custom command in BlockCore.

### Custom Plugin

To create a custom plugin, follow these steps:

1. **Create a New Folder**:
   Navigate to the BlockCore Plugin directory and create a new folder named `MyPlugin` (or any name you prefer).

2. **Create an Entry File**:
   Inside your new plugin folder (e.g., `MyPlugin`), create an entry file called `Execute.ts`. You can add any necessary imports or code to this file.

3. **Register the Plugin**:
   Locate the `user_plugin_loader.ts` file in the root directory of the Plugin. To register your plugin, edit the `plugin_path_name` array as follows:

   ```typescript
   const plugin_path_name = [
     "Better Ranks",
     "Custom Commands",

     // Your Plugin
     "MyPlugin",
   ];
   ```

   This will read the folder name specified in `plugin_path_name` and execute the corresponding entry file (`Execute.ts`).

For more detailed information and documentation, please refer to the [documentation](./documentation/list.md).

---

## Configuration

You can configure the project by modifying the `config.ts` or `config.js` file. Here are some of the key configurations:

- `enable_custom_command`: Enable or disable custom commands.
- `custom_command_prefixes`: Set the prefixes for custom commands.

---

## Commands

Here are some of the available commands you can use:

- `help`: Provides a list of commands and their descriptions.
- `sethome <name>`: Sets a home location with the specified name.
- `delhome <name>`: Deletes the home location with the specified name.
- `home <name>`: Teleports to the specified home location.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
