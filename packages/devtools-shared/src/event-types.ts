import { TraceType } from "./meta-types";

export enum DevtoolsEvent {
    RELOAD = "devtools:reload",
    DEVTOOLS_INIT = "devtools:init",
    DEVTOOLS_HANDSHAKE = "devtools:handshake",
    DEVTOOLS_ALREADY_CONNECTED = "devtools:already-connected",
    ACTIVITY = "devtools:send-activity",
    DEVTOOLS_ACTIVITY_UPDATE = "devtools:activity-update",
    DEVTOOLS_CONNECTED_APP = "devtools:connected-app",
    DEVTOOLS_DISCONNECTED_APP = "devtools:disconnected-app",
}

type ActivityPayload =
    | {
          type: "mutation";
          identifier: string;
          id?: number;
          key?: any[];
          status?: "idle" | "loading" | "success" | "error";
          trace?: TraceType[];
          state: any;
          variables?: any;
      }
    | {
          type: "query";
          identifier: string;
          key?: any[];
          status?: "loading" | "error" | "success";
          trace?: TraceType[];
          state: any;
      };

export type DevtoolsEventPayloads = {
    [DevtoolsEvent.RELOAD]: {};
    [DevtoolsEvent.DEVTOOLS_INIT]: { url: string };
    [DevtoolsEvent.DEVTOOLS_HANDSHAKE]: { url: string };
    [DevtoolsEvent.DEVTOOLS_ALREADY_CONNECTED]: { url: string };
    [DevtoolsEvent.ACTIVITY]: ActivityPayload;
    [DevtoolsEvent.DEVTOOLS_ACTIVITY_UPDATE]: {
        updatedActivities: ActivityPayload[];
    };
    [DevtoolsEvent.DEVTOOLS_CONNECTED_APP]: { url: string | null };
    [DevtoolsEvent.DEVTOOLS_DISCONNECTED_APP]: {};
};
