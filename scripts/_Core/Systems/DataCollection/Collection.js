/**
 * A generic collection class that extends the built-in Map to provide
 * additional indexing capabilities for its values.
 * @template K - The type of the keys in the collection.
 * @template V - The type of the values in the collection.
 */
export class Collection extends Map {
    _indexMap = new Map();
    /**
     * Creates an instance of the Collection class.
     */
    constructor() {
        super();
    }
    /**
     * Sets a key-value pair in the collection and updates the indexes.
     * @param key - The key to set.
     * @param value - The value to set.
     * @returns The instance of the Collection for method chaining.
     */
    set(key, value) {
        super.set(key, value);
        this.updateIndexes(key, value);
        return this;
    }
    /**
     * Deletes a key-value pair from the collection and removes it from the indexes.
     * @param key - The key to delete.
     * @returns True if the key was successfully deleted, false otherwise.
     */
    delete(key) {
        const value = this.get(key);
        if (value) {
            this.removeFromIndexes(key, value);
        }
        return super.delete(key);
    }
    /**
     * Updates the indexes for the given key and value.
     * @param key - The key associated with the value.
     * @param value - The value to index.
     */
    updateIndexes(key, value) {
        const props = Object.keys(value);
        let prop_idx = 0;
        while (prop_idx < props.length) {
            const prop = props[prop_idx];
            if (!this._indexMap.has(prop))
                this._indexMap.set(prop, new Map());
            const index = this._indexMap.get(prop);
            const valueKey = JSON.stringify(value[prop]);
            index.set(valueKey, key);
            prop_idx++;
        }
    }
    /**
     * Removes the key-value pair from the indexes.
     * @param key - The key associated with the value to remove.
     * @param value - The value to remove from the indexes.
     */
    removeFromIndexes(key, value) {
        const props = Object.keys(value);
        let prop_idx = 0;
        while (prop_idx < props.length) {
            const prop = props[prop_idx];
            const index = this._indexMap.get(prop);
            if (index) {
                const valueKey = JSON.stringify(value[prop]);
                index.delete(valueKey);
            }
            prop_idx++;
        }
    }
    /**
     * Finds a value in the collection based on an indexed property.
     * @param prop - The property to search by.
     * @param value - The value of the property to match.
     * @returns The found value or undefined if not found.
     */
    findIndexed(prop, value) {
        const index = this._indexMap.get(prop);
        if (index) {
            const valueKey = JSON.stringify(value);
            const key = index.get(valueKey);
            if (key !== undefined)
                return this.get(key);
        }
        return undefined;
    }
    /**
     * Finds a value in the collection based on a custom predicate function.
     * @param fn - A function that takes a value and key and returns a boolean.
     * @returns The found value or undefined if not found.
     */
    find(fn) {
        const entries = Array.from(this.entries());
        let entry_idx = 0;
        while (entry_idx < entries.length) {
            const [key, value] = entries[entry_idx];
            if (fn(value, key))
                return value;
            entry_idx++;
        }
        return undefined;
    }
}
