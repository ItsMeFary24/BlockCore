import { Logger } from "../Systems/Logger";
const _processor_path = ["EventTrigger"];
Promise.all(_processor_path.map(async (path) => {
    const processor_load_time = Date.now();
    try {
        await import(`./${path}/exe`);
        Logger.DevMode()?.Info({
            unit: "processor_loader",
            location: path,
            message: `Started [${Date.now() - processor_load_time}ms]`,
        });
    }
    catch (exception) {
        Logger.DevMode()?.Danger({
            unit: "processor_loader",
            location: path,
            message: `Critical - Skipped. ${exception.message}`,
        });
    }
})).then(() => {
    Logger.DevMode()?.Info({
        unit: "processor_loader",
        location: "_runner",
        message: "Done.",
    });
    // Plugin Loader
    import("../../Plugins/user_plugin_loader");
});
