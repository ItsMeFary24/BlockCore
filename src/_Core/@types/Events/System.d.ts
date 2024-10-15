import {
  ScriptEventCommandMessageAfterEvent,
  WatchdogTerminateBeforeEvent,
} from "@minecraft/server";

export type SystemEventProperties = {
  script_evt_recv: ScriptEventCommandMessageAfterEvent;
  watchdog_term: WatchdogTerminateBeforeEvent;
};

export type SystemEventCallback<T extends keyof SystemEventProperties> =
  | SystemEventProperties[T]
  | undefined;
