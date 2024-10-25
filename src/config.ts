import { BlockCoreProps } from "./_Core/@types";

export const MODULE_VERSION = "1.0.1-stable";

export const BLOCK_CORE_CONFIGURATION: BlockCoreProps = {
  enable_custom_command: true,
  custom_command_prefixes: [".", ";"],

  development_mode: {
    enabled: false,
    debug_level: "both",
  },
};
