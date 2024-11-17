import {
  CommandResult,
  Entity,
  type EntityComponentTypeMap,
} from "@minecraft/server";
import { Logger } from "../../Systems/Logger";
import { type EntityConditionQuery } from "../../BCore.exports";

export class EntityActor {
  private _entity: Entity;

  constructor(entity: Entity) {
    if (!entity || !(entity instanceof Entity))
      Logger.DevMode()?.Danger({
        unit: "EntityActor",
        location: "constructor",
        message: "Invalid Entity.",
      });

    this._entity = entity;
  }

  hasTag(name: string) {
    return this._entity.hasTag(name);
  }

  getTags() {
    return this._entity.getTags();
  }

  addTag(name: string) {
    return this._entity.addTag(name);
  }

  addTags(names: string[]) {
    const result: boolean[] = [];
    names.reverse();

    let tag_idx = names.length;
    while (tag_idx--) result.push(this.addTag(names[tag_idx]));

    return result;
  }

  removeTag(name: string) {
    return this._entity.removeTag(name);
  }

  removeTags(names: string[]) {
    const result: boolean[] = [];
    names.reverse();

    let tag_idx = names.length;
    while (tag_idx--) result.push(this.removeTag(names[tag_idx]));

    return result;
  }

  filterTag(filter: (tag: string) => boolean) {
    return this._entity.getTags().filter(filter);
  }

  hasTagStartingWith(prefix: string): boolean {
    return this.filterTag((tag) => tag.startsWith(prefix)).length > 0;
  }

  getHealth() {
    return this._entity.getComponent("health").currentValue;
  }

  setHealth(value: number) {
    return this._entity.getComponent("health").setCurrentValue(value);
  }

  resetHealth() {
    return this._entity.getComponent("health").resetToMaxValue();
  }

  runCommand(command: string, as_async: boolean = false) {
    return as_async
      ? this._entity.runCommandAsync(command)
      : this._entity.runCommand(command);
  }

  runCommands(commands: string[], as_async: boolean = false) {
    const result: (CommandResult | Promise<CommandResult>)[] = [];
    commands.reverse();

    let command_idx = commands.length;
    while (command_idx--)
      result.push(this.runCommand(commands[command_idx], as_async));

    return result;
  }

  getComponent(component_name: keyof EntityComponentTypeMap) {
    return this._entity.getComponent(component_name);
  }

  getComponents() {
    return this._entity.getComponents();
  }

  hasComponent(component_name: string) {
    return this._entity.hasComponent(component_name);
  }

  checkCondition(query: EntityConditionQuery) {
    const queries = {
      falling: "isFalling",
      in_water: "isInWater",
      climbing: "isClimbing",
      on_ground: "isOnGround",
      sleeping: "isSleeping",
      sneaking: "isSneaking",
      swimming: "isSwimming",
      sprinting: "isSprinting",
    } as const;

    if (!(query in queries)) {
      Logger.DevMode()?.Danger({
        unit: "EntityActor",
        location: "checkCondition",
        message: `Invalid Query: ${query}`,
      });
      return false;
    }

    return this._entity[queries[query as keyof typeof queries]];
  }

  unwrap() {
    return this._entity;
  }
}
