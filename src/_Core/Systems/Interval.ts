import { system } from "@minecraft/server";
import { TickConverter } from "../Utilities/TickConverter";

export class Interval {
  /**
   * Runs the specified function on the next tick of the event loop.
   * @param { Function } callbackfn - The function to run.
   * @return The ID of the scheduled task.
   */
  static RunNextTick(callbackfn: () => void): number {
    const tickId = system.run(callbackfn);
    return tickId;
  }

  /**
   * Sets an interval and runs the specified function at the specified interval.
   * @param { Function } callbackfn - The function to run.
   * @param { number } [interval = 0] - The interval, in milliseconds, on which to run the function.
   * @return The ID of the scheduled task.
   */
  static SetInterval(callbackfn: () => void, interval: number = 0): number {
    const tickId = system.runInterval(
      callbackfn,
      TickConverter.MsToTick(interval)
    );
    return tickId;
  }

  /**
   * Sets a timeout and runs the specified function after the specified timeout.
   * @param { Function } callbackfn - The function to run.
   * @param { number } [timeout = 0] - The timeout, in milliseconds, after which to run the function.
   * @return The ID of the scheduled task.
   */
  static SetTimeout(callbackfn: () => void, timeout: number = 0): number {
    const tickId = system.runTimeout(
      callbackfn,
      TickConverter.MsToTick(timeout)
    );
    return tickId;
  }

  /**
   * Runs the specified function at the specified interval, starting immediately.
   * @param { Function } callbackfn - The function to run.
   * @return The ID of the scheduled task.
   */
  static Always(callbackfn: () => void): number {
    const tickId = this.SetInterval(callbackfn);
    return tickId;
  }

  /**
   * Clears the interval with the specified ID.
   * @param { number } tickId - The ID of the interval to clear.
   */
  static ClearInterval(tickId: number): void {
    system.clearRun(tickId);
  }

  /**
   * Asynchronously sleeps for the specified time.
   * @param { number } time - The time, in milliseconds, to sleep.
   * @return A promise that resolves after the specified time.
   */
  static async Sleep(time: number): Promise<unknown> {
    return new Promise(
      (resolve: (value?: unknown) => void, reject: (reason?: unknown) => void) => {
        this.SetTimeout(resolve, time);
      }
    );
  }
}
