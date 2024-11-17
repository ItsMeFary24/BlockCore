import { CommandBuilder, CommandRegister, DynamicDB, Interval, Vec3D, } from "../../../block-core";
CommandBuilder.Build({
    register: new CommandRegister()
        .setName("home")
        .setDescription("Teleport to home.")
        .setInputs({
        0: ["string"],
    })
        .setUsage(["home <home_name: string>"]),
    onExecute: async ({ sender, getInput }) => {
        const player = sender.unwrap();
        const inputted_name = getInput(0);
        const home_db = new DynamicDB(player);
        const existing_home = home_db.keys.filter((home) => home.startsWith("home-"));
        if (existing_home.length === 0) {
            player.sendMessage("§a[§eHome§a] §cYou don't have any homes set.");
            return;
        }
        if (!inputted_name) {
            player.sendMessage(`§a[§eHome§a] Your homes: §e${existing_home
                .map((h) => h.replace("home-", ""))
                .join(", ")}§a.`);
            return;
        }
        if (!existing_home.some((home) => home === `home-${inputted_name}`)) {
            player.sendMessage(`§a[§eHome§a] §cYou don't have a home named §e${inputted_name}§c.`);
            return;
        }
        const home_data = home_db.get(`home-${inputted_name}`);
        await Interval.WaitNextTick();
        player.teleport(new Vec3D(home_data?.pos.x, home_data?.pos.y, home_data?.pos.z), { checkForBlocks: true });
        player.sendMessage(`§a[§eHome§a] Teleported to home §e${inputted_name}§a.`);
    },
});
