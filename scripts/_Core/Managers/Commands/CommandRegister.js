/**
 * Represents a command register that holds command properties.
 */
export class CommandRegister {
    _register;
    /**
     * Initializes a new instance of the CommandRegister class,
     * setting up the default command properties.
     */
    constructor() {
        this._register = {
            name: "",
            description: "No Description.",
            category: "Global",
            perms: [],
            aliases: [],
            usage: [],
            example: [],
            inputs: {},
        };
    }
    /**
     * Sets the name of the command.
     * @param { string } name - The name of the command.
     * @returns The instance of CommandRegister for method chaining.
     */
    setName(name) {
        this._register.name = name;
        return this;
    }
    /**
     * Sets the description of the command.
     * @param { string } desc - The description of the command.
     * @returns The instance of CommandRegister for method chaining.
     */
    setDescription(desc) {
        this._register.description = desc;
        return this;
    }
    /**
     * Sets the category of the command.
     * @param { string } cname - The category name.
     * @returns The instance of CommandRegister for method chaining.
     */
    setCategory(cname) {
        this._register.category = cname;
        return this;
    }
    /**
     * Sets the permissions required for the command.
     * @param { string[] } perms - An array of permission strings.
     * @returns The instance of CommandRegister for method chaining.
     */
    setPerms(perms) {
        this._register.perms = perms;
        return this;
    }
    /**
     * Sets the aliases for the command.
     * @param { string[] } alias - An array of alias strings.
     * @returns The instance of CommandRegister for method chaining.
     */
    setAliases(alias) {
        this._register.aliases = alias;
        return this;
    }
    /**
     * Sets the usage examples for the command.
     * @param { string[] } usage - An array of usage strings.
     * @returns The instance of CommandRegister for method chaining.
     */
    setUsage(usage) {
        this._register.usage = usage;
        return this;
    }
    /**
     * Sets example usages for the command.
     * @param { string[] } eg - An array of example strings.
     * @returns The instance of CommandRegister for method chaining.
     */
    setExample(eg) {
        this._register.example = eg;
        return this;
    }
    /**
     * Sets the inputs for the command.
     * @param {{ [key: number]: ("string" | "boolean" | "number" | "playername")[] }} inputs - An object mapping input indices to their types.
     * @returns The instance of CommandRegister for method chaining.
     */
    setInputs(inputs) {
        Object.assign(this._register.inputs, inputs);
        return this;
    }
    _GenerateResult() {
        return this._register;
    }
}
