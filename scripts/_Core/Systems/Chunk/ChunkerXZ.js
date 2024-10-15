/**
 * A class that represents a chunk defined by a start and end position in the XZ plane.
 */
export class ChunkerXZ {
    _start_pos;
    _end_pos;
    /**
     * Creates an instance of the ChunkerXZ class.
     * @param { ChunkerPosXZ } startPos - The starting position of the chunk in the XZ plane.
     * @param { ChunkerPosXZ } endPos - The ending position of the chunk in the XZ plane.
     */
    constructor(startPos, endPos) {
        this._start_pos = startPos;
        this._end_pos = endPos;
    }
    /**
     * Checks if a given position is inside the chunk.
     * @param { ChunkerPosXZ } pos - The position to check in the XZ plane.
     * @returns True if the position is inside the chunk, false otherwise.
     */
    isInsideOfChunk(pos) {
        const thisMinX = Math.min(this._start_pos.x, this._end_pos.x);
        const thisMaxX = Math.max(this._start_pos.x, this._end_pos.x);
        const thisMinZ = Math.min(this._start_pos.z, this._end_pos.z);
        const thisMaxZ = Math.max(this._start_pos.z, this._end_pos.z);
        return (pos.x >= thisMinX &&
            pos.x <= thisMaxX &&
            pos.z >= thisMinZ &&
            pos.z <= thisMaxZ);
    }
    /**
     * Checks if this chunk overlaps with another chunk.
     * @param { ChunkerXZ } other - The other ChunkerXZ instance to check for overlap.
     * @returns True if the chunks overlap, false otherwise.
     */
    isOverlapping(other) {
        const thisMinX = Math.min(this._start_pos.x, this._end_pos.x);
        const thisMaxX = Math.max(this._start_pos.x, this._end_pos.x);
        const thisMinZ = Math.min(this._start_pos.z, this._end_pos.z);
        const thisMaxZ = Math.max(this._start_pos.z, this._end_pos.z);
        const otherMinX = Math.min(other.getData.s_pos.x, other.getData.e_pos.x);
        const otherMaxX = Math.max(other.getData.s_pos.x, other.getData.e_pos.x);
        const otherMinZ = Math.min(other.getData.s_pos.z, other.getData.e_pos.z);
        const otherMaxZ = Math.max(other.getData.s_pos.z, other.getData.e_pos.z);
        return (thisMinX <= otherMaxX &&
            thisMaxX >= otherMinX &&
            thisMinZ <= otherMaxZ &&
            thisMaxZ >= otherMinZ);
    }
    /**
     * Gets the start and end positions of the chunk.
     * @returns An object containing the start and end positions in the XZ plane.
     */
    get getData() {
        return {
            s_pos: this._start_pos,
            e_pos: this._end_pos,
        };
    }
}
