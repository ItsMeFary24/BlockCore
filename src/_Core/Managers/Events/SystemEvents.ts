import type {
  SystemEventProperties,
  SystemEventCallback,
} from "../../BCore.exports";

/**
 * Represents a event emitter that manages system events.
 */
class SystemEventEmitter {
  private _Event: {
    [key: string]: {
      callback: Function;
    }[];
  };

  /**
   * Constructs a new SystemEventEmitter.
   */
  constructor() {
    this._Event = {};
  }

  /**
   * Adds a new event listener.
   * @param { string } name - The name of the event.
   * @param { Function } callback - The callback function to be executed when the event is triggered.
   */
  private _Add(name: string, callback: Function) {
    if (!this._Event[name]) this._Event[name] = [];

    this._Event[name].push({ callback });
  }

  /**
   * Triggers an event.
   * @param { string } name - The name of the event to trigger.
   * @param { unknown[] } args - Arguments to pass to the event listeners.
   */
  emit(name: string, ...args: unknown[]) {
    const listener = this._Event[name];
    if (!listener) return;

    let value_idx = 0;
    while (value_idx < listener.length) {
      listener[value_idx].callback(...args);
      value_idx++;
    }
  }

  /**
   * Registers a new event listener.
   * @param { T } name - The name of the event to listen for.
   * @param { Function } callback - The callback function to be executed when the event is triggered.
   */
  on<T extends keyof SystemEventProperties>(
    name: T,
    callback: (arg: SystemEventCallback<T>) => void,
  ) {
    this._Add(name, callback);
  }
}

export const SystemEvents = new SystemEventEmitter();
