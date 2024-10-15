import { Logger } from "./block-core";

const plugin_path_name = ["Better Ranks", "Custom Commands"];

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// Parallel-Processing Plugin Loader

Promise.all(
  plugin_path_name.map(async (path) => {
    const plugin_load_time = Date.now();

    try {
      await import(`./${path}/Execute`);
      Logger.DevMode()?.Info({
        unit: "plugin_loader",
        location: path,
        message: `Started [${Date.now() - plugin_load_time}ms]`,
      });
    } catch (exception) {
      Logger.DevMode()?.Danger({
        unit: "plugin_loader",
        location: path,
        message: `Critical - Skipped. ${exception.message}`,
      });
    }
  })
).then(() =>
  Logger.DevMode()?.Info({
    unit: "plugin_loader",
    location: "_runner",
    message: `Done.`,
  })
);
