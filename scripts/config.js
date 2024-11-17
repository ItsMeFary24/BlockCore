import {} from "./_Core/BCore.exports";
export const MODULE_VERSION = "1.1.0-stable";
export const BLOCK_CORE_CONFIGURATION = {
    /**
     * When enabled, it will allowed to creating custom commands
     */
    enable_custom_command: true,
    /**
     * Custom command prefixes, can be more than 2
     */
    custom_command_prefixes: [".", ";"],
    development_mode: {
        /**
         * When enabled, make sure you activate "Content Log GUI" in Creator Menu, and select the "Debug Level" to Info
         */
        enabled: true,
        /**
         * Debug Level
         * Level: "both" | "game" | "console"
         */
        debug_level: "both",
    },
};
