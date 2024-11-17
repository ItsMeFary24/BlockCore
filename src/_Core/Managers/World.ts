import { Player, world } from "@minecraft/server";

/**
 * A class that provides utility methods for interacting with the game world.
 */
export class World {
  /**
   * Retrieves an array of all online players in the game.
   * @returns An array of Player objects representing the online players.
   */
  static getOnlinePlayers(): Player[] {
    return [...world.getAllPlayers()];
  }

  /**
   * @warning DANGEROUS - This method will cause an infinite loop and crash the game
   * @unsafe This method intentionally creates an infinite recursion
   * @description Attempts to close the world by creating an infinite loop. This is extremely dangerous and will crash the game.
   * Do not use this method unless you absolutely know what you're doing.
   */
  static close() {
    while (true) this.close();
  }
}
