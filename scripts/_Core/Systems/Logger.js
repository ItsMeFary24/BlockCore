import { world } from "@minecraft/server";
import { BLOCK_CORE_CONFIGURATION } from "../../config";
/**
 * A class for logging messages with different severity levels.
 */
export class Logger {
    _printType;
    /**
     * Creates an instance of the Logger class.
     * @param { LoggerPrintType } printType - The type of output for the logger (console, game, or both).
     */
    constructor(printType) {
        this._printType = printType;
    }
    /**
     * Main logging function that handles the formatting and output of log messages.
     * @param { IMainLogger } logger - An object containing the details of the log message.
     */
    Main(logger) {
        if (this._printType === "console" || this._printType === "both")
            console.warn(`${logger.status.content} [${logger.unit.content}::${logger.location.content}] : ${logger.message.endsWith(".") ? logger.message : `${logger.message}.`}`);
        if (this._printType === "game" || this._printType === "both")
            world.sendMessage(`${logger.status.color || "§f"} ${logger.status.content} §e[${logger.unit.color || "§7"}${logger.unit.content}::${logger.location.color || "§7"}${logger.location.content}§e] §f-> ${logger.message.endsWith(".") ? logger.message : `${logger.message}.`}`);
    }
    /**
     * Logs a danger message.
     * @param { LoggerProps } logger - An object containing the unit, location, and message details.
     */
    Danger(logger) {
        this.Main({
            status: {
                color: "§c",
                content: "DANGER",
            },
            unit: {
                content: logger.unit,
            },
            location: {
                content: logger.location,
            },
            message: logger.message,
        });
    }
    /**
     * Logs a warning message.
     * @param { LoggerProps } logger - An object containing the unit, location, and message details.
     */
    Warning(logger) {
        this.Main({
            status: {
                color: "§e",
                content: "WARNING",
            },
            unit: {
                content: logger.unit,
            },
            location: {
                content: logger.location,
            },
            message: logger.message,
        });
    }
    /**
     * Logs an informational message.
     * @param { LoggerProps } logger - An object containing the unit, location, and message details.
     */
    Info(logger) {
        this.Main({
            status: {
                color: "§b",
                content: "INFO",
            },
            unit: {
                content: logger.unit,
            },
            location: {
                content: logger.location,
            },
            message: logger.message,
        });
    }
    /**
     * Creates a logger instance in development mode.
     * @returns A Logger instance if development mode is enabled, otherwise undefined.
     */
    static DevMode() {
        if (!BLOCK_CORE_CONFIGURATION.development_mode.enabled)
            return;
        return new this(BLOCK_CORE_CONFIGURATION.development_mode.debug_level);
    }
}
