import {
  CommandBuilder,
  CommandRegister,
  DynamicDB,
} from "../../../block-core";

CommandBuilder.Build({
  register: new CommandRegister()
    .setName("delhome")
    .setDescription("Delete existing home.")
    .setInputs({
      0: ["string"],
    })
    .setUsage(["delhome <home_name: string>"]),
  onExecute: async ({ sender, getInput }) => {
    const player = sender.unwrap();
    const inputted_name = getInput(0);

    const home_db = new DynamicDB(player);
    const existing_home = home_db.keys.filter((home) =>
      home.startsWith("home-"),
    );

    if (existing_home.length === 0) {
      player.sendMessage("§a[§eHome§a] §cYou don't have any homes set.");
      return;
    }

    if (!inputted_name) {
      player.sendMessage(`§a[§eHome§a] §cPlease provide a valid home name.`);
      return;
    }

    if (!existing_home.some((home) => home === `home-${inputted_name}`)) {
      player.sendMessage(
        `§a[§eHome§a] §cYou don't have a home named §e${inputted_name}§c.`,
      );
      return;
    }

    home_db.delete(`home-${inputted_name}`);
    player.sendMessage(
      `§a[§eHome§a] Successfully deleted home: §e${inputted_name}§a.`,
    );
  },
});
