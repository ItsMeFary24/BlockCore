import { system } from "@minecraft/server";
import { SystemEvents } from "../../Managers/Events/SystemEvents";
const Trigger = (_Ev, _EvN) => _Ev.subscribe((__cb) => SystemEvents.emit(_EvN, __cb));
const event_definition = [
    ["script_evt_recv", system.afterEvents.scriptEventReceive],
    ["watchdog_term", system.beforeEvents.watchdogTerminate],
];
let event_idx = 0;
while (event_idx < event_definition.length) {
    const [eventName, worldEvent] = event_definition[event_idx];
    Trigger(worldEvent, eventName);
    event_idx++;
}
