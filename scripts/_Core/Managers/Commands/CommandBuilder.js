import { BeforeEvents } from "../Events/BeforeEvents";
import { BLOCK_CORE_CONFIGURATION } from "../../../config";
import { CommandException } from "./CommandException";
import { Collection } from "../../Systems/DataCollection/Collection";
import { Logger } from "../../Systems/Logger";
/**
 * Represents a command builder that manages custom commands.
 */
class BuildCommand {
    _registered_properties;
    /**
     * Initializes a new instance of the BuildCommand class,
     * setting up the command properties collection and event listener.
     */
    constructor() {
        this._registered_properties = new Collection();
        BeforeEvents.on("msg_send", this.exe.bind(this));
    }
    /**
     * Finds a command by its name or alias.
     * @param { string } cmd - The command name or alias to search for.
     * @returns The command properties if found, undefined otherwise.
     */
    fnd_cmd(cmd) {
        return (this._registered_properties.get(cmd) ||
            this._registered_properties.find((val) => val.register.aliases.includes(cmd)));
    }
    /**
     * Executes the command based on the incoming chat message.
     * @param { ChatSendBeforeEvent } packets - The chat send event data.
     */
    exe(packets) {
        const { message: incoming_message, sender: packet_sender } = packets;
        const prefix_matcher = BLOCK_CORE_CONFIGURATION.custom_command_prefixes.find((prefix) => incoming_message.startsWith(prefix));
        if (!BLOCK_CORE_CONFIGURATION.enable_custom_command || !prefix_matcher)
            return;
        // Cancel incoming packet, so it doesn't print to chat.
        packets.cancel = true;
        const trimmed_message = incoming_message
            .slice(prefix_matcher.length)
            .trim();
        if (trimmed_message.length === 0)
            return CommandException.Invalid(packet_sender, "");
        const get_args = trimmed_message
            .match(/[^\s"]+|"([^"]*)"/g)
            .map((arg) => arg.replace(/^"|"$/g, ""));
        const command_name = get_args.shift().toLocaleLowerCase();
        const command_properties = this.fnd_cmd(command_name);
        if (!command_properties ||
            (command_properties.register.perms.length > 0 &&
                !command_properties.register.perms.every((perms) => packet_sender.getTags().includes(perms))))
            return CommandException.Invalid(packet_sender, command_name);
        command_properties.onExecute({
            sender: packet_sender,
            getInput: (inputNumber) => this.parse_input(get_args, command_properties.register.inputs, inputNumber),
            core_config: BLOCK_CORE_CONFIGURATION,
            logger: new Logger(BLOCK_CORE_CONFIGURATION.development_mode.debug_level),
            _is_command_registered: (input) => this.fnd_cmd(input),
            _registered_properties: this._registered_properties,
        });
    }
    /**
     * Parses the input argument based on the expected type.
     * @param { string[] } command_args - The array of command arguments.
     * @param { { [key: number]: ("string" | "boolean" | "number" | "playername")[] } } command_input - The expected input types for each argument.
     * @param { number } input_index - The index of the argument to parse.
     * @returns The parsed value, or undefined if parsing fails.
     */
    parse_input(command_args, command_input, input_index) {
        const inputValue = command_args[input_index];
        if (!command_input ||
            !command_input[input_index] ||
            inputValue === undefined)
            return undefined;
        const typeCheckers = {
            boolean: (value) => {
                switch (value.toLowerCase()) {
                    case "true":
                        return true;
                    case "false":
                        return false;
                    default:
                        return undefined;
                }
            },
            number: (value) => {
                const num = Number(value);
                return isNaN(num) ? undefined : num;
            },
            string: (value) => value,
            playername: (value) => value.startsWith("@") ? value.substring(1) : undefined,
        };
        const getTypes = command_input[input_index];
        let type_idx = 0;
        while (type_idx < getTypes.length) {
            const checker = typeCheckers[getTypes[type_idx]];
            if (checker) {
                const result = checker(inputValue);
                if (result !== undefined)
                    return result;
            }
            type_idx++;
        }
        return undefined;
    }
    /**
     * Builds and registers a new command.
     * @param options - The options for building the command.
     * @param { CommandRegister } options.register - The command register object.
     * @param { Function } options.onExecute - The function to execute when the command is called.
     */
    Build(options) {
        const registraion = options.register._GenerateResult();
        if (registraion.name.length <= 0) {
            Logger.DevMode()?.Danger({
                unit: "CommandRegister",
                location: "Debug",
                message: "You should put 'name' in CommandRegister!.",
            });
            return;
        }
        this._registered_properties.set(registraion.name, {
            register: registraion,
            onExecute: options.onExecute,
        });
    }
}
export const CommandBuilder = new BuildCommand();
