import { CommandResult, Entity, } from "@minecraft/server";
import { Logger } from "../../Systems/Logger";
import {} from "../../BCore.exports";
export class EntityActor {
    _entity;
    constructor(entity) {
        if (!entity || !(entity instanceof Entity))
            Logger.DevMode()?.Danger({
                unit: "EntityActor",
                location: "constructor",
                message: "Invalid Entity.",
            });
        this._entity = entity;
    }
    hasTag(name) {
        return this._entity.hasTag(name);
    }
    getTags() {
        return this._entity.getTags();
    }
    addTag(name) {
        return this._entity.addTag(name);
    }
    addTags(names) {
        const result = [];
        names.reverse();
        let tag_idx = names.length;
        while (tag_idx--)
            result.push(this.addTag(names[tag_idx]));
        return result;
    }
    removeTag(name) {
        return this._entity.removeTag(name);
    }
    removeTags(names) {
        const result = [];
        names.reverse();
        let tag_idx = names.length;
        while (tag_idx--)
            result.push(this.removeTag(names[tag_idx]));
        return result;
    }
    filterTag(filter) {
        return this._entity.getTags().filter(filter);
    }
    hasTagStartingWith(prefix) {
        return this.filterTag((tag) => tag.startsWith(prefix)).length > 0;
    }
    getHealth() {
        return this._entity.getComponent("health").currentValue;
    }
    setHealth(value) {
        return this._entity.getComponent("health").setCurrentValue(value);
    }
    resetHealth() {
        return this._entity.getComponent("health").resetToMaxValue();
    }
    runCommand(command, as_async = false) {
        return as_async
            ? this._entity.runCommandAsync(command)
            : this._entity.runCommand(command);
    }
    runCommands(commands, as_async = false) {
        const result = [];
        commands.reverse();
        let command_idx = commands.length;
        while (command_idx--)
            result.push(this.runCommand(commands[command_idx], as_async));
        return result;
    }
    getComponent(component_name) {
        return this._entity.getComponent(component_name);
    }
    getComponents() {
        return this._entity.getComponents();
    }
    hasComponent(component_name) {
        return this._entity.hasComponent(component_name);
    }
    checkCondition(query) {
        const queries = {
            falling: "isFalling",
            in_water: "isInWater",
            climbing: "isClimbing",
            on_ground: "isOnGround",
            sleeping: "isSleeping",
            sneaking: "isSneaking",
            swimming: "isSwimming",
            sprinting: "isSprinting",
        };
        if (!(query in queries)) {
            Logger.DevMode()?.Danger({
                unit: "EntityActor",
                location: "checkCondition",
                message: `Invalid Query: ${query}`,
            });
            return false;
        }
        return this._entity[queries[query]];
    }
    unwrap() {
        return this._entity;
    }
}
