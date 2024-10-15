/**
 * A utility class for converting time units related to game ticks.
 */
export class TickConverter {
    /**
     * Converts milliseconds to ticks.
     * @param { number } MS - The number of milliseconds to convert.
     * @return { number } - The number of ticks.
     */
    static MsToTick(MS) {
        return Math.floor(MS / 50);
    }
}
