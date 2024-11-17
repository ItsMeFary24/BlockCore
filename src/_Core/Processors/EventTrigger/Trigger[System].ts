import { system } from "@minecraft/server";
import { SystemEvents } from "../../Managers/Events/SystemEvents";

const Trigger = (
  _Ev: { subscribe: (callback: unknown) => void },
  _EvN: string,
) => _Ev.subscribe((__cb: unknown) => SystemEvents.emit(_EvN, __cb));

const event_definition = [
  ["script_evt_recv", system.afterEvents.scriptEventReceive],
  ["watchdog_term", system.beforeEvents.watchdogTerminate],
] as const;

let event_idx = event_definition.length;
while (event_idx--) {
  const [eventName, worldEvent] = event_definition[event_idx];
  Trigger(worldEvent, eventName);
}
