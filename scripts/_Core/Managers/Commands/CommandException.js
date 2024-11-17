import { Player } from "@minecraft/server";
/**
 * Provides static methods for handling command exceptions.
 */
export class CommandException {
    /**
     * Sends an invalid command message to the player.
     * @param { Player } player - The player who executed the invalid command.
     * @param { string } commandName - The name of the invalid command.
     * @returns A promise that resolves when the message is sent.
     */
    static Invalid(player, commandName) {
        return player.sendMessage({
            rawtext: [
                {
                    text: "§c",
                },
                {
                    translate: "commands.generic.unknown",
                    with: [`${commandName}`],
                },
            ],
        });
    }
}
