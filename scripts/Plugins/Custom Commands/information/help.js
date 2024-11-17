import { BLOCK_CORE_CONFIGURATION } from "../../../config";
import { CommandBuilder, CommandRegister, Validator } from "../../block-core";
const PAGE_LIMIT = 12;
CommandBuilder.Build({
    register: new CommandRegister()
        .setName("help")
        .setDescription("Provides help/list of commands.")
        .setCategory("Information")
        .setAliases(["?"])
        .setInputs({
        0: ["number", "string"],
    })
        .setUsage(["help <page: number | string>"])
        .setExample(["help ping", "help 1"]),
    onExecute: async ({ sender, _registered_properties: reg_property, _is_command_registered: is_registered, getInput, }) => {
        const player = sender.unwrap();
        const input_command = getInput(0) || 1;
        const command_prefix = BLOCK_CORE_CONFIGURATION.custom_command_prefixes[0];
        const check_perms = (perms, cmd_perms) => cmd_perms.length === 0 || cmd_perms.some((perm) => perms.includes(perm));
        const command_exist = is_registered(input_command);
        if ((!Validator.isNumber(input_command) && !command_exist) ||
            (command_exist &&
                !check_perms(player.getTags(), command_exist.register.perms || []))) {
            player.sendMessage(`§cCommands with name or alias §f${input_command} §cdoes not exist.`);
            return;
        }
        if (command_exist) {
            const registered = command_exist.register;
            player.sendMessage(`§a--- Command information ---\n§7Name: §f${registered.name}\n§7Description: §f${registered.description.length
                ? registered.description
                : "No description found."}\n§7Category: §f${registered.category}\n§7Aliases: §f${registered.aliases.length
                ? registered.aliases.join(", ")
                : "No aliases found."}\n§7Usage: §f\n - ${registered.usage.length
                ? registered.usage.join("\n - ")
                : "No usage found."}\n§7Example Usage: §f\n - ${registered.example.length
                ? registered.example.join("\n - ")
                : "No example found."}\n§a-------------------------`);
            return;
        }
        const registered = [...reg_property.values()].filter((reg) => check_perms(player.getTags(), reg.register.perms || []));
        const max_page = Math.ceil(registered.length / PAGE_LIMIT);
        const target_page = input_command > max_page
            ? max_page
            : input_command;
        const start_page_index = (target_page - 1) * PAGE_LIMIT;
        const end_page_index = target_page * PAGE_LIMIT;
        const panginated_cmds = registered.slice(start_page_index, end_page_index);
        const sorted_cmds = panginated_cmds.sort((a, b) => a.register.category.localeCompare(b.register.category));
        let messages = `§a--- Showing help page ${target_page} of ${max_page} [${command_prefix}help <page>] ---\n`;
        let current_category = "";
        messages += sorted_cmds
            .map((item) => {
            let categoryLine = "";
            if (item.register.category !== current_category) {
                categoryLine = `\n§e${item.register.category}:\n`;
                current_category = item.register.category;
            }
            return `${categoryLine} §f${command_prefix}${item.register.name} §7- ${item.register.usage[0] || ""}`;
        })
            .filter((line) => line.trim() !== "")
            .join("\n");
        const remaining_items = registered.slice(end_page_index);
        if (remaining_items.length > 0)
            messages += `\n\n§eTo view the next page, use §f${command_prefix}help ${target_page + 1}`;
        player.sendMessage(messages);
    },
});
