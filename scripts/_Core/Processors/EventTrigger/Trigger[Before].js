import { world } from "@minecraft/server";
import { BeforeEvents } from "../../Managers/Events/BeforeEvents";
const Trigger = (_Ev, _EvN) => _Ev.subscribe((__cb) => BeforeEvents.emit(_EvN, __cb));
const event_definition = [
    ["msg_send", world.beforeEvents.chatSend],
    ["eff_add", world.beforeEvents.effectAdd],
    ["ent_rem", world.beforeEvents.entityRemove],
    ["expl", world.beforeEvents.explosion],
    ["item_use", world.beforeEvents.itemUse],
    ["item_use_on", world.beforeEvents.itemUseOn],
    ["plr_break_blk", world.beforeEvents.playerBreakBlock],
    ["plr_game_mode_chg", world.beforeEvents.playerGameModeChange],
    ["plr_interact_blk", world.beforeEvents.playerInteractWithBlock],
    ["plr_interact_ent", world.beforeEvents.playerInteractWithEntity],
    ["plr_leave", world.beforeEvents.playerLeave],
    ["plr_place_blk", world.beforeEvents.playerPlaceBlock],
    ["weather_chg", world.beforeEvents.weatherChange],
    ["world_init", world.beforeEvents.worldInitialize],
];
let event_idx = 0;
while (event_idx < event_definition.length) {
    const [eventName, worldEvent] = event_definition[event_idx];
    Trigger(worldEvent, eventName);
    event_idx++;
}