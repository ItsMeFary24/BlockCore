/**
 * A utility class for formatting various types of data, including text and durations.
 */
export class Formatter {
    /**
     * Converts the given text to a rainbow-colored string.
     * @param { string } text - The text to convert.
     * @return { string } The rainbow-colored text.
     */
    static rainbowText(text) {
        const rainbowCode = [
            "§4",
            "§c",
            "§6",
            "§e",
            "§g",
            "§2",
            "§a",
            "§b",
            "§3",
            "§9",
            "§5",
            "§d",
        ];
        const letter = text.replace(/§./g, "");
        let newMessage = "";
        const rainbowLength = rainbowCode.length;
        let letter_idx = 0;
        while (letter_idx < letter.length) {
            if (letter[letter_idx] !== " ")
                newMessage += `${rainbowCode[letter_idx % rainbowLength]}${letter[letter_idx]}`;
            else
                newMessage += " ";
            letter_idx++;
        }
        return newMessage;
    }
    /**
     * Adds thousands separators to the given number.
     * @param { number } value - The number to format.
     * @return { string | undefined } The formatted number, or undefined if the input is not a number.
     */
    static thousandsSeparator(value) {
        if (isNaN(value))
            return;
        return value.toLocaleString();
    }
    /**
     * Formats the given number using metric prefixes.
     * @param { number } value - The number to format.
     * @returns { string | number } The formatted number, or the original number if it's less than 1000.
     */
    static metricNumbers(value) {
        if (value < 1000)
            return value;
        const types = ["", "k", "M", "G", "T", "P", "E", "Z", "Y"];
        const selectType = Math.floor(Math.log10(value) / 3);
        const scaled = value / Math.pow(10, selectType * 3);
        return `${scaled.toFixed(1)}${types[selectType]}`;
    }
    /**
     * Converts durations or milliseconds
     * @param { number | string } value - The value to convert.
     * @param { object } options - The options for the conversion.
     * @return { boolean | number | string | null } The converted value.
     */
    static convertDuration(value, { compactDuration = false, fullDuration = false, avoidDuration = [], } = {}) {
        if (typeof value === "string") {
            if (/^\d+$/.test(value))
                return Number(value);
            const durations = value.match(/-?\d*\.?\d+\s*(?:years?|yrs?|weeks?|days?|hours?|hrs?|minutes?|mins?|seconds?|secs?|milliseconds?|msecs?|ms|[smhdwy])/gi);
            return durations
                ? durations.reduce((a, b) => a + this.toMilliseconds(b), 0)
                : null;
        }
        if (typeof value === "number")
            return this.toDuration(value, {
                compactDuration,
                fullDuration,
                avoidDuration,
            });
        return false;
    }
    /**
     * Convert durations to milliseconds
     * @param { string } value - The duration to convert.
     * @return { number } The duration in milliseconds.
     */
    static toMilliseconds(value) {
        const cleanedValue = value.replace(/[^0-9a-z]+/gi, "").toLowerCase();
        const number = parseFloat(cleanedValue);
        const durationMap = {
            y: 3.154e10,
            w: 6.048e8,
            d: 8.64e7,
            h: 3.6e6,
            m: 6e4,
            s: 1e3,
            ms: 1,
        };
        const unitMatch = cleanedValue.match(/[a-z]+$/);
        if (unitMatch) {
            const unit = unitMatch[0];
            return number * (durationMap[unit] || 0);
        }
        return 0;
    }
    /**
     * Convert milliseconds to duration
     * @param { number } value - The milliseconds to convert.
     * @param { object } options - The options for the conversion.
     * @returns { string } The duration.
     */
    static toDuration(value, { compactDuration = false, fullDuration = false, avoidDuration = [], } = {}) {
        const absMs = Math.abs(value);
        const duration = [
            { short: "w", long: "week", duration: Math.floor(absMs / 6.048e8) },
            { short: "d", long: "day", duration: Math.floor(absMs / 8.64e7) % 7 },
            { short: "h", long: "hour", duration: Math.floor(absMs / 3.6e6) % 24 },
            { short: "m", long: "minute", duration: Math.floor(absMs / 60000) % 60 },
            { short: "s", long: "second", duration: Math.floor(absMs / 1000) % 60 },
            { short: "ms", long: "millisecond", duration: absMs % 1000 },
        ];
        const mappedDuration = duration
            .filter((obj) => obj.duration > 0 &&
            (fullDuration || !avoidDuration.includes(obj.short)))
            .map((obj) => `${Math.sign(value) === -1 ? "-" : ""}${compactDuration
            ? `${Math.floor(obj.duration)}${obj.short}`
            : `${Math.floor(obj.duration)} ${obj.long}${obj.duration === 1 ? "" : "s"}`}`);
        return fullDuration
            ? mappedDuration.join(compactDuration ? " " : ", ")
            : mappedDuration[0] || `${absMs}`;
    }
    /**
     * Converts a Vec3D instance to a formatted string representation.
     * @param { Vec3D } vec - The vector to format.
     * @param { boolean } plain - Whether to use plain formatting or colored.
     * @returns { string } The formatted vector string.
     */
    static rbgVec3(vec, plain) {
        return `${plain || "§c"}${vec.x} ${plain || "§a"}${vec.y} ${plain || "§b"}${vec.z}`;
    }
}
