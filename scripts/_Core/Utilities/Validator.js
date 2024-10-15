export class Validator {
    /**
     * Determines whether the input value is a string.
     * @param { unknown } value - The value to check.
     * @return { boolean } - Returns true if the input is a string, otherwise false.
     */
    static isString(value) {
        return typeof value === "string";
    }
    /**
     * Determines whether the input value is a number.
     * @param { unknown } value - The value to check.
     * @return { boolean } - Returns true if the input is a number, otherwise false.
     */
    static isNumber(value) {
        return typeof value === "number";
    }
    /**
     * Determines whether the input value is a integer.
     * @param { unknown } value - The value to check.
     * @return { boolean } - Returns true if the input is a integer, otherwise false.
     */
    static isInteger(value) {
        return Number.isInteger(value);
    }
    /**
     * Determines whether the input value is a boolean.
     * @param { unknown } value - The value to check.
     * @return { boolean } - Returns true if the input is a boolean, otherwise false.
     */
    static isBoolean(value) {
        return typeof value === "boolean";
    }
    /**
     * Determines whether the input value is a object.
     * @param { unknown } value - The value to check.
     * @return { boolean } - Returns true if the input is a object, otherwise false.
     */
    static isObject(value) {
        return typeof value === "object" && !Array.isArray(value) && value !== null;
    }
    /**
     * Determines whether the input value is a array.
     * @param { unknown } value - The value to check.
     * @return { boolean } - Returns true if the input is a array, otherwise false.
     */
    static isArray(value) {
        return Array.isArray(value);
    }
    /**
     * Determines whether the input value is a null.
     * @param { unknown } value - The value to check.
     * @return { boolean } - Returns true if the input is a null, otherwise false.
     */
    static isNull(value) {
        return value === null;
    }
    /**
     * Determines whether the input value is a undefined.
     * @param { unknown } value - The value to check.
     * @return { boolean } - Returns true if the input is a undefined, otherwise false.
     */
    static isUndefined(value) {
        return value === undefined;
    }
    /**
     * Determines whether the input value is a error.
     * @param { unknown } value - The value to check.
     * @return { boolean } - Returns true if the input is a error, otherwise false.
     */
    static isError(value) {
        return value instanceof Error && "message" in value;
    }
    /**
     * Determines whether the input value is a Vector3.
     * @param { unknown } value - The value to check.
     * @return { boolean } - Returns true if the input is a Vector3, otherwise false.
     */
    static isVector3(value) {
        const Vec3 = value;
        return (!this.isUndefined(Vec3.x) &&
            !this.isUndefined(Vec3.y) &&
            !this.isUndefined(Vec3.z));
    }
    /**
     * Determines whether the input value is a Vector2.
     * @param { unknown } value - The value to check.
     * @return { boolean } - Returns true if the input is a Vector2, otherwise false.
     */
    static isVector2(value) {
        const Vec2 = value;
        return !this.isUndefined(Vec2.x) && !this.isUndefined(Vec2.y);
    }
    /**
     * Determines whether the input value is a Vector3 or Vector2.
     * @param { unknown } value - The value to check.
     * @return { boolean } - Returns true if the input is a Vector3 or Vector2, otherwise false.
     */
    static isVector(value) {
        return this.isVector3(value) || this.isVector2(value);
    }
    /**
     * Determines whether the input value is a Vec3D instance.
     * @param { unknown } value - The value to check.
     * @return { boolean } - Returns true if the input is a Vec3D, otherwise false.
     */
    static isVec3D(value) {
        const Vec3 = value;
        return (!this.isUndefined(Vec3.x) &&
            !this.isUndefined(Vec3.y) &&
            !this.isUndefined(Vec3.z));
    }
    /**
     * Determines whether the input value is a Vec2D instance.
     * @param { unknown } value - The value to check.
     * @return { boolean } - Returns true if the input is a Vec2D, otherwise false.
     */
    static isVec2D(value) {
        const Vec2 = value;
        return !this.isUndefined(Vec2.x) && !this.isUndefined(Vec2.z);
    }
}
