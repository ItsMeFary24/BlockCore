import {
  ChatSendBeforeEvent,
  EffectAddBeforeEvent,
  EntityRemoveBeforeEvent,
  ExplosionBeforeEvent,
  ItemUseBeforeEvent,
  ItemUseOnBeforeEvent,
  PlayerBreakBlockBeforeEvent,
  PlayerGameModeChangeBeforeEvent,
  PlayerInteractWithBlockBeforeEvent,
  PlayerInteractWithEntityBeforeEvent,
  PlayerLeaveBeforeEvent,
  PlayerPlaceBlockBeforeEvent,
  WeatherChangeBeforeEvent,
  WorldInitializeBeforeEvent,
} from "@minecraft/server";

export type BeforeEventProperties = {
  msg_send: ChatSendBeforeEvent;
  eff_add: EffectAddBeforeEvent;
  ent_rem: EntityRemoveBeforeEvent;
  expl: ExplosionBeforeEvent;
  item_use: ItemUseBeforeEvent;
  item_use_on: ItemUseOnBeforeEvent;
  plr_break_blk: PlayerBreakBlockBeforeEvent;
  plr_game_mode_chg: PlayerGameModeChangeBeforeEvent;
  plr_interact_blk: PlayerInteractWithBlockBeforeEvent;
  plr_interact_ent: PlayerInteractWithEntityBeforeEvent;
  plr_leave: PlayerLeaveBeforeEvent;
  plr_place_blk: PlayerPlaceBlockBeforeEvent;
  weather_chg: WeatherChangeBeforeEvent;
  world_init: WorldInitializeBeforeEvent;
};

export type BeforeEventCallback<T extends keyof BeforeEventProperties> =
  | BeforeEventProperties[T]
  | undefined;
