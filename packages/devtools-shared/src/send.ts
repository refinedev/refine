import { DevtoolsEvent, DevtoolsEventPayloads } from "./event-types";

export function send<T extends DevtoolsEvent>(
    ws: WebSocket,
    event: T,
    payload: DevtoolsEventPayloads[T],
) {
    ws.send(JSON.stringify({ event, payload }));
}
