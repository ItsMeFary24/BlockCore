import { ItemStack } from "@minecraft/server";
import { CommandBuilder, CommandRegister, Interval } from "../block-core";
CommandBuilder.Build({
    register: new CommandRegister().setName("ping"),
    onExecute: async ({ sender }) => {
        await Interval.WaitNextTick();
        sender.runCommands(["say hello", "give @s apple 12"]);
    },
});
