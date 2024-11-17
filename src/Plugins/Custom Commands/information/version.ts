import { MODULE_VERSION } from "../../../config";
import { CommandBuilder, CommandRegister } from "../../block-core";

CommandBuilder.Build({
  register: new CommandRegister()
    .setName("version")
    .setDescription("The version of the module.")
    .setCategory("Information"),
  onExecute: ({ sender: player }) =>
    player
      .unwrap()
      .sendMessage(
        `§a[§eBlockCore§a] You're currently using the module version: §e${MODULE_VERSION}`,
      ),
});
