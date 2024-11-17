import {
  CommandBuilder,
  CommandRegister,
  DynamicDB,
  Vec3D,
} from "../../../block-core";
import { CustomCommandConfig } from "../../CONFIG";

CommandBuilder.Build({
  register: new CommandRegister()
    .setName("sethome")
    .setDescription("Set home to your current location.")
    .setInputs({
      0: ["string"],
    })
    .setUsage(["sethome <home_name: string>"]),
  onExecute: ({ sender, getInput }) => {
    const player = sender.unwrap();
    const inputted_name = getInput(0);

    const home_db = new DynamicDB(player);
    const sethome_limit = player
      .getTags()
      .find((tag) =>
        Object.keys(CustomCommandConfig.set_home_max).includes(tag),
      )
      ? CustomCommandConfig.set_home_max[
          player
            .getTags()
            .find((tag) =>
              Object.keys(CustomCommandConfig.set_home_max).includes(tag),
            ) as keyof typeof CustomCommandConfig.set_home_max
        ]
      : CustomCommandConfig.set_home_max.default;

    const existing_home = home_db.keys.filter((home) =>
      home.startsWith("home-"),
    );

    if (existing_home.length >= sethome_limit) {
      player.sendMessage(
        `§a[§eHome§a] §cYou've reached your limit of §e${sethome_limit} §chomes.`,
      );
      return;
    }

    if (!inputted_name) {
      player.sendMessage(`§a[§eHome§a] §cPlease provide a valid home name.`);
      return;
    }

    if (existing_home.some((home) => home.includes(`home-${inputted_name}`))) {
      player.sendMessage(
        `§a[§eHome§a] §cA home named §e${inputted_name} §calready exists.`,
      );
      return;
    }

    home_db.set(`home-${inputted_name}`, {
      pos: new Vec3D(player.location.x, player.location.y, player.location.z),
    });

    player.sendMessage(
      `§a[§eHome§a] Successfully set new home: §e${inputted_name}§a.`,
    );
  },
});
