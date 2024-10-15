/**
 * A class that provides static methods for binary arithmetic operations.
 */
export class Binary {
  /**
   * Adds two numbers using bitwise operations.
   * @param { number } a - The first number to add.
   * @param { number } b - The second number to add.
   * @returns The sum of the two numbers.
   */
  static ADDER(a: number, b: number) {
    let crry;

    while (b !== 0) {
      crry = (a & b) << 1;

      a = a ^ b;
      b = crry;
    }

    return a;
  }

  /**
   * Subtracts the second number from the first using bitwise operations.
   * @param { number } a - The number to subtract from.
   * @param { number } b - The number to subtract.
   * @returns The result of the subtraction.
   */
  static SUBTRACTER(a: number, b: number) {
    while (b !== 0) {
      let brrw = (~a & b) << 1;

      a = a ^ b;
      b = brrw;
    }

    return a;
  }

  /**
   * Divides the first number by the second using bitwise operations.
   * @param divid - The number to be divided (dividend).
   * @param divis - The number to divide by (divisor).
   * @returns The quotient of the division.
   */
  static DIVIDER(divid: number, divis: number) {
    const shiftAmount = 31;
    let q = 0,
      rem = 0;

    let idx = shiftAmount;
    while (idx >= 0) {
      rem = (rem << 1) | ((divid >> idx) & 1);
      if (rem >= divis) {
        rem -= divis;
        q |= 1 << idx;
      }
      idx--;
    }

    return q;
  }

  /**
   * Multiplies two numbers using bitwise operations.
   * @param { number } a - The first number to multiply.
   * @param { number } b - The second number to multiply.
   * @returns The product of the two numbers.
   */
  static MULTIPLER(a: number, b: number) {
    if (b > a) [a, b] = [b, a];

    let res = 0;
    while (b !== 0) {
      if (b & 1) res = this.ADDER(res, a);
      a <<= 1;
      b >>= 1;
    }

    return res;
  }
}
