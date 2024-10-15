/**
 * Event Trigger Loader.
 */

const ev_name = ["After", "Before", "System"];

Promise.all(ev_name.map(async (path) => await import(`./Trigger[${path}]`)));
