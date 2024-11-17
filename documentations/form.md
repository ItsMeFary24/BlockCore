## Creating FormUI

BlockCore provides a powerful form system through the `FormGenerator` class that allows you to create and manage different types of UI forms for players.

### Form Types

BlockCore supports four types of forms:

- Action Forms (Button-based menus)
- Modal Forms (Complex input forms)
- Message Forms (Simple two-button dialogs)
- Player Selector Forms (Player selection menus)

### Basic Usage

```typescript
import { FormGenerator } from "./block-core";

const forms = new FormGenerator();

// Register your forms
forms.setData([
  {
    id: 1,
    type: "action",
    title: "Main Menu",
    body: "Select an option:",
    content: {
      buttons: [
        {
          label: "Option 1",
          onClick: (player) => {
            player.sendMessage("Selected Option 1");
          },
        },
        {
          label: "Option 2",
          onClick: (player) => {
            player.sendMessage("Selected Option 2");
          },
        },
      ],
    },
  },
]);

// Show the form to a player
forms.show(player, 1);
```

### Form Types and Properties

#### Action Form

Button-based menu with multiple options.

```typescript
{
  id: number;
  type: "action";
  title?: string;
  body?: string;
  content?: {
    buttons: {
      label: string;
      icon?: string;
      onClick: (player: Player) => void;
    }[];
  };
}
```

#### Modal Form

Complex form with various input types.

```typescript
{
  id: number;
  type: "modal";
  title?: string;
  content?: [
    {
      dropdown?: {
        label: string;
        data: string[];
        defaultDataIndex?: number;
      };
      slider?: {
        label: string;
        minValue: number;
        maxValue: number;
        step?: number;
        defaultValue?: number;
      };
      textField?: {
        label: string;
        placeholder?: string;
        defaultValue?: string;
      };
      toggle?: {
        label: string;
        defaultValue?: boolean;
      };
      submitButton?: {
        label: string;
      };
    }
  ];
  onSubmit?: (player: Player, formResult: {
    [key: number]: string | boolean | number | undefined;
  }) => void;
}
```

#### Message Form

Simple two-button dialog.

```typescript
{
  id: number;
  type: "message";
  title?: string;
  body?: string;
  content?: {
    button1?: {
      label: string;
      onClick: (player: Player) => void;
    };
    button2?: {
      label: string;
      onClick: (player: Player) => void;
    };
  };
}
```

#### Player Selector Form

Menu for selecting online players.

```typescript
{
  id: number;
  type: "player_selector";
  title?: string;
  body?: string;
  icon?: string;
  onSelect?: (player: Player, selectedPlayer: Player) => void;
}
```

### Examples

#### Action Form Example

```typescript
forms.setData([
  {
    id: 1,
    type: "action",
    title: "Teleport Menu",
    body: "Choose a location:",
    content: {
      buttons: [
        {
          label: "Spawn",
          onClick: (player) => {
            player.teleport(0, 64, 0);
          },
        },
        {
          label: "Shop",
          onClick: (player) => {
            player.teleport(100, 64, 100);
          },
        },
      ],
    },
  },
]);
```

#### Modal Form Example

```typescript
forms.setData([
  {
    id: 2,
    type: "modal",
    title: "Player Settings",
    content: [
      {
        toggle: {
          label: "Enable Notifications",
          defaultValue: true,
        },
      },
      {
        slider: {
          label: "View Distance",
          minValue: 0,
          maxValue: 10,
          step: 1,
          defaultValue: 5,
        },
      },
      {
        textField: {
          label: "Custom Tag",
          placeholder: "Enter your tag",
        },
      },
    ],
    onSubmit: (player, results) => {
      const notifications = results[0] as boolean;
      const viewDistance = results[1] as number;
      const customTag = results[2] as string;
      // Handle form submission
    },
  },
]);
```

#### Message Form Example

```typescript
forms.setData([
  {
    id: 3,
    type: "message",
    title: "Confirm Action",
    body: "Are you sure you want to proceed?",
    content: {
      button1: {
        label: "Yes",
        onClick: (player) => {
          player.sendMessage("Action confirmed!");
        },
      },
      button2: {
        label: "No",
        onClick: (player) => {
          player.sendMessage("Action cancelled.");
        },
      },
    },
  },
]);
```

#### Player Selector Example

```typescript
forms.setData([
  {
    id: 4,
    type: "player_selector",
    title: "Select Player",
    body: "Choose a player to teleport to:",
    onSelect: (player, selectedPlayer) => {
      player.teleport(selectedPlayer.location);
    },
  },
]);
```

#### Chaining Form Examples

```typescript
forms.setData([
  {
    id: 0,
    type: "action",
    title: "Main Menu",
    body: "Select an option:",
    content: {
      buttons: [
        {
          label: "Option 1",
          onClick: (player) => {
            player.sendMessage("Selected Option 1");

            // Sub trigger form
            forms.show(player, 1);
          },
        },
        {
          label: "Option 2",
          onClick: (player) => {
            player.sendMessage("Selected Option 2");

            // Sub trigger form
            forms.show(player, 1);
          },
        },
      ],
    },
  },
]);

forms.setData([
  {
    id: 1,
    type: "modal",
    title: "Player Settings",
    content: [
      {
        toggle: {
          label: "Enable Notifications",
          defaultValue: true,
        },
      },
    ],
    onSubmit: (player, results) => {
      const notifications = results[0] as boolean;
      // Handle form submission
    },
  },
]);

// Main trigger form
forms.show(player, 0);
```

### Additional Options

- `waitUntilCloseChat`: When showing a form, you can pass `true` as the third parameter to wait until the player's chat is closed before showing the form:

```typescript
forms.show(player, formId, true);
```

### Notes

- Form IDs must be unique
- Forms are displayed asynchronously
- Players can cancel forms by pressing ESC
- Use appropriate icons paths for button icons
- Handle potential undefined values in form results
