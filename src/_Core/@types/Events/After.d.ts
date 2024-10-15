import {
  BlockExplodeAfterEvent,
  ButtonPushAfterEvent,
  ChatSendAfterEvent,
  DataDrivenEntityTriggerAfterEvent,
  EffectAddAfterEvent,
  EntityDieAfterEvent,
  EntityHealthChangedAfterEvent,
  EntityHitBlockAfterEvent,
  EntityHitEntityAfterEvent,
  EntityHurtAfterEvent,
  EntityLoadAfterEvent,
  EntityRemoveAfterEvent,
  EntitySpawnAfterEvent,
  ExplosionAfterEvent,
  GameRuleChangeAfterEvent,
  ItemCompleteUseAfterEvent,
  ItemReleaseUseAfterEvent,
  ItemStartUseAfterEvent,
  ItemStartUseOnAfterEvent,
  ItemStopUseAfterEvent,
  ItemStopUseOnAfterEvent,
  ItemUseAfterEvent,
  ItemUseOnAfterEvent,
  LeverActionAfterEvent,
  MessageReceiveAfterEvent,
  PistonActivateAfterEvent,
  PlayerBreakBlockAfterEvent,
  PlayerDimensionChangeAfterEvent,
  PlayerEmoteAfterEvent,
  PlayerGameModeChangeAfterEvent,
  PlayerInputPermissionCategoryChangeAfterEvent,
  PlayerInteractWithBlockAfterEvent,
  PlayerInteractWithEntityAfterEvent,
  PlayerJoinAfterEvent,
  PlayerLeaveAfterEvent,
  PlayerPlaceBlockAfterEvent,
  PlayerSpawnAfterEvent,
  PressurePlatePopAfterEvent,
  PressurePlatePushAfterEvent,
  ProjectileHitBlockAfterEvent,
  ProjectileHitEntityAfterEvent,
  TargetBlockHitAfterEvent,
  TripWireTripAfterEvent,
  WeatherChangeAfterEvent,
  WorldInitializeAfterEvent,
} from "@minecraft/server";

export type AfterEventProperties = {
  blk_expl: BlockExplodeAfterEvent;
  btn_push: ButtonPushAfterEvent;
  msg_send: ChatSendAfterEvent;
  data_entity: DataDrivenEntityTriggerAfterEvent;
  eff_add: EffectAddAfterEvent;
  ent_die: EntityDieAfterEvent;
  ent_health_chg: EntityHealthChangedAfterEvent;
  ent_hit_blk: EntityHitBlockAfterEvent;
  ent_hit_ent: EntityHitEntityAfterEvent;
  ent_hurt: EntityHurtAfterEvent;
  ent_load: EntityLoadAfterEvent;
  ent_rem: EntityRemoveAfterEvent;
  ent_spawn: EntitySpawnAfterEvent;
  expl: ExplosionAfterEvent;
  gamerule_chg: GameRuleChangeAfterEvent;
  item_complete: ItemCompleteUseAfterEvent;
  item_release: ItemReleaseUseAfterEvent;
  item_start: ItemStartUseAfterEvent;
  item_start_on: ItemStartUseOnAfterEvent;
  item_stop: ItemStopUseAfterEvent;
  item_stop_on: ItemStopUseOnAfterEvent;
  item_use: ItemUseAfterEvent;
  item_use_on: ItemUseOnAfterEvent;
  lever_act: LeverActionAfterEvent;
  msg_receive: MessageReceiveAfterEvent;
  piston_act: PistonActivateAfterEvent;
  plr_break_blk: PlayerBreakBlockAfterEvent;
  plr_dim_chg: PlayerDimensionChangeAfterEvent;
  plr_emote: PlayerEmoteAfterEvent;
  plr_game_mode_chg: PlayerGameModeChangeAfterEvent;
  plr_input_perm_chg: PlayerInputPermissionCategoryChangeAfterEvent;
  plr_interact_blk: PlayerInteractWithBlockAfterEvent;
  plr_interact_ent: PlayerInteractWithEntityAfterEvent;
  plr_join: PlayerJoinAfterEvent;
  plr_leave: PlayerLeaveAfterEvent;
  plr_place_blk: PlayerPlaceBlockAfterEvent;
  plr_spawn: PlayerSpawnAfterEvent;
  pressure_pop: PressurePlatePopAfterEvent;
  pressure_push: PressurePlatePushAfterEvent;
  proj_hit_blk: ProjectileHitBlockAfterEvent;
  proj_hit_ent: ProjectileHitEntityAfterEvent;
  tgt_hit_blk: TargetBlockHitAfterEvent;
  trip_wire: TripWireTripAfterEvent;
  weather_chg: WeatherChangeAfterEvent;
  world_init: WorldInitializeAfterEvent;
};

export type AfterEventCallback<T extends keyof AfterEventProperties> =
  | AfterEventProperties[T]
  | undefined;
