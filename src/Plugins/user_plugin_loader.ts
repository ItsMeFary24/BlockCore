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

let start_time = Date.now();
let success_count = 0;
let failure_count = 0;

const failure_message: string[] = [];
const promises: Record<string, Promise<number | void>> = {};

(async (): Promise<() => undefined> => {
  let promise_idx = plugin_path_name.length;
  while (promise_idx--) {
    const path = plugin_path_name[promise_idx];
    promises[path] = import(`./${path}/Execute`)
      .then(() => success_count++)
      .catch((exception) => {
        failure_count++;
        failure_message.push(exception.message);
      });
  }

  await Promise.all(Object.values(promises));
  Logger.DevMode()?.Info({
    unit: "plugin_loader",
    location: "process",
    message: `Loaded [${success_count}] | Failure [${failure_count}] | Finish [${Date.now() - start_time}ms]`,
  });

  failure_count > 0 &&
    Logger.DevMode()?.Danger({
      unit: "plugin_loader",
      location: "exception",
      message: `Failed to load [${failure_count}] plugins:\n- ${failure_message.join("\n- ")}`,
    });

  // Clean up references
  plugin_path_name.length = 0;
  failure_message.length = 0;
  let key_idx = Object.keys(promises).length;
  while (key_idx--) delete promises[Object.keys(promises)[key_idx]];

  return () => undefined;
})();
