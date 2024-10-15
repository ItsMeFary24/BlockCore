import { Logger } from "../Logger";

/**
 * A class representing a 2D vector with x and z components.
 */
export class Vec2D {
  /**
   * Creates an instance of the Vec2D class.
   * @param { number } x - The x component of the vector (default is 0).
   * @param { number } z - The z component of the vector (default is 0).
   */
  constructor(public x: number = 0, public z: number = 0) {}

  /**
   * Clones the current vector and returns a new Vec2D instance.
   * @returns A new Vec2D instance with the same x and z values.
   */
  clone(): Vec2D {
    return new Vec2D(this.x, this.z);
  }

  /**
   * Adds another vector to this vector.
   * @param { Vec2D } v - The vector to add.
   * @returns A new Vec2D instance representing the sum of the two vectors.
   */
  add(v: Vec2D): Vec2D {
    return new Vec2D(this.x + v.x, this.z + v.z);
  }

  /**
   * Subtracts another vector from this vector.
   * @param { Vec2D } v - The vector to subtract.
   * @returns A new Vec2D instance representing the difference of the two vectors.
   */
  subtract(v: Vec2D): Vec2D {
    return new Vec2D(this.x - v.x, this.z - v.z);
  }

  /**
   * Multiplies this vector by a scalar.
   * @param { number } scalar - The scalar to multiply by.
   * @returns A new Vec2D instance representing the scaled vector.
   */
  multiply(scalar: number): Vec2D {
    return new Vec2D(this.x * scalar, this.z * scalar);
  }

  /**
   * Divides this vector by a scalar.
   * @param { number } scalar - The scalar to divide by.
   * @returns A new Vec2D instance representing the divided vector.
   * @throws Will log an error if division by zero is attempted.
   */
  divide(scalar: number): Vec2D {
    if (scalar === 0) {
      Logger.DevMode()?.Danger({
        unit: "Vec2D",
        location: "divide",
        message: "Division by zero.",
      });
      return this;
    }

    return new Vec2D(this.x / scalar, this.z / scalar);
  }

  /**
   * Calculates the dot product of this vector and another vector.
   * @param { Vec2D } v - The vector to calculate the dot product with.
   * @returns The dot product as a number.
   */
  dot(v: Vec2D): number {
    return this.x * v.x + this.z * v.z;
  }

  /**
   * Calculates the magnitude (length) of the vector.
   * @returns The magnitude of the vector.
   */
  magnitude(): number {
    return Math.sqrt(this.x * this.x + this.z * this.z);
  }

  /**
   * Normalizes the vector to a unit vector.
   * @returns A new Vec2D instance representing the normalized vector.
   * @throws Will log an error if attempting to normalize a zero vector.
   */
  normalize(): Vec2D {
    const mag = this.magnitude();
    if (mag === 0) {
      Logger.DevMode()?.Danger({
        unit: "Vec2D",
        location: "normalize",
        message: "Cannot normalize zero vector.",
      });
      return this;
    }

    return this.divide(mag);
  }

  /**
   * Calculates the distance from this vector to another vector.
   * @param { Vec2D } v - The vector to calculate the distance to.
   * @returns The distance as a number.
   */
  distanceTo(v: Vec2D): number {
    return this.subtract(v).magnitude();
  }

  /**
   * Checks if this vector is equal to another vector.
   * @param { Vec2D } v - The vector to compare with.
   * @returns True if the vectors are equal, false otherwise.
   */
  equals(v: Vec2D): boolean {
    return this.x === v.x && this.z === v.z;
  }

  /**
   * Returns a string representation of the vector.
   * @returns A string in the format "Vec2D(x, z)".
   */
  toString(): string {
    return `Vec2D(${this.x}, ${this.z})`;
  }
}
