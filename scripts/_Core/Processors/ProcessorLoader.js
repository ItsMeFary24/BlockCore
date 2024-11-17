import { Logger } from "../Systems/Logger";
const _processor_path = ["EventTrigger"];
let start_time = Date.now();
let success_count = 0;
let failure_count = 0;
const failure_message = [];
const promises = {};
(async () => {
    let promise_idx = _processor_path.length;
    while (promise_idx--) {
        const path = _processor_path[promise_idx];
        promises[path] = import(`./${path}/exe`)
            .then(() => success_count++)
            .catch((exception) => {
            failure_count++;
            failure_message.push(exception.message);
        });
    }
    await Promise.all(Object.values(promises));
    Logger.DevMode()?.Info({
        unit: "processor_loader",
        location: "process",
        message: `Loaded [${success_count}] | Failure [${failure_count}] | Finish [${Date.now() - start_time}ms]`,
    });
    failure_count > 0 &&
        Logger.DevMode()?.Danger({
            unit: "processor_loader",
            location: "exception",
            message: `Failed to load [${failure_count}] processors:\n- ${failure_message.join("\n- ")}`,
        });
    // Plugin Loader
    import("../../Plugins/user_plugin_loader");
    // Clean up references
    _processor_path.length = 0;
    failure_message.length = 0;
    let key_idx = Object.keys(promises).length;
    while (key_idx--)
        delete promises[Object.keys(promises)[key_idx]];
    return () => undefined;
})();
