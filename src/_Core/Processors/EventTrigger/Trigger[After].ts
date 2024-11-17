import { world } from "@minecraft/server";
import { AfterEvents } from "../../Managers/Events/AfterEvents";

const Trigger = (
  _Ev: { subscribe: (callback: unknown) => void },
  _EvN: string,
) => _Ev.subscribe((__cb: unknown) => AfterEvents.emit(_EvN, __cb));

const event_definition = [
  ["blk_expl", world.afterEvents.blockExplode],
  ["btn_push", world.afterEvents.buttonPush],
  ["msg_send", world.afterEvents.chatSend],
  ["data_entity", world.afterEvents.dataDrivenEntityTrigger],
  ["eff_add", world.afterEvents.effectAdd],
  ["ent_die", world.afterEvents.entityDie],
  ["ent_health_chg", world.afterEvents.entityHealthChanged],
  ["ent_hit_blk", world.afterEvents.entityHitBlock],
  ["ent_hit_ent", world.afterEvents.entityHitEntity],
  ["ent_hurt", world.afterEvents.entityHurt],
  ["ent_load", world.afterEvents.entityLoad],
  ["ent_rem", world.afterEvents.entityRemove],
  ["ent_spawn", world.afterEvents.entitySpawn],
  ["expl", world.afterEvents.explosion],
  ["gamerule_chg", world.afterEvents.gameRuleChange],
  ["item_complete", world.afterEvents.itemCompleteUse],
  ["item_release", world.afterEvents.itemReleaseUse],
  ["item_start", world.afterEvents.itemStartUse],
  ["item_start_on", world.afterEvents.itemStartUseOn],
  ["item_stop", world.afterEvents.itemStopUse],
  ["item_stop_on", world.afterEvents.itemStopUseOn],
  ["item_use", world.afterEvents.itemUse],
  ["item_use_on", world.afterEvents.itemUseOn],
  ["lever_act", world.afterEvents.leverAction],
  ["msg_receive", world.afterEvents.messageReceive],
  ["piston_act", world.afterEvents.pistonActivate],
  ["plr_break_blk", world.afterEvents.playerBreakBlock],
  ["plr_dim_chg", world.afterEvents.playerDimensionChange],
  ["plr_emote", world.afterEvents.playerEmote],
  ["plr_game_mode_chg", world.afterEvents.playerGameModeChange],
  ["plr_input_perm_chg", world.afterEvents.playerInputPermissionCategoryChange],
  ["plr_interact_blk", world.afterEvents.playerInteractWithBlock],
  ["plr_interact_ent", world.afterEvents.playerInteractWithEntity],
  ["plr_join", world.afterEvents.playerJoin],
  ["plr_leave", world.afterEvents.playerLeave],
  ["plr_place_blk", world.afterEvents.playerPlaceBlock],
  ["plr_spawn", world.afterEvents.playerSpawn],
  ["pressure_pop", world.afterEvents.pressurePlatePop],
  ["pressure_push", world.afterEvents.pressurePlatePush],
  ["proj_hit_blk", world.afterEvents.projectileHitBlock],
  ["proj_hit_ent", world.afterEvents.projectileHitEntity],
  ["tgt_hit_blk", world.afterEvents.targetBlockHit],
  ["trip_wire", world.afterEvents.tripWireTrip],
  ["weather_chg", world.afterEvents.weatherChange],
  ["world_init", world.afterEvents.worldInitialize],
] as const;

let event_idx = event_definition.length;
while (event_idx--) {
  const [eventName, worldEvent] = event_definition[event_idx];
  Trigger(worldEvent, eventName);
}
