const command_entry = [
  // Information Commmand
  "./information/help",
  "./information/version",

  // Home System
  "./general/home/set_home",
  "./general/home/tp_home",
  "./general/home/del_home",

  // Example
  "./example",
];

// Parallel loader
const promises: Record<string, Promise<number | void>> = {};

(async (): Promise<() => undefined> => {
  let promise_idx = command_entry.length;
  while (promise_idx--) {
    const path = command_entry[promise_idx];
    promises[path] = import(path);
  }

  await Promise.all(Object.values(promises));

  // Clean up references
  command_entry.length = 0;
  let key_idx = Object.keys(promises).length;
  while (key_idx--) delete promises[Object.keys(promises)[key_idx]];

  return () => undefined;
})();
