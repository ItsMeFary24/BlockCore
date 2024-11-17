import { Container, ItemStack, PlatformType, Player } from "@minecraft/server";
import { EntityActor } from "./Entity";
import { Logger } from "../../Systems/Logger";
import { type PlayerConditionQuery } from "../../BCore.exports";

export class PlayerActor extends EntityActor {
  private _player: Player;
  private _container: Container;

  constructor(player: Player) {
    if (!player || !(player instanceof Player))
      Logger.DevMode()?.Danger({
        unit: "PlayerActor",
        location: "constructor",
        message: "Invalid Player.",
      });

    super(player);
    this._player = player;
    this._container = player.getComponent("inventory").container;
  }

  getName() {
    return this._player.name;
  }

  getNameTag() {
    return this._player.nameTag;
  }

  getDevice() {
    return this._player.clientSystemInfo.platformType;
  }

  get isMobile() {
    return this.getDevice() === PlatformType.Mobile;
  }

  get isDesktop() {
    return this.getDevice() === PlatformType.Desktop;
  }

  get isConsole() {
    return this.getDevice() === PlatformType.Console;
  }

  setNameTag(name: string) {
    this._player.nameTag = name;
  }

  getEmptySlotsCount() {
    return this._container.emptySlotsCount;
  }

  addItem(item: ItemStack) {
    this._container.addItem(item);
  }

  getId() {
    return this._player.id;
  }

  checkCondition(query: PlayerConditionQuery) {
    const queries = {
      flying: "isFlying",
      emoting: "isEmoting",
      falling: "isFalling",
      gliding: "isGliding",
      in_water: "isInWater",
      jumping: "isJumping",
      climbing: "isClimbing",
      on_ground: "isOnGround",
      sleeping: "isSleeping",
      sneaking: "isSneaking",
      swimming: "isSwimming",
      sprinting: "isSprinting",
    } as const;

    if (!(query in queries)) {
      Logger.DevMode()?.Danger({
        unit: "PlayerActor",
        location: "checkCondition",
        message: `Invalid Query: ${query}`,
      });
      return false;
    }

    return this._player[queries[query as keyof typeof queries]];
  }

  unwrap() {
    return this._player;
  }
}
