import { CommandBuilder, CommandRegister } from "../block-core";
CommandBuilder.Build({
    register: new CommandRegister().setName("ping"),
    onExecute: ({ sender }) => {
        sender.sendMessage("Pong!");
    },
});
