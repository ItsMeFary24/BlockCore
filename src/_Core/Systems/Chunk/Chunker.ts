import { ChunkerPos } from "../../@types";

/**
 * A class that represents a chunk defined by a start and end position.
 */
export class Chunker {
  private _start_pos: ChunkerPos;
  private _end_pos: ChunkerPos;

  /**
   * Creates an instance of the Chunker class.
   * @param { ChunkerPos } startPos - The starting position of the chunk.
   * @param { ChunkerPos } endPos - The ending position of the chunk.
   */
  constructor(startPos: ChunkerPos, endPos: ChunkerPos) {
    this._start_pos = startPos;
    this._end_pos = endPos;
  }

  /**
   * Checks if a given position is inside the chunk.
   * @param { ChunkerPos } pos - The position to check.
   * @returns True if the position is inside the chunk, false otherwise.
   */
  isInsideOfChunk(pos: ChunkerPos): boolean {
    const thisMinX = Math.min(this._start_pos.x, this._end_pos.x);
    const thisMaxX = Math.max(this._start_pos.x, this._end_pos.x);
    const thisMinY = Math.min(this._start_pos.y, this._end_pos.y);
    const thisMaxY = Math.max(this._start_pos.y, this._end_pos.y);
    const thisMinZ = Math.min(this._start_pos.z, this._end_pos.z);
    const thisMaxZ = Math.max(this._start_pos.z, this._end_pos.z);

    return (
      pos.x >= thisMinX &&
      pos.x <= thisMaxX &&
      pos.y >= thisMinY &&
      pos.y <= thisMaxY &&
      pos.z >= thisMinZ &&
      pos.z <= thisMaxZ
    );
  }

  /**
   * Checks if this chunk overlaps with another chunk.
   * @param { Chunker } other - The other chunker to check for overlap.
   * @returns True if the chunks overlap, false otherwise.
   */
  isOverlapping(other: Chunker): boolean {
    const thisMinX = Math.min(this._start_pos.x, this._end_pos.x);
    const thisMaxX = Math.max(this._start_pos.x, this._end_pos.x);
    const thisMinY = Math.min(this._start_pos.y, this._end_pos.y);
    const thisMaxY = Math.max(this._start_pos.y, this._end_pos.y);
    const thisMinZ = Math.min(this._start_pos.z, this._end_pos.z);
    const thisMaxZ = Math.max(this._start_pos.z, this._end_pos.z);

    const otherMinX = Math.min(other.getData.s_pos.x, other.getData.e_pos.x);
    const otherMaxX = Math.max(other.getData.s_pos.x, other.getData.e_pos.x);
    const otherMinY = Math.min(other.getData.s_pos.y, other.getData.e_pos.y);
    const otherMaxY = Math.max(other.getData.s_pos.y, other.getData.e_pos.y);
    const otherMinZ = Math.min(other.getData.s_pos.z, other.getData.e_pos.z);
    const otherMaxZ = Math.max(other.getData.s_pos.z, other.getData.e_pos.z);

    return (
      thisMinX <= otherMaxX &&
      thisMaxX >= otherMinX &&
      thisMinY <= otherMaxY &&
      thisMaxY >= otherMinY &&
      thisMinZ <= otherMaxZ &&
      thisMaxZ >= otherMinZ
    );
  }

  /**
   * Gets the start and end positions of the chunk.
   * @returns An object containing the start and end positions.
   */
  get getData() {
    return {
      s_pos: this._start_pos,
      e_pos: this._end_pos,
    };
  }
}
