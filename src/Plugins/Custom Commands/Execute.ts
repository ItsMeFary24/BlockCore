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
Promise.all(command_entry.map(async (path) => await import(path)));
