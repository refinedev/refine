export enum DevtoolsEvent {
    RELOAD = "devtools:reload",
    DEVTOOLS_INIT = "devtools:init",
    DEVTOOLS_HANDSHAKE = "devtools:handshake",
    DEVTOOLS_ALREADY_CONNECTED = "devtools:already-connected",
    CREATE_INVOCATION = "devtools:create-invocation",
    UPDATE_INVOCATION = "devtools:update-invocation",
    DEVTOOLS_CONNECTED_APP = "devtools:connected-app",
    DEVTOOLS_DISCONNECTED_APP = "devtools:disconnected-app",
}

export type DevtoolsEventPayloads = {
    [DevtoolsEvent.RELOAD]: {};
    [DevtoolsEvent.DEVTOOLS_INIT]: { url: string };
    [DevtoolsEvent.DEVTOOLS_HANDSHAKE]: { url: string };
    [DevtoolsEvent.DEVTOOLS_ALREADY_CONNECTED]: { url: string };
    [DevtoolsEvent.CREATE_INVOCATION]: { invocation: Record<string, any> };
    [DevtoolsEvent.UPDATE_INVOCATION]: { invocation: Record<string, any> };
    [DevtoolsEvent.DEVTOOLS_CONNECTED_APP]: { url: string | null };
    [DevtoolsEvent.DEVTOOLS_DISCONNECTED_APP]: {};
};
