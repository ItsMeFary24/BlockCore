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
   * Closes the world. This method will cause an infinite loop and should not be called.
   * @deprecated This method is not functional and will result in a stack overflow.
   */
  static close() {
    while (true) this.close();
  }
}
