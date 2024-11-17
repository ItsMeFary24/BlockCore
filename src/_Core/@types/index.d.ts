import { Player } from "@minecraft/server";

// Logger
export type LoggerPrintType = "console" | "game" | "both";
export type LoggerLevel = "info" | "warn" | "error";
export interface LoggerProps {
  unit: string;
  location: string;
  message: string;
}

// Config
export interface BlockCoreProps {
  enable_custom_command: boolean;
  custom_command_prefixes: string[];
  development_mode: {
    enabled: boolean;
    debug_level: "console" | "game" | "both";
  };
}

// Chunker
export interface ChunkerPos {
  x: number;
  y: number;
  z: number;
}
export interface ChunkerPosXZ {
  x: number;
  z: number;
}

// Form
export interface ActionFormContent {
  buttons: {
    label: string;
    icon?: string;
    onClick?: (player: Player) => void;
  }[];
}
export interface ModalFormContent {
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
  submitButton?: {
    label: string;
  };
  textField?: {
    label: string;
    placeholder: string;
    defaultValue?: string;
  };
  toggle?: {
    label: string;
    defaultValue?: boolean;
  };
}
export interface MessageFormContent {
  button1?: {
    label: string;
    onClick?: (player: Player) => void;
  };
  button2?: {
    label: string;
    onClick?: (player: Player) => void;
  };
}
export type Form =
  | {
      id: number;
      type: "action";
      title?: string;
      body?: string;
      content?: ActionFormContent;
    }
  | {
      id: number;
      type: "modal";
      title?: string;
      content?: ModalFormContent[];
      onSubmit?: (
        player: Player,
        formResult: {
          [key: number]: string | boolean | number | undefined;
        },
      ) => void;
    }
  | {
      id: number;
      type: "message";
      title?: string;
      body?: string;
      content?: MessageFormContent;
    }
  | {
      id: number;
      type: "player_selector";
      title?: string;
      body?: string;
      icon?: string;
      onSelect?: (player: Player, selectedPlayer: Player) => void;
    };

// Commands
export interface CommandRegisterProps {
  name?: string;
  description?: string;
  category?: "Global" | string;
  perms?: string[];
  aliases?: string[];
  usage?: string[];
  example?: string[];
  inputs?: {
    [key: number]: ("string" | "boolean" | "number" | "playername")[];
  };
}

// Exception
export type ExceptionType =
  | "SyntaxError"
  | "ReferenceError"
  | "TypeError"
  | "Error";

// Entities
export type EntityConditionQuery =
  | "falling"
  | "in_water"
  | "climbing"
  | "on_ground"
  | "sleeping"
  | "sneaking"
  | "swimming"
  | "sprinting";
export type PlayerConditionQuery =
  | "flying"
  | "emoting"
  | "falling"
  | "gliding"
  | "in_water"
  | "jumping"
  | "climbing"
  | "on_ground"
  | "sleeping"
  | "sneaking"
  | "swimming"
  | "sprinting";
